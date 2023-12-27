export const pushAdblockEventToDataLayer = detectado => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'adblock-detected',
        detectado
    });
};
const checkAdblock = async () => {
    try {
        await fetch(
            'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
            {
                method: 'HEAD',
                mode: 'no-cors'
            }
        );
        pushAdblockEventToDataLayer(false);
    } catch (error) {
        pushAdblockEventToDataLayer(true);
    }
};

window.addEventListener('load', checkAdblock);
