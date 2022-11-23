import { comscorePlayEvent } from '../videoPlayer/comscoreStreamingTag';

export const setPrerollAdsForPowa = adsURL => {
    window.PoWaSettings = window.PoWaSettings || {};
    window.PoWaSettings.advertising = window.PoWaSettings.advertising || {};

    window.PoWaSettings.advertising.adTag = (() => {
        return ({ powa, videoData }) => {
            return videoData.additional_properties.advertising.playAds
                ? adsURL
                : '';
        };
    })();
    window.PoWaSettings.advertising.adBar = {
        skipOffset: 5
    };
};

export const setEvent = (
    player,
    event,
    eventName,
    titulo,
    id,
    streamingAnalyticInstance = {}
) => {
    player.on(event, () => {
        addToDataLayer(eventName, titulo, id);
        event === 'play' && comscorePlayEvent(streamingAnalyticInstance);
    });
};

export const setProgressEvent = (player, titulo, id) => {
    const eventCases = {
        '0': () => {
            // NOSONAR - This is intentional
        },
        '25': () => {
            if (!isInDatalayerEvent('25', id)) {
                addToDataLayer('25', titulo, id);
            }
        },
        '50': () => {
            if (!isInDatalayerEvent('50', id)) {
                addToDataLayer('50', titulo, id);
            }
        },
        '75': () => {
            if (!isInDatalayerEvent('75', id)) {
                addToDataLayer('75', titulo, id);
            }
        }
    };

    player.on('time', (event, eventName) => {
        const percent = Math.floor((event.time / event.duration) * 100);
        (eventCases[percent] || eventCases['0'])();
    });
};

export const addToDataLayer = (eventName, titulo, id) => {
    window.dataLayer.push({
        event: eventName,
        videoName: titulo,
        videoID: id
    });
};

export const isInDatalayerEvent = (event, id) => {
    const result =
        window &&
        window.dataLayer &&
        window.dataLayer.find(
            element => element.event === event && element.videoID === id
        );

    return result || false;
};

export const setCustomErrorsVideoPlayer = () => {
    window.PoWaSettings = window.PoWaSettings || {};
    window.PoWaSettings.error = window.PoWaSettings.error || {
        template: error => {
            const eventIDs = {
                913: '¡Ups! Parece que este video no esta disponible en tu ubicación',
                931: '¡Ups! Parece que este video no esta disponible en tu ubicación'
            };
            return (
                eventIDs[error.eventID] ||
                eventIDs[error.error.eventID] ||
                '¡Ups! Parece que hubo un problema'
            );
        }
    };
};
