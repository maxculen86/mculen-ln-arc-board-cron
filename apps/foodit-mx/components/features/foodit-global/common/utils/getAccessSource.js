import isSSR from '../../../../private/LN/common/utils/isSSR';

export function getAccessSource() {
    if (isSSR()) return 'web';

    const isPWA = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone =
        'standalone' in window.navigator &&
        window.navigator.standalone === true;

    return isPWA || isIOSStandalone ? 'pwa' : 'web';
}
