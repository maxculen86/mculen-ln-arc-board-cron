import get from '../../../../private/common/utils/get';
import {
    buildAdPlayerConfig,
    buildJwPlaylist,
    loadPlaylist,
    PREROLL_AD_VIDEO_POSITION,
    registerPersistentPlayerEvents,
    setupPersistentPlayer,
    toPlaylistIndex
} from '../mediaScrollerExpanded/jwVideoPlayerHelper';
import {
    attachComscorePlugin,
    clearComscoreRetry,
    resetComscoreAttachmentState,
    tryAttachComscorePlugin
} from './comscoreAttachment';
import {
    AD_HOST_ID,
    destroy as destroyAdPlayer,
    getAdHostElement,
    HANDOFF_WATCHDOG_MS,
    POST_IMPRESSION_WATCHDOG_MS,
    playPreroll,
    positionAdHost
} from './jwAdPlayerManager';
import {
    hasDom,
    createPlayerHost,
    HOST_Z_INDEX,
    invokeMethod,
    positionHostOverRect
} from './jwPlayerShared';
import {
    handleComscoreGiveUp,
    reportPrerollDiagnostic,
    reportStartupDiagnostic
} from './jwPlayerDiagnostics';
import { createIdlePrerollState, nextPreroll } from './jwPlayerPrerollFsm';
import {
    nextStartup,
    PREROLL_DEFERRAL_CEILING_MS,
    STARTUP_WATCHDOG_MS
} from './jwPlayerStartupFsm';
import {
    markProgrammaticMute,
    registerJwVideoControlsTracking,
    registerVideoResumeTracking
} from '../../../../private/common/utils/videoPlayerHelper';
import {
    attachTouchBridgeToAdHost,
    attachVerticalTouchBridge,
    detachTouchBridgeFromAdHost,
    detachVerticalTouchBridge
} from './verticalTouchBridge';

// Re-exported to keep jwPlayerManager's public API stable after the FSM split.
export {
    nextPreroll,
    nextStartup,
    STARTUP_WATCHDOG_MS,
    PREROLL_DEFERRAL_CEILING_MS
};

const HOST_ID = 'jw-player-manager-host';
const PLAYER_ID = 'jw-player-manager-player';
const TOUCH_ACTION_STYLE_ID = `${PLAYER_ID}-touch-action-style`;

let hostElement = null;
let playerElement = null;
let playerInstance = null;

let loadedPlaylistSignature = null;

export const computePlaylistSignature = playlist =>
    (playlist || []).map(item => get(item, 'id')).join('|');

const sessionState = {
    isVisible: false,
    pendingPosition: null,
    lastResize: null,
    activePlaylist: null,
    activeFullList: null,
    activeUrlAds: null,
    activeOwnerKey: null,
    currentPlaylistIndex: null,
    loadedThisSession: false,
    preroll: {
        status: 'idle',
        contentItem: null,
        targetIndex: null,
        controllerId: 0,
        aborted: false
    },
    wantReveal: false,
    startup: 'closed'
};
let eventsCleanup = null;
let controlsCleanup = null;
let resumeCleanup = null;
let muteEnforceCleanup = null;
let nextPrerollControllerId = 0;
let prerollWatchdogId = null;
let prerollPostImpressionWatchdogId = null;
let didDestroyPrerollDuringHandoff = false;
let requestAdTerminal = null;
let startupWatchdogId = null;

let prerollDeferralCount = 0;

const getPlayerInstance = () => playerInstance;

const updatePrerollState = event => {
    const result = nextPreroll(sessionState.preroll, event);
    sessionState.preroll = result.state;
    return result;
};

const clearPrerollWatchdog = () => {
    if (!prerollWatchdogId) return;
    clearTimeout(prerollWatchdogId);
    prerollWatchdogId = null;
};

const clearPostImpressionWatchdog = () => {
    if (!prerollPostImpressionWatchdogId) return;
    clearTimeout(prerollPostImpressionWatchdogId);
    prerollPostImpressionWatchdogId = null;
};

const clearAllPrerollWatchdogs = () => {
    clearPrerollWatchdog();
    clearPostImpressionWatchdog();
};

const isPrerollPendingOrActive = () => sessionState.preroll.status !== 'idle';

export const isAdBreakActive = () => isPrerollPendingOrActive();

const setHostVisibility = visible => {
    if (!hostElement) return;

    hostElement.style.display = 'block';
    hostElement.style.visibility = visible ? 'visible' : 'hidden';
    hostElement.style.opacity = visible ? '1' : '0';
    hostElement.style.pointerEvents = 'none';
};

const moveHostTo = target => {
    if (!hostElement || !target || hostElement.parentElement === target) return;

    target.appendChild(hostElement);
};

const moveHostToBody = () => {
    if (
        !hasDom() ||
        !hostElement ||
        hostElement.parentElement === document.body
    )
        return;

    document.body.appendChild(hostElement);
};

const positionRefsAreConnected = () => {
    const { element, mountElement } = sessionState.pendingPosition || {};

    return (
        Boolean(element && element.isConnected) &&
        (!mountElement || mountElement.isConnected)
    );
};

const revealContent = () => {
    if (!hostElement) return;

    setHostVisibility(true);
    sessionState.isVisible = true;
    if (playerInstance) invokeMethod(playerInstance, 'play');
};

const hideContent = () => {
    if (!hostElement) return;

    setHostVisibility(false);
    sessionState.isVisible = false;
};

const muteContentMediaElements = () => {
    if (!hostElement) return;
    const mediaNodes = Array.from(hostElement.querySelectorAll('video, audio'));
    for (let i = 0; i < mediaNodes.length; i += 1) {
        mediaNodes[i].muted = true;
    }
};

const applyStartupEffects = effects => {
    effects.forEach(effect => {
        if (effect.type === 'COMMAND_ITEM') {
            invokeMethod(playerInstance, 'playlistItem', effect.index);
        } else if (effect.type === 'PLAY_AND_REVEAL') {
            sessionState.wantReveal = true;
            revealContent();
        } else if (effect.type === 'REPORT_STARTUP_TIMEOUT') {
            reportStartupDiagnostic(
                effect.reason,
                effect.startupState,
                effect.desired
            );
        } else if (effect.type === 'REARM_STARTUP_WATCHDOG') {
            prerollDeferralCount += 1;
            // Runtime cycle among three arrow fns; safe — all calls fire from
            // callbacks, never at module init.
            // eslint-disable-next-line no-use-before-define
            armStartupWatchdog();
        }
    });
};

const clearStartupWatchdog = () => {
    if (!startupWatchdogId) return;
    clearTimeout(startupWatchdogId);
    startupWatchdogId = null;
};

const armStartupWatchdog = () => {
    clearStartupWatchdog();
    startupWatchdogId = setTimeout(() => {
        startupWatchdogId = null;
        // eslint-disable-next-line no-use-before-define
        dispatchStartup({ type: 'STARTUP_TIMEOUT' });
    }, STARTUP_WATCHDOG_MS);
};

const isInStartupPhase = startup =>
    startup === 'opening' || startup === 'settling';

const dispatchStartup = event => {
    const prerollActive = isPrerollPendingOrActive();
    const previousStartup = sessionState.startup;
    const deferredElapsedMs = prerollDeferralCount * STARTUP_WATCHDOG_MS;
    const result = nextStartup(
        {
            startup: sessionState.startup,
            desired: sessionState.currentPlaylistIndex
        },
        { ...event, prerollActive, deferredElapsedMs }
    );

    sessionState.startup = result.startup;
    sessionState.currentPlaylistIndex = result.desired;

    // The watchdog is an absolute budget from entering the startup phase, not
    // a keep-alive: it is armed only on the transition INTO opening/settling
    // and must never be postponed by activity while already inside it, or an
    // infinite no-fill/thrash loop would run forever unchecked.
    if (
        isInStartupPhase(result.startup) &&
        !isInStartupPhase(previousStartup)
    ) {
        armStartupWatchdog();
        prerollDeferralCount = 0;
    } else if (!isInStartupPhase(result.startup)) {
        clearStartupWatchdog();
        prerollDeferralCount = 0;
    }

    applyStartupEffects(result.effects);
};

let startupListenerCleanup = null;

const teardownStartupListener = () => {
    if (typeof startupListenerCleanup === 'function') startupListenerCleanup();
    startupListenerCleanup = null;
};

const teardownStartupSession = () => {
    teardownStartupListener();
    clearStartupWatchdog();
};

const armStartupListener = player => {
    teardownStartupListener();

    let isTornDown = false;

    const handleSettle = () => {
        if (isTornDown) return;

        dispatchStartup({
            type: 'SETTLE',
            landed: invokeMethod(player, 'getPlaylistIndex')
        });
    };

    invokeMethod(player, 'on', 'playlistItem', handleSettle);
    startupListenerCleanup = () => {
        isTornDown = true;
        invokeMethod(player, 'off', 'playlistItem', handleSettle);
    };
};

const maybeReveal = () => {
    if (
        !sessionState.wantReveal ||
        sessionState.isVisible ||
        isPrerollPendingOrActive()
    )
        return;
    if (!get(sessionState.pendingPosition, 'element')) return;

    revealContent();
};

const queuePrerollIfNeeded = (item, playlistIndex, force = false) => {
    if (
        get(item, 'counterVideo') === PREROLL_AD_VIDEO_POSITION &&
        (force || playlistIndex !== sessionState.currentPlaylistIndex) &&
        !isPrerollPendingOrActive()
    ) {
        nextPrerollControllerId += 1;
        updatePrerollState({
            type: 'QUEUE',
            contentItem: item,
            targetIndex: playlistIndex,
            controllerId: nextPrerollControllerId
        });
    }
};

const finalizePrerollHandoff = controllerId => {
    const targetIndex =
        sessionState.currentPlaylistIndex ?? sessionState.preroll.targetIndex;

    detachTouchBridgeFromAdHost();
    requestAdTerminal = null;
    didDestroyPrerollDuringHandoff = true;

    updatePrerollState({ type: 'FINISH_HANDOFF', controllerId });

    if (targetIndex !== null) {
        sessionState.currentPlaylistIndex = targetIndex;
        try {
            invokeMethod(playerInstance, 'playlistItem', targetIndex);
        } catch (error) {
            // Reveal content even if JW rejects the handoff command.
        }
    }

    sessionState.wantReveal = true;
    try {
        revealContent();
    } catch (error) {
        // Visibility is set before play(); keep the content available.
    }
    dispatchStartup({ type: 'HANDOFF' });
};

function requestPrerollHandoff(controllerId) {
    const result = updatePrerollState({
        type: 'REQUEST_HANDOFF',
        controllerId
    });

    if (!result.accepted) return false;

    clearAllPrerollWatchdogs();
    finalizePrerollHandoff(controllerId);
    return true;
}

const handoffWithDiagnostic = (reason, controllerId, error) => {
    const handedOff = requestPrerollHandoff(controllerId);
    if (handedOff)
        reportPrerollDiagnostic(reason, controllerId, undefined, error);
};

const requestAdapterTerminal = (reason, controllerId) => {
    if (typeof requestAdTerminal !== 'function') {
        handoffWithDiagnostic(reason, controllerId);
        return;
    }

    requestAdTerminal(reason);
};

const maybeStartPreroll = () => {
    if (sessionState.preroll.status !== 'queued') return false;

    const slotElement = get(sessionState.pendingPosition, 'element');
    if (!slotElement) return false;
    if (!slotElement.isConnected) return false;

    const mountElement = get(sessionState.pendingPosition, 'mountElement');
    if (mountElement && !mountElement.isConnected) return false;

    const { contentItem, controllerId, targetIndex } = sessionState.preroll;
    const started = updatePrerollState({ type: 'START', controllerId });
    if (!started.accepted) return false;

    didDestroyPrerollDuringHandoff = false;
    requestAdTerminal = null;
    sessionState.currentPlaylistIndex = targetIndex;

    try {
        hideContent();
        invokeMethod(playerInstance, 'pause');
        // Muting the content for the ad break is programmatic, not a user click.
        // Pre-mark ONLY when the player is actually unmuted, so the resulting JW
        // 'mute' event fires and consumes the mark 1:1. Marking an already-muted
        // player would leak the mark into the user's next real mute toggle.
        if (invokeMethod(playerInstance, 'getMute') === false) {
            markProgrammaticMute(playerInstance);
        }
        muteContentMediaElements();
        const adController = playPreroll({
            config: {
                ...buildAdPlayerConfig(contentItem, sessionState.activeUrlAds)
            },
            slotElement,
            mountElement: get(sessionState.pendingPosition, 'mountElement'),
            onImpression: () => {
                const impression = updatePrerollState({
                    type: 'IMPRESSION',
                    controllerId
                });
                if (!impression.accepted) return;

                clearPrerollWatchdog();
                clearPostImpressionWatchdog();
                prerollPostImpressionWatchdogId = setTimeout(
                    () => requestAdapterTerminal('watchdog', controllerId),
                    POST_IMPRESSION_WATCHDOG_MS
                );
            },
            onHandoff: ({ reason, disposal } = {}) => {
                if (requestPrerollHandoff(controllerId) && reason) {
                    reportPrerollDiagnostic(reason, controllerId, disposal);
                }
            },
            onError: error => {
                // Canonical error reason ('ad-error' is its legacy label); the
                // real error is threaded so the console shows the actual cause.
                handoffWithDiagnostic('error', controllerId, error);
            },
            onResumeRequested: () => {
                reportPrerollDiagnostic(
                    'ad-requested-content-resume',
                    controllerId
                );
            },
            isCurrent: () => {
                const { pendingPosition } = sessionState;
                return (
                    sessionState.preroll.controllerId === controllerId &&
                    (sessionState.preroll.status === 'loading' ||
                        sessionState.preroll.status === 'playing') &&
                    pendingPosition?.element === slotElement &&
                    pendingPosition?.mountElement === mountElement &&
                    positionRefsAreConnected()
                );
            }
        });
        requestAdTerminal = get(adController, 'requestTerminal');
    } catch (error) {
        // A synchronous exception during preroll setup is a real error: log it
        // with its actual cause and still hand off to content.
        handoffWithDiagnostic('startup-exception', controllerId, error);
    }

    if (
        sessionState.preroll.controllerId === controllerId &&
        sessionState.preroll.status === 'loading'
    ) {
        clearPrerollWatchdog();
        prerollWatchdogId = setTimeout(
            () => requestAdapterTerminal('no-fill', controllerId),
            HANDOFF_WATCHDOG_MS
        );
    }

    attachTouchBridgeToAdHost(getAdHostElement);

    return true;
};

const applyPendingPosition = () => {
    if (!hasDom() || !hostElement || !sessionState.pendingPosition) return;
    if (!positionRefsAreConnected()) return;

    const { element, mountElement } = sessionState.pendingPosition;

    if (!element) return;

    moveHostTo(mountElement);

    const rect = positionHostOverRect({
        host: hostElement,
        target: element,
        player: playerInstance,
        lastSize: sessionState.lastResize,
        setLastSize: next => {
            sessionState.lastResize = next;
        }
    });

    if (!rect) return;

    positionAdHost(element);

    maybeReveal();
    maybeStartPreroll();
};

const clearListenerRegistrations = () => {
    if (typeof eventsCleanup === 'function') eventsCleanup();
    if (typeof controlsCleanup === 'function') controlsCleanup();
    if (typeof resumeCleanup === 'function') resumeCleanup();
    if (typeof muteEnforceCleanup === 'function') muteEnforceCleanup();
    eventsCleanup = null;
    controlsCleanup = null;
    resumeCleanup = null;
    muteEnforceCleanup = null;
};

const clearPrerollState = () => {
    clearAllPrerollWatchdogs();
    sessionState.preroll = createIdlePrerollState();
};

const abortPrerollController = () => {
    if (sessionState.preroll.status === 'idle') return;

    updatePrerollState({
        type: 'CANCEL',
        controllerId: sessionState.preroll.controllerId
    });
};

const resetOpenSessionState = () => {
    sessionState.pendingPosition = null;
    sessionState.lastResize = null;
    sessionState.activeOwnerKey = null;
    sessionState.currentPlaylistIndex = null;
    sessionState.loadedThisSession = false;
    sessionState.wantReveal = false;
    clearPrerollState();
};

const ensureVerticalTouchActionStyle = () => {
    if (!hasDom()) return;
    if (document.getElementById(TOUCH_ACTION_STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = TOUCH_ACTION_STYLE_ID;
    style.textContent = `
        #${PLAYER_ID},
        #${PLAYER_ID} *,
        #${AD_HOST_ID},
        #${AD_HOST_ID} * {
            touch-action: pan-y !important;
        }
    `;
    document.head.appendChild(style);
};

const removeVerticalTouchActionStyle = () => {
    if (!hasDom()) return;
    const style = document.getElementById(TOUCH_ACTION_STYLE_ID);
    if (style) style.remove();
};

const cancelPreroll = () => {
    if (sessionState.preroll.status === 'idle') return false;

    abortPrerollController();
    clearAllPrerollWatchdogs();

    detachTouchBridgeFromAdHost();
    requestAdTerminal = null;
    destroyAdPlayer();
    didDestroyPrerollDuringHandoff = false;

    return true;
};

const createHost = () => {
    if (hostElement && playerElement) return hostElement;

    const created = createPlayerHost({
        hostId: HOST_ID,
        playerId: PLAYER_ID,
        hostStyles: {
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '100vw',
            height: '100vh',
            zIndex: HOST_Z_INDEX,
            overflow: 'hidden'
        },
        playerStyles: {
            width: '100%',
            height: '100%',
            pointerEvents: 'auto'
        },
        hidden: true
    });

    if (!created) return null;

    hostElement = created.hostElement;
    playerElement = created.playerElement;

    if (hasDom() && !document.getElementById(`${PLAYER_ID}-pe-style`)) {
        const peStyle = document.createElement('style');
        peStyle.id = `${PLAYER_ID}-pe-style`;
        peStyle.textContent = `
            #${PLAYER_ID} { pointer-events: auto !important; }
        `;
        document.head.appendChild(peStyle);
    }

    return hostElement;
};

const resolvePlaylist = playlist =>
    playlist || sessionState.activePlaylist || [];
const resolveFullList = fullListVideoData =>
    fullListVideoData ||
    sessionState.activeFullList ||
    sessionState.activePlaylist ||
    [];

const registerTrackingListeners = ({
    player,
    playlist,
    fullListVideoData,
    currentIndexRef,
    sentProgressRef,
    handleNextCallback
}) => {
    if (!player) return;

    clearListenerRegistrations();

    const defaultTitle = get(playlist, '0.title', '');
    const defaultId = get(playlist, '0.id', '');

    eventsCleanup = registerPersistentPlayerEvents({
        player,
        sentProgressRef,
        listVideoData: playlist,
        fullListVideoData,
        currentIndexRef,
        handleNextCallback,
        isAdBreakActive
    });
    controlsCleanup = registerJwVideoControlsTracking({
        player,
        defaultTitle,
        defaultId
    });
    resumeCleanup = registerVideoResumeTracking({
        player,
        defaultTitle,
        defaultId,
        isAdBreakActive
    });

    // The preroll plays in a SEPARATE ad player, so when it ends IMA leaves the
    // content player muted and emits no ad-complete event here — nothing would
    // otherwise restore the audio the user had before the ad. So capture the
    // pre-ad mute and re-apply it once, the moment the ad surface disappears.
    let preAdContentMute = null;
    let adSurfaceWasPresent = false;
    const realignContentMuteAroundAd = () => {
        if (getAdHostElement()) {
            adSurfaceWasPresent = true;
            return;
        }
        if (adSurfaceWasPresent) {
            adSurfaceWasPresent = false;
            if (
                preAdContentMute !== null &&
                invokeMethod(player, 'getMute') !== preAdContentMute
            ) {
                // The restore is programmatic; mark it so the JW 'mute' event is
                // not tracked as a user mute/unmute click. This branch only runs
                // on a real state change, so the mark is consumed exactly once.
                markProgrammaticMute(player);
                invokeMethod(player, 'setMute', preAdContentMute);
            }
            return;
        }
        preAdContentMute = invokeMethod(player, 'getMute');
    };
    invokeMethod(player, 'on', 'time', realignContentMuteAroundAd);
    muteEnforceCleanup = () => {
        invokeMethod(player, 'off', 'time', realignContentMuteAroundAd);
    };
};

export const ensure = ({ playlist = [], urlAds } = {}) => {
    if (!hasDom()) return null;

    createHost();

    if (playlist.length) sessionState.activePlaylist = playlist;
    if (urlAds) sessionState.activeUrlAds = urlAds;

    if (playerInstance) {
        tryAttachComscorePlugin(
            getPlayerInstance,
            attachComscorePlugin,
            handleComscoreGiveUp
        );
        applyPendingPosition();
        return playerInstance;
    }

    playerInstance = setupPersistentPlayer({
        playerId: PLAYER_ID,
        playlist: sessionState.activePlaylist || playlist
    });

    if (!playerInstance) return null;

    invokeMethod(playerInstance, 'on', 'ready', () => {
        tryAttachComscorePlugin(
            getPlayerInstance,
            attachComscorePlugin,
            handleComscoreGiveUp
        );
    });

    applyPendingPosition();

    return playerInstance;
};

export const goToIndex = (
    index,
    fullListVideoData = sessionState.activeFullList
) => {
    if (!playerInstance) return false;

    const nextFullList = resolveFullList(fullListVideoData);
    const playlistIndex = toPlaylistIndex(nextFullList, index);

    if (playlistIndex < 0) {
        cancelPreroll();
        invokeMethod(playerInstance, 'stop');
        setHostVisibility(false);
        sessionState.isVisible = false;
        sessionState.wantReveal = false;
        sessionState.currentPlaylistIndex = null;
        return false;
    }

    queuePrerollIfNeeded(
        get(sessionState.activePlaylist, [playlistIndex]),
        playlistIndex
    );

    if (sessionState.preroll.status === 'queued') {
        const shouldCancelPreroll =
            sessionState.preroll.targetIndex !== null &&
            playlistIndex !== sessionState.preroll.targetIndex;
        if (shouldCancelPreroll) {
            cancelPreroll();
        } else {
            invokeMethod(playerInstance, 'pause');
            const didStart = maybeStartPreroll();
            if (didStart) return true;
            cancelPreroll();
        }
    }

    if (isPrerollPendingOrActive()) {
        if (playlistIndex === sessionState.preroll.targetIndex) {
            sessionState.currentPlaylistIndex = playlistIndex;
            return true;
        }

        cancelPreroll();

        dispatchStartup({ type: 'HANDOFF' });
    }

    if (sessionState.startup !== 'started') {
        dispatchStartup({ type: 'NAVIGATE', index: playlistIndex });
        return true;
    }

    if (playlistIndex !== sessionState.currentPlaylistIndex) {
        sessionState.currentPlaylistIndex = playlistIndex;
        invokeMethod(playerInstance, 'playlistItem', playlistIndex);
    }

    sessionState.wantReveal = true;
    if (sessionState.isVisible) {
        invokeMethod(playerInstance, 'play');
    } else {
        maybeReveal();
    }

    return true;
};

export function close() {
    if (!playerInstance) return;
    const hadActivePreroll = sessionState.preroll.status !== 'idle';

    abortPrerollController();

    clearComscoreRetry();
    resetComscoreAttachmentState();

    resetOpenSessionState();

    removeVerticalTouchActionStyle();
    detachVerticalTouchBridge(hostElement);

    dispatchStartup({ type: 'CLOSE' });
    teardownStartupSession();

    try {
        invokeMethod(playerInstance, 'pause');
        invokeMethod(playerInstance, 'stop');
    } catch (e) {
        // JW may already be torn down — nothing left to clean up.
    }
    if (
        !didDestroyPrerollDuringHandoff ||
        hadActivePreroll ||
        getAdHostElement()
    ) {
        destroyAdPlayer();
    }
    didDestroyPrerollDuringHandoff = false;
    setHostVisibility(false);
    moveHostToBody();
    sessionState.isVisible = false;
    clearListenerRegistrations();
}

export const open = ({
    playlist,
    fullListVideoData,
    variant,
    ownerKey,
    index = 0,
    urlAds,
    currentIndexRef,
    sentProgressRef,
    scrollerRef,
    handleNextCallback
} = {}) => {
    const nextPlaylist = resolvePlaylist(playlist);
    const nextFullList = resolveFullList(fullListVideoData);

    const resolvedOwnerKey = ownerKey || variant || 'default';

    if (
        sessionState.activeOwnerKey &&
        resolvedOwnerKey !== sessionState.activeOwnerKey
    ) {
        close();
    }

    sessionState.activeOwnerKey = resolvedOwnerKey;

    const targetIndex = toPlaylistIndex(nextFullList, index);
    queuePrerollIfNeeded(get(nextPlaylist, [targetIndex]), targetIndex);

    const isFreshSession = Boolean(playlist) && !sessionState.loadedThisSession;
    const nextSignature = isFreshSession
        ? computePlaylistSignature(nextPlaylist)
        : null;

    // The page keeps a single persistent player carrying its one Comscore
    // plugin, which cannot be re-attached once destroyed. A different
    // playlist is swapped in via loadPlaylist() on this SAME player instead
    // of remove()+setup(), so Comscore measurement survives the swap.
    if (
        isFreshSession &&
        playerInstance &&
        loadedPlaylistSignature !== null &&
        nextSignature !== loadedPlaylistSignature
    ) {
        loadPlaylist(
            playerInstance,
            buildJwPlaylist({ playlist: nextPlaylist })
        );
    }

    const player = ensure({ playlist: nextPlaylist, urlAds });

    if (!player || !hostElement) return null;

    sessionState.activePlaylist = nextPlaylist;
    sessionState.activeFullList = nextFullList;
    hostElement.setAttribute('data-variant', variant || '');

    if (variant === 'vertical') {
        ensureVerticalTouchActionStyle();
        attachVerticalTouchBridge(hostElement, scrollerRef);
        attachTouchBridgeToAdHost(getAdHostElement);
    } else {
        removeVerticalTouchActionStyle();
        detachVerticalTouchBridge(hostElement);
    }

    if (isFreshSession) {
        loadedPlaylistSignature = nextSignature;
        sessionState.loadedThisSession = true;

        dispatchStartup({ type: 'OPEN', target: targetIndex });
    }

    if (isFreshSession) {
        registerTrackingListeners({
            player,
            playlist: nextPlaylist,
            fullListVideoData: nextFullList,
            currentIndexRef,
            sentProgressRef,
            handleNextCallback
        });

        armStartupListener(player);
    }

    goToIndex(index, nextFullList);

    return player;
};

export const positionOver = (element, mountElement) => {
    if (!hasDom() || !element) return;

    sessionState.pendingPosition = { element, mountElement };

    applyPendingPosition();

    const playlistIndex = sessionState.currentPlaylistIndex;
    if (playlistIndex === null || sessionState.startup === 'started') return;

    queuePrerollIfNeeded(
        get(sessionState.activePlaylist, [playlistIndex]),
        playlistIndex,
        true
    );
    maybeStartPreroll();
};
