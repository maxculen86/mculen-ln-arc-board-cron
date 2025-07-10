import { CLIPBOARD_STYLES } from './constants';

const copyWithClipboardAPI = async text => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Copy error:', error);
        return false;
    }
};

const copyWithLegacyMethod = text => {
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        Object.assign(textarea.style, CLIPBOARD_STYLES);

        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);

        return success;
    } catch (error) {
        console.error('Copy error:', error);
        return false;
    }
};

export const copyToClipboard = async text => {
    if (navigator.clipboard) {
        return copyWithClipboardAPI(text);
    }
    return copyWithLegacyMethod(text);
};
