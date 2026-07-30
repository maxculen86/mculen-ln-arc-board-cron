import { addEventToDataLayerV2 } from '../../LN/common/utils/addEventToDataLayer';

const YOUTUBE_EMBED_URL_REGEX =
    /((?:https?:)?\/\/(?:www\.)?youtube\.com\/embed\/([\w-]+)?[^"'<>\s]*)/i;
const YOUTUBE_LIVE_EMBED_URL_REGEX =
    /(?:https?:)?\/\/(?:www\.)?youtube\.com\/embed\/live_stream(?:[/?#]|$)/i;

const DEFAULT_MILESTONES = [10, 25, 50, 75];

export const YOUTUBE_VIDEO_MODES = {
    MANUAL: 'manual',
    AUTOPLAY: 'autoplay',
    LIVE: 'live'
};

export const YOUTUBE_PLAYER_STATES = {
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2
};

const normalizeValue = value =>
    String(value || '')
        .replace(/&amp;/g, '&')
        .trim();

const normalizeUrl = url => {
    if (!url) return '';
    if (url.startsWith('//')) return `https:${url}`;
    return url;
};

const removeYoutubeJsApiParams = url => {
    if (!url) return '';

    const videoUrl = new URL(url, window.location.origin);
    videoUrl.searchParams.delete('enablejsapi');
    videoUrl.searchParams.delete('origin');

    return videoUrl.toString();
};

const getYoutubeUrlParam = (url = '', paramName = '') => {
    if (!url || !paramName) return '';

    try {
        return new URL(url, window.location.origin).searchParams.get(paramName);
    } catch (error) {
        return '';
    }
};

const normalizeYoutubeVideoId = videoId =>
    videoId === 'live_stream' ? '' : videoId;

export const extractYoutubeVideoData = value => {
    const match = normalizeValue(value).match(YOUTUBE_EMBED_URL_REGEX);
    const url = removeYoutubeJsApiParams(normalizeUrl(match?.[1] || ''));

    if (!url) return { id: '', url: '' };

    return {
        id: normalizeYoutubeVideoId(match?.[2] || ''),
        url
    };
};

export const ensureYoutubeJsApiParams = (rawUrl = '', origin = '') => {
    if (!rawUrl || !extractYoutubeVideoData(rawUrl).url) return rawUrl;

    const url = new URL(rawUrl, window.location.origin);
    url.searchParams.set('enablejsapi', '1');

    if (origin) {
        url.searchParams.set('origin', origin);
    }

    return url.toString();
};

export const getYoutubeVideoMode = ({
    url = '',
    mode = '',
    playerData = {}
} = {}) => {
    if (
        mode === YOUTUBE_VIDEO_MODES.LIVE ||
        playerData?.isLive ||
        YOUTUBE_LIVE_EMBED_URL_REGEX.test(url)
    ) {
        return YOUTUBE_VIDEO_MODES.LIVE;
    }

    if (mode === YOUTUBE_VIDEO_MODES.AUTOPLAY) {
        return YOUTUBE_VIDEO_MODES.AUTOPLAY;
    }

    if (mode === YOUTUBE_VIDEO_MODES.MANUAL) {
        return YOUTUBE_VIDEO_MODES.MANUAL;
    }

    return getYoutubeUrlParam(url, 'autoplay') === '1'
        ? YOUTUBE_VIDEO_MODES.AUTOPLAY
        : YOUTUBE_VIDEO_MODES.MANUAL;
};

const createMilestoneTracker = (milestones = []) => {
    const sent = new Set();

    return {
        getMilestones(percent = 0) {
            return milestones.filter(milestone => {
                if (percent < milestone || sent.has(milestone)) return false;
                sent.add(milestone);
                return true;
            });
        }
    };
};

export const createYoutubeDataLayerTracker = ({
    video,
    milestones = DEFAULT_MILESTONES
}) => {
    const milestoneTracker = createMilestoneTracker(milestones);
    let hasStarted = false;
    let wasPaused = false;
    let hasCompleted = false;
    const videoMode = video.mode || YOUTUBE_VIDEO_MODES.MANUAL;

    const dataLayerEventPayload = {
        contentType: video.context?.content_type,
        rest: {
            mode: videoMode,
            videoID: video.id,
            ...(video.url && { videoURL: video.url }),
            videoName: video.title
        }
    };

    const trackProgress = ({ currentTime = 0, duration = 0 }) => {
        if (videoMode === YOUTUBE_VIDEO_MODES.LIVE || !duration) return;

        const percent = Math.floor((currentTime / duration) * 100);

        milestoneTracker.getMilestones(percent).forEach(milestone => {
            addEventToDataLayerV2({
                event: `videoProgressYoutube${milestone}`,
                ...dataLayerEventPayload
            });
        });
    };

    return {
        trackProgress,
        handleStateChange({ state, currentTime = 0, duration = 0 } = {}) {
            if (state === YOUTUBE_PLAYER_STATES.PLAYING) {
                if (wasPaused) {
                    wasPaused = false;
                    addEventToDataLayerV2({
                        event: 'videoResumeYoutube',
                        ...dataLayerEventPayload
                    });
                    return;
                }

                if (!hasStarted) {
                    hasStarted = true;
                    addEventToDataLayerV2({
                        event: 'videoPlayYoutube',
                        ...dataLayerEventPayload
                    });
                }

                trackProgress({ currentTime, duration });
                return;
            }

            if (state === YOUTUBE_PLAYER_STATES.PAUSED && hasStarted) {
                wasPaused = true;
                addEventToDataLayerV2({
                    event: 'videoPauseYoutube',
                    ...dataLayerEventPayload
                });
                return;
            }

            if (
                state === YOUTUBE_PLAYER_STATES.ENDED &&
                hasStarted &&
                !hasCompleted
            ) {
                hasCompleted = true;
                addEventToDataLayerV2({
                    event: 'videoCompleteYoutube',
                    ...dataLayerEventPayload
                });
            }
        }
    };
};
