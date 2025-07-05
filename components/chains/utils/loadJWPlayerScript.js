function loadJWPlayerScript(playerId, onLoadCallback) {
    const script = document.createElement('script');
    script.src = `https://cdn.jwplayer.com/libraries/${playerId}.js`;
    script.id = playerId;
    script.async = true;

    if (onLoadCallback) {
        script.onload = onLoadCallback;
    }

    document.body.appendChild(script);
}

export default loadJWPlayerScript;
