export const addToDataLayer = (eventName, titulo, id) => {
    window.dataLayer.push({
        event: eventName,
        videoName: titulo,
        videoID: id
    });
};

export const isInDatalayerEvent = (event, videoId) => {
    const result =
        window &&
        window.dataLayer &&
        window.dataLayer.find(
            element => element.event === event && element.videoID === videoId
        );

    return result || false;
};

export const setProgressEvent = (player, tituloVideo, videoId) => {
    const eventCases = {
        '0': () => {
            // NOSONAR - This is intentional
        },
        '25': () => {
            if (!isInDatalayerEvent('25', videoId)) {
                addToDataLayer('25', tituloVideo, videoId);
            }
        },
        '50': () => {
            if (!isInDatalayerEvent('50', videoId)) {
                addToDataLayer('50', tituloVideo, videoId);
            }
        },
        '75': () => {
            if (!isInDatalayerEvent('75', videoId)) {
                addToDataLayer('75', tituloVideo, videoId);
            }
        }
    };

    player.on('time', _event => {
        const percent = Math.floor((_event.time / _event.duration) * 100);
        (eventCases[percent] || eventCases['0'])();
    });
};

export const setVideoEvents = (event, videoId, tituloVideo) => {
    const setEvent = (player, _event, eventName) => {
        player.on(_event, () => {
            !isInDatalayerEvent(eventName, videoId) &&
                addToDataLayer(eventName, tituloVideo, videoId);
        });
    };

    const player = event.detail.powa;
    const playerID = event.detail.id;

    if (playerID.includes(videoId)) {
        setProgressEvent(player, tituloVideo, videoId);
        setEvent(player, 'play', 'videoPlay');
        setEvent(player, 'complete', 'videoComplete');
    }

    return null;
};
