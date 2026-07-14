const isBrowser = () => typeof window !== 'undefined';

export const isMobileWebView = () =>
    isBrowser() && typeof window?.mobileWebView !== 'undefined';
