export const isNativeShareSupported = () =>
    typeof navigator !== 'undefined' && 'share' in navigator;

export const shareNative = async (title, text, url) => {
    if (!isNativeShareSupported()) {
        return false;
    }

    try {
        await navigator.share({ title, text, url });
        return true;
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Share error:', error);
        }
        return false;
    }
};
