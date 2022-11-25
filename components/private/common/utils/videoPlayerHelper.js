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
        '0': () => {},
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

// Logica de carga diferida de script de powa

export const buildScriptPowa = apiEnv => {
    if (!document.querySelector('#script-powa')) {
        const scriptPowa = document.createElement('script');
        scriptPowa.src = `https://lanacionar.video-player.arcpublishing.com/${apiEnv}/powaBoot.js`; // Aca va concatenado apiEnv
        scriptPowa.id = 'script-powa';
        document.head.appendChild(scriptPowa);
    }
};

export const removeFacade = () => {
    const facade = document.querySelector('.content-facade');
    if (facade) facade.remove();
};

export const handleClickEvent = (videoId, target, apiEnv) => {
    const divPowa = document.querySelector(`[data-uuid="${videoId}"]`);
    const buttonPlay = target && target.querySelector('#button-play');

    divPowa && divPowa.setAttribute('data-autoPlay', true);
    buttonPlay && buttonPlay.classList.add('loader');

    buildScriptPowa(apiEnv);
};

export const withAutoPlay = (
    target,
    firstVideoId,
    isApertura,
    firstVideoCuerpoAutoplay,
    isDesktop
) => {
    if (isDesktop && target && target.getAttribute('id') === firstVideoId) {
        return isApertura || firstVideoCuerpoAutoplay;
    }

    return false;
};

export const setIntersectionObserver = (
    elements,
    apiEnv,
    isDesktop,
    firstVideoCuerpoAutoplay,
    firstVideoId,
    videoId,
    isApertura
) => {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(({ isIntersecting, target } = {}) => {
                if (isIntersecting) {
                    target.addEventListener('click', () =>
                        handleClickEvent(videoId, target, apiEnv)
                    );

                    withAutoPlay(
                        target,
                        firstVideoId,
                        isApertura,
                        firstVideoCuerpoAutoplay,
                        isDesktop
                    ) && target.click();
                }
            });
        },
        { threshold: 0.5 }
    );

    elements.forEach(item => {
        const videoPowa = item.querySelector(`[id="${videoId}"]`);
        if (videoPowa) {
            observer.observe(videoPowa);
        }
    });

    return observer;
};

export const getClassCondition = (isNote, isApertura) => {
    if (isNote) {
        return isApertura ? ' --isApertura --facade' : ' --facade';
    }

    return '';
};
