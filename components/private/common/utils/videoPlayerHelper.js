import { addEventToDataLayerV2 } from '../../LN/common/utils/addEventToDataLayer';

export const isInDatalayerEvent = (event, videoId) =>
    window &&
    window.dataLayer &&
    window.dataLayer.some(
        element => element.event === event && element.videoID === videoId
    );

export const addVideoDisplayEvent = ({ title, idVideo }) => {
    if (isInDatalayerEvent('videoDisplay', `${idVideo}`)) {
        return;
    }

    if (window && window.dataLayer) {
        window.dataLayer.push({
            event: 'videoDisplay',
            videoName: `${title}`,
            videoID: `${idVideo}`
        });
    }
};

export const updatedMediaData = (source, { title, id }) => {
    const currentItem = source?.item || source || {};

    return {
        title: currentItem.title || title,
        id: currentItem.mediaid || id
    };
};

export const pushVideoControlEvent = ({ id, title, action }) => {
    if (!action || !id || !title) return;

    const payload = {
        event: 'e_videoclick',
        category: `${id}`,
        action,
        label: `${title}`
    };

    addEventToDataLayerV2(payload);
};

export const isBackwardTenSeconds = event => {
    if (!event) return false;

    const offset = event.offset ?? 0;
    const position = event.position ?? 0;
    const jump = offset - position;

    return jump <= -8 && jump >= -12;
};

export const getFullscreenAction = event =>
    event?.fullscreen ? 'fullscreen' : 'exit_fullscreen';

export const getMuteAction = event => (event?.mute ? 'mute' : 'unmute');

export const shouldTrackRelatedOpen = event => event?.method !== 'complete';

export const registerVolumeRelease = onRelease => {
    const handleRelease = () => {
        onRelease?.();
    };

    document.addEventListener('mouseup', handleRelease, { once: true });
    document.addEventListener('touchend', handleRelease, { once: true });
};
