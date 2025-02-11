export function createScriptBanners() {
    const scriptAddManager = `https://securepubads.g.doubleclick.net/tag/js/gpt.js`;
    const scriptElement = document?.querySelector(
        `script[src="${scriptAddManager}"]`
    );

    if (document && !scriptElement) {
        const script = document.createElement('script');
        script.src = scriptAddManager;
        script.async = true;
        document.body.appendChild(script);
    }
}
