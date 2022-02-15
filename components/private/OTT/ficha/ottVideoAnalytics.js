export default function loadOTTVideoAnalytics(titulo, videoId) {
    const datalayer = window.dataLayer;
    if (datalayer === undefined) return '';
    window.addEventListener('powaRender', event => {
        const powa = event.detail.powa;

        powa.on(PoWa.EVENTS.START, evPowa => {
            dataLayer.push({
                event: 'videoPlay',
                videoName: titulo,
                videoID: videoId
            });
        });

        powa.on(PoWa.EVENTS.PLAYBACK_25, evPowa => {
            dataLayer.push({
                event: '25',
                videoName: titulo,
                videoID: videoId
            });
        });

        powa.on(PoWa.EVENTS.PLAYBACK_50, evPowa => {
            dataLayer.push({
                event: '50',
                videoName: titulo,
                videoID: videoId
            });
        });

        powa.on(PoWa.EVENTS.PLAYBACK_75, evPowa => {
            dataLayer.push({
                event: '75',
                videoName: titulo,
                videoID: videoId
            });
        });

        powa.on(PoWa.EVENTS.COMPLETE, evPowa => {
            dataLayer.push({
                event: 'COMPLETE',
                videoName: titulo,
                videoID: videoId
            });
        });

        if (dataLayer) {
            dataLayer.push({
                event: 'videoDisplay',
                videoName: titulo,
                videoID: videoId
            });
        }
    });
}
