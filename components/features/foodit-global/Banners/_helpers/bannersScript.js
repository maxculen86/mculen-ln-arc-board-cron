export function createScriptBanners() {
    const scriptAddManager = `https://securepubads.g.doubleclick.net/tag/js/gpt.js`;
    const scriptElement = document?.querySelector(
        `script[src="${scriptAddManager}"]`
    );

    if (document && !scriptElement) {
        const loadScript = () => {
            const script = document.createElement('script');
            script.src = scriptAddManager;
            script.async = true;
            document.body.appendChild(script);
        };

        const loadAfterFirstPaint = () => {
            if (requestIdleCallback) {
                requestIdleCallback(loadScript, { timeout: 2000 });
            } else {
                setTimeout(loadScript, 100);
            }
        };

        const paints = performance.getEntriesByType('paint');
        const hasFirstPaint =
            paints && paints.some(p => p.name === 'first-contentful-paint');

        if (hasFirstPaint || document.readyState === 'complete') {
            loadAfterFirstPaint();
        } else {
            window.addEventListener('load', loadAfterFirstPaint, {
                once: true
            });
        }
    }
}
