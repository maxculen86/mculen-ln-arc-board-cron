window.dataLayer = window.dataLayer || [];

function getAccessSource() {
    const isPWA = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone =
        'standalone' in window?.navigator &&
        window?.navigator.standalone === true;

    return isPWA || isIOSStandalone ? 'pwa' : 'web';
}

if (sessionStorage.getItem('access_source_tracked') !== 'true') {
    const access_source = getAccessSource();
    window.dataLayer.push({
        event: 'access_origin',
        access_source
    });
    sessionStorage.setItem('access_source_tracked', 'true');
}
