import { isMobile, buildVideoShareUrl } from './utils';
import { shareNative } from './nativeShare';
import { copyToClipboard } from './clipboardManager';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const activeTooltips = new Map();

const getTooltipElement = mediaId => {
    const shareButton = document.getElementById(
        `share-video-button-${mediaId}`
    );
    return (
        shareButton?.parentElement?.querySelector('[role="tooltip"]') || null
    );
};

const showTooltipTemporarily = (mediaId, duration = 3000) => {
    if (activeTooltips.has(mediaId)) {
        clearTimeout(activeTooltips.get(mediaId));
    }

    const tooltip = getTooltipElement(mediaId);
    if (!tooltip) return;

    tooltip.classList.remove('none');
    const timeoutId = setTimeout(() => {
        tooltip.classList.add('none');
        activeTooltips.delete(mediaId);
    }, duration);

    activeTooltips.set(mediaId, timeoutId);
};

const trackShareEvent = (videoId, title, tags) => {
    addEventToDataLayerV2({
        event: 'share_video',
        rest: {
            id_video: videoId,
            tags,
            title
        }
    });
};

const handleClipboardShare = async (url, videoId, title, mediaId) => {
    await copyToClipboard(url);
    trackShareEvent(videoId, title, 'copiar link');
    if (mediaId) {
        showTooltipTemporarily(mediaId);
    }
};

export const handleShare = async (videoId, title, mediaId) => {
    const url = buildVideoShareUrl(videoId);
    const mobile = isMobile();

    if (!mobile) {
        await handleClipboardShare(url, videoId, title, mediaId);
        return;
    }

    const nativeShared = await shareNative(title, title, url);
    if (nativeShared) {
        trackShareEvent(videoId, title, 'Nativo');
    } else {
        await handleClipboardShare(url, videoId, title, mediaId);
    }
};
