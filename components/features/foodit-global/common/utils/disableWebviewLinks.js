import { isMobileWebView } from './isMobileWebView';

export const WEBVIEW_DISABLED_SELECTOR = '[data-webview-disabled]';

export const initWebviewLinkGuard = () => {
    if (typeof document === 'undefined') return undefined;

    const elements = document.querySelectorAll(WEBVIEW_DISABLED_SELECTOR);

    const onClick = event => {
        if (!isMobileWebView()) return;
        event.preventDefault();
        event.stopPropagation();
    };

    elements.forEach(el => el.addEventListener('click', onClick, true));

    return () => {
        elements.forEach(el => el.removeEventListener('click', onClick, true));
    };
};
