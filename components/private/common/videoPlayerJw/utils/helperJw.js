import {
    isInDatalayerEvent,
    addVideoDisplayEvent
} from '../../utils/videoPlayerHelper';

import { FOTOAL100 } from '../../utils/subtypes/subtypeHelper';
import transformISODate from '../../utils/transformISODate';
import { addEventToDataLayerV2 } from '../../../LN/common/utils/addEventToDataLayer';

export const configClassName = {
    'la-nacion-ar': {
        container: 'content-media cursor-pointer',
        mediaContainer: 'mod-media ratio-16-9',
        videoContainer: 'mod-video',
        videoPlayer: 'video-player bg-black ratio-16-9',
        facade: 'com-image'
    },
    ott: {
        container: 'container cursor-pointer pt-32',
        mediaContainer: 'ratio-16-9',
        videoPlayer: 'video-player bg-black ratio-16-9',
        facade: 'flex w-100 h-100'
    }
};

export function transformImages(data, subtype = '') {
    return data
        .filter(item => [480, 720, 1280].includes(item.width))
        .map(item => ({
            srcSet: item.src,
            ...(item.width === 480 && { maxWidth: 767 }),
            ...(item.width === 720 && { minWidth: 768 }),
            ...(item.width === 1280 && { minWidth: 1280 })
        }))
        .filter(item => {
            if (
                subtype !== FOTOAL100 &&
                item.srcSet.includes('1280') &&
                item.minWidth === 1280
            ) {
                return false;
            }
            return true;
        });
}

export function formatJwPlayerDate(timestamp) {
    if (!timestamp) return '';

    const date = new Date(timestamp * 1000);
    return `${date.toISOString().slice(0, -5)}Z`;
}

export const getAlternativeDescription = (uploadDate, noteTitle) => {
    if (!uploadDate) return '';

    const formattedDate = transformISODate(uploadDate);
    const baseDescription = `Video publicado el ${formattedDate} por LA NACION`;
    return noteTitle
        ? `Video de ${noteTitle} publicado el ${formattedDate} por LA NACION`
        : baseDescription;
};

export const getJWScript = (
    title,
    player,
    playlist,
    hasAutoplay = false,
    idVideo,
    tagsUrl,
    autostart = true,
    arcSite = ''
) => {
    const facadeDiv = document.getElementById(`facade-${idVideo}`);

    const setJwScript = () => {
        const scriptElement = document.createElement('script');
        scriptElement.src = `https://cdn.jwplayer.com/libraries/${player}.js`;
        document.head.appendChild(scriptElement);

        scriptElement.addEventListener('load', () => {
            window.jwplayer(`${idVideo}`).setup({
                playlist,
                autostart,
                mute: hasAutoplay || false,
                ...(arcSite === 'foodit' ? { related: null } : {}),
                ...(player === 'ih0086X3'
                    ? {
                          advertising: {
                              client: 'googima',
                              autoplayadsmuted: hasAutoplay || false,
                              schedule: [
                                  {
                                      tag: `"${tagsUrl}"`,
                                      offset: 'pre'
                                  }
                              ]
                          }
                      }
                    : {})
            });

            handleVideoEventsScript(title, idVideo);
        });

        if (facadeDiv) facadeDiv.remove();
    };

    hasAutoplay
        ? setJwScript()
        : facadeDiv.addEventListener('click', setJwScript);

    addVideoDisplayEvent({ title, idVideo });
};

export const handleVideoEventsScript = (title, idVideo) => {
    window.jwplayer(`${idVideo}`).on('ready', () => {
        const element = document.querySelector('.video-player');
        if (element) element.classList.remove('bg-black');
    });

    const events = [
        { jwEvent: 'play', eventName: 'videoPlay' },
        { jwEvent: 'pause', eventName: 'videoPause' }
    ];

    events.forEach(event => {
        window.jwplayer(`${idVideo}`).on(event.jwEvent, () => {
            addEventToDataLayerV2({
                event: event.eventName,
                videoName: `${title}`,
                videoID: `${idVideo}`
            });
        });
    });

    window.jwplayer(`${idVideo}`).on('time', e => {
        const percent = Math.floor((e.currentTime / e.duration) * 100);
        const percentagesToCheck = [25, 50, 75];

        percentagesToCheck.forEach(percentage => {
            if (
                !isInDatalayerEvent(percentage.toString(), `${idVideo}`) &&
                percent === percentage
            ) {
                addEventToDataLayerV2({
                    event: percentage.toString(),
                    videoName: `${title}`,
                    videoID: `${idVideo}`
                });
            }
        });
    });

    window.jwplayer(`${idVideo}`).on('complete', () => {
        if (!isInDatalayerEvent('videoComplete', `${idVideo}`)) {
            addEventToDataLayerV2({
                event: 'videoComplete',
                videoName: `${title}`,
                videoID: `${idVideo}`
            });
        }
    });
};
