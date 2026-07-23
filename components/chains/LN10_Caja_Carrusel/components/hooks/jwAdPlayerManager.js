import get from '../../../../private/common/utils/get';
import {
    createPlayerHost,
    HOST_Z_INDEX,
    hasDom,
    invokeMethod,
    positionHostOverRect
} from './jwPlayerShared';
import { emitDiagnostic } from './jwPlayerDiagnostics';

export const AD_HOST_ID = 'jw-ad-player-host';
export const HANDOFF_WATCHDOG_MS = 7000;
export const POST_IMPRESSION_WATCHDOG_MS = 120000;

let adHost = null;
let adPlayerInstance = null;
let lastAdResize = null;
let activeController = null;

const scheduleAfterProviderCallback = callback => {
    if (typeof queueMicrotask === 'function') {
        queueMicrotask(callback);
        return;
    }

    Promise.resolve().then(callback);
};

const detachListeners = controller => {
    if (!controller || !controller.player) return;

    if (controller.iframeObserver) controller.iframeObserver.disconnect();

    Object.entries(controller.listeners).forEach(([event, callback]) => {
        if (typeof callback !== 'function') return;
        try {
            invokeMethod(controller.player, 'off', event, callback);
        } catch (error) {
            // A partially disposed JW player cannot retain a meaningful listener.
        }
    });
};

const removeHost = host => {
    if (host && typeof host.remove === 'function') host.remove();
};

const removeOwnedIframes = controller => {
    if (!controller) return;

    controller.ownedIframes.forEach(iframe => {
        if (iframe && typeof iframe.remove === 'function') iframe.remove();
    });
};

const makeAdSurfaceInert = (player, host) => {
    try {
        invokeMethod(player, 'setMute', true);
    } catch (error) {
        // Continue through every inerting step when the provider is degraded.
    }
    try {
        invokeMethod(player, 'pause');
    } catch (error) {
        // Continue through every inerting step when the provider is degraded.
    }

    if (host) {
        const hostStyle = host.style;
        hostStyle.pointerEvents = 'none';
        hostStyle.visibility = 'hidden';
        hostStyle.display = 'none';
        host.querySelectorAll('video, audio').forEach(media => {
            try {
                media.pause();
            } catch (error) {
                // The host is removed below even when native media rejects pause.
            }
        });
    }
    removeHost(host);
};

export const getAdHostElement = () => adHost;

export const positionAdHost = (slotElement, { force = false } = {}) => {
    if (!slotElement?.isConnected || !adHost?.isConnected) return;

    positionHostOverRect({
        host: adHost,
        target: slotElement,
        player: adPlayerInstance,
        lastSize: lastAdResize,
        setLastSize: next => {
            lastAdResize = next;
        },
        force,
        onResizeError: () => {}
    });
};

export const destroy = () => {
    if (activeController) {
        activeController.cancelled = true;
        if (typeof activeController.captureOwnedIframes === 'function') {
            activeController.captureOwnedIframes();
        }
        detachListeners(activeController);
        removeOwnedIframes(activeController);
    }

    if (adPlayerInstance) {
        try {
            invokeMethod(adPlayerInstance, 'remove');
        } catch (e) {
            // Surface the failure instead of swallowing it; JW may already be gone.
            emitDiagnostic(
                { source: 'jwAdPlayerManager/destroy', error: e },
                { errorMessage: get(e, 'message') || 'ad player remove failed' }
            );
        }
    }

    if (adHost && typeof adHost.remove === 'function') {
        adHost.remove();
    }
    adHost = null;
    adPlayerInstance = null;
    lastAdResize = null;
    activeController = null;
};

export const playPreroll = ({
    config,
    slotElement,
    mountElement,
    onImpression,
    onHandoff,
    onError,
    onResumeRequested,
    isCurrent,
    scheduleAfterProviderCallback: schedule = scheduleAfterProviderCallback
} = {}) => {
    if (!hasDom() || !config) {
        if (typeof onError === 'function') onError();
        return;
    }

    const recover = error => {
        destroy();
        if (typeof onError === 'function') onError(error);
    };

    try {
        const jwplayerFn = get(window, 'jwplayer');
        if (!jwplayerFn) {
            if (typeof onError === 'function') onError();
            return;
        }

        destroy();

        const adPlayerId = `jw-ad-player-${Date.now()}`;
        const created = createPlayerHost({
            hostId: AD_HOST_ID,
            playerId: adPlayerId,
            hostParent: mountElement || document.body,
            hostStyles: {
                zIndex: HOST_Z_INDEX,
                overflow: 'hidden'
            },
            playerStyles: {
                width: '100%',
                height: '100%'
            }
        });

        if (!created) {
            if (typeof onError === 'function') onError();
            return;
        }

        adHost = created.hostElement;
        positionAdHost(slotElement);

        adPlayerInstance = invokeMethod(
            jwplayerFn(adPlayerId),
            'setup',
            config
        );

        if (!adPlayerInstance) {
            destroy();
            if (typeof onError === 'function') onError();
            return;
        }

        const controller = {
            cancelled: false,
            terminalAccepted: false,
            handoffNotified: false,
            player: adPlayerInstance,
            host: adHost,
            listeners: {},
            ownedIframes: new Set()
        };
        const captureOwnedIframes = () => {
            controller.host.querySelectorAll('iframe').forEach(iframe => {
                controller.ownedIframes.add(iframe);
            });
        };
        controller.captureOwnedIframes = captureOwnedIframes;
        captureOwnedIframes();
        if (typeof MutationObserver === 'function') {
            controller.iframeObserver = new MutationObserver(
                captureOwnedIframes
            );
            controller.iframeObserver.observe(controller.host, {
                childList: true,
                subtree: true
            });
        }
        activeController = controller;

        const notifySafeToHandoff = (reason, disposal) => {
            if (
                controller.cancelled ||
                controller.handoffNotified ||
                activeController !== controller
            )
                return;

            controller.handoffNotified = true;
            if (typeof onHandoff === 'function') {
                onHandoff({ reason, disposal });
            }
        };

        const requestTerminal = reason => {
            if (
                controller.cancelled ||
                controller.terminalAccepted ||
                activeController !== controller
            )
                return false;

            controller.terminalAccepted = true;
            schedule(() => {
                if (controller.cancelled || activeController !== controller)
                    return;

                captureOwnedIframes();
                detachListeners(controller);
                let disposal = 'removed';
                try {
                    invokeMethod(controller.player, 'remove');
                } catch (error) {
                    disposal = 'fallback-inert';
                    makeAdSurfaceInert(controller.player, controller.host);
                }

                if (disposal === 'removed') removeHost(controller.host);
                removeOwnedIframes(controller);
                notifySafeToHandoff(reason, disposal);
                if (activeController === controller) {
                    adHost = null;
                    adPlayerInstance = null;
                    lastAdResize = null;
                    activeController = null;
                }
            });
            return true;
        };

        controller.listeners.adImpression = () => {
            captureOwnedIframes();
            if (typeof onImpression === 'function') onImpression();
        };
        controller.listeners.adBreakEnd = () => requestTerminal('success');
        controller.listeners.adSkipped = () => requestTerminal('skip');
        controller.listeners.adError = () => requestTerminal('error');
        controller.listeners.adRequestedContentResume = () => {
            if (typeof onResumeRequested === 'function') onResumeRequested();
        };
        invokeMethod(
            adPlayerInstance,
            'on',
            'adImpression',
            controller.listeners.adImpression
        );
        invokeMethod(
            adPlayerInstance,
            'on',
            'adBreakEnd',
            controller.listeners.adBreakEnd
        );
        invokeMethod(
            adPlayerInstance,
            'on',
            'adSkipped',
            controller.listeners.adSkipped
        );
        invokeMethod(
            adPlayerInstance,
            'on',
            'adError',
            controller.listeners.adError
        );
        invokeMethod(
            adPlayerInstance,
            'on',
            'adRequestedContentResume',
            controller.listeners.adRequestedContentResume
        );
        controller.listeners.ready = () => {
            captureOwnedIframes();
            if (typeof isCurrent === 'function' && !isCurrent()) return;
            if (!slotElement?.isConnected) return;
            if (mountElement && !mountElement.isConnected) return;

            positionAdHost(slotElement, { force: true });
        };
        invokeMethod(
            adPlayerInstance,
            'on',
            'ready',
            controller.listeners.ready
        );
        positionAdHost(slotElement);
        // Callers rely on an optional return: undefined on the guard/recover paths.
        // eslint-disable-next-line consistent-return
        return { requestTerminal };
    } catch (error) {
        recover(error);
    }
};
