import {
    createYoutubeDataLayerTracker,
    ensureYoutubeJsApiParams,
    extractYoutubeVideoData,
    getYoutubeVideoMode,
    YOUTUBE_PLAYER_STATES
} from '../../../../components/private/common/youtubeTracking/utils';

const YOUTUBE_API_SRC = 'https://www.youtube.com/iframe_api';
const YOUTUBE_IFRAME_SELECTOR =
    'iframe[src*="youtube.com/embed/"], iframe[data-src*="youtube.com/embed/"]';
const TRACKING_ATTR = 'data-youtube-tracking-initialized';
const YOUTUBE_MODE_ATTR = 'data-youtube-video-mode';
const PROGRESS_INTERVAL = 1000;
const API_READY_CHECK_INTERVAL = 100;
const YOUTUBE_EMBED_URL_REGEX = /youtube\.com\/embed\//i;

let apiCallbacks = [];
let isApiLoading = false;
let generatedIframeId = 0;
let apiReadyInterval;

const isYoutubeApiReady = () => Boolean(window.YT && window.YT.Player);
const flushApiCallbacks = () => {
    if (apiReadyInterval) {
        clearInterval(apiReadyInterval);
        apiReadyInterval = null;
    }

    const callbacks = apiCallbacks;
    apiCallbacks = [];
    callbacks.forEach(readyCallback => readyCallback());
};

const waitForYoutubeApiReady = () => {
    if (apiReadyInterval) return;

    apiReadyInterval = setInterval(() => {
        if (!isYoutubeApiReady()) return;
        flushApiCallbacks();
    }, API_READY_CHECK_INTERVAL);
};

const getIframeUrlAttribute = iframe =>
    YOUTUBE_EMBED_URL_REGEX.test(iframe.getAttribute('src') || '')
        ? 'src'
        : 'data-src';

const ensureIframeId = iframe => {
    if (iframe.id) return iframe.id;

    generatedIframeId += 1;
    const iframeId = `youtube-tracking-${generatedIframeId}`;
    iframe.setAttribute('id', iframeId);
    return iframeId;
};

const getVideoTitle = (playerData, iframe) =>
    (playerData && playerData.title) || iframe.getAttribute('title') || '';

const getVideoMode = iframe =>
    iframe.getAttribute(YOUTUBE_MODE_ATTR) ||
    iframe
        .closest?.(`[${YOUTUBE_MODE_ATTR}]`)
        ?.getAttribute(YOUTUBE_MODE_ATTR) ||
    '';

const safePlayerNumber = (player, method) => {
    if (!player || typeof player[method] !== 'function') return 0;
    return player[method]() || 0;
};

const loadYoutubeApi = callback => {
    if (isYoutubeApiReady()) {
        callback();
        return;
    }

    apiCallbacks.push(callback);

    if (isApiLoading) return;

    isApiLoading = true;

    const previousReadyCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
        if (typeof previousReadyCallback === 'function') {
            previousReadyCallback();
        }

        flushApiCallbacks();
    };

    const existingScript = document.querySelector(
        `script[src="${YOUTUBE_API_SRC}"]`
    );

    if (existingScript) {
        waitForYoutubeApiReady();
        return;
    }

    const script = document.createElement('script');
    script.src = YOUTUBE_API_SRC;
    document.head.appendChild(script);
};

const initializeIframe = iframe => {
    if (iframe.getAttribute(TRACKING_ATTR) === 'true') return;

    const iframeUrlAttribute = getIframeUrlAttribute(iframe);
    const iframeUrl = iframe.getAttribute(iframeUrlAttribute) || '';
    const videoData = extractYoutubeVideoData(iframeUrl);
    const normalizedIframeUrl = ensureYoutubeJsApiParams(
        iframeUrl,
        window.location.origin
    );

    if (iframeUrl !== normalizedIframeUrl) {
        iframe.setAttribute(iframeUrlAttribute, normalizedIframeUrl);
    }

    if (!videoData.url || iframeUrlAttribute !== 'src') return;

    iframe.setAttribute(TRACKING_ATTR, 'true');
    ensureIframeId(iframe);

    loadYoutubeApi(() => {
        let tracker;
        let progressInterval;

        const stopProgressTracking = () => {
            if (!progressInterval) return;
            clearInterval(progressInterval);
            progressInterval = null;
        };

        const getTracker = player => {
            if (tracker) return tracker;

            window.dataLayer = window.dataLayer || [];

            const playerData =
                (player.getVideoData && player.getVideoData()) || {};

            tracker = createYoutubeDataLayerTracker({
                video: {
                    id: videoData.id,
                    url: videoData.url,
                    title: getVideoTitle(playerData, iframe),
                    mode: getYoutubeVideoMode({
                        url: videoData.url,
                        mode: getVideoMode(iframe),
                        playerData
                    }),
                    context: {
                        content_type: 'home'
                    }
                }
            });

            return tracker;
        };

        const trackCurrentProgress = player => {
            getTracker(player).trackProgress({
                currentTime: safePlayerNumber(player, 'getCurrentTime'),
                duration: safePlayerNumber(player, 'getDuration')
            });
        };

        const startProgressTracking = player => {
            stopProgressTracking();
            progressInterval = setInterval(
                () => trackCurrentProgress(player),
                PROGRESS_INTERVAL
            );
        };

        // eslint-disable-next-line no-new
        new window.YT.Player(iframe, {
            events: {
                onStateChange: event => {
                    const player = event.target;

                    getTracker(player).handleStateChange({
                        state: event.data,
                        currentTime: safePlayerNumber(player, 'getCurrentTime'),
                        duration: safePlayerNumber(player, 'getDuration')
                    });

                    if (event.data === YOUTUBE_PLAYER_STATES.PLAYING) {
                        startProgressTracking(player);
                        return;
                    }

                    if (
                        event.data === YOUTUBE_PLAYER_STATES.PAUSED ||
                        event.data === YOUTUBE_PLAYER_STATES.ENDED
                    ) {
                        stopProgressTracking();
                    }
                }
            }
        });
    });
};

const scanYoutubeIframes = () => {
    const iframes = document.querySelectorAll(YOUTUBE_IFRAME_SELECTOR);
    iframes.forEach(initializeIframe);
};

const observeYoutubeIframes = () => {
    if (!window.MutationObserver || !document.body) return;

    const observer = new MutationObserver(scanYoutubeIframes);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'data-src']
    });
};

const init = () => {
    scanYoutubeIframes();
    observeYoutubeIframes();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
