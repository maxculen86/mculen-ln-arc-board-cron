import {
    MOBILE_USER_AGENTS,
    MOBILE_BREAKPOINT,
    URL_TEMPLATE,
    VIDEO_VERTICAL_RATIO
} from './constants';

export const isMobile = () =>
    MOBILE_USER_AGENTS.test(navigator.userAgent) &&
    window.screen.width < MOBILE_BREAKPOINT;

export const buildVideoShareUrl = videoId =>
    window.location.origin +
    URL_TEMPLATE.BASE_PATH +
    videoId +
    URL_TEMPLATE.SUFFIX;

export const isVerticalVideo = aspectRatio =>
    aspectRatio === VIDEO_VERTICAL_RATIO;

export const videoContainer = (container, mediaId) =>
    container.querySelector(`button[id="share-video-button-${mediaId}"]`);
