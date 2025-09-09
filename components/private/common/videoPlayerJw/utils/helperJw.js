import {
    isInDatalayerEvent,
    addVideoDisplayEvent
} from '../../utils/videoPlayerHelper';

import {
    FOTOAL100,
    LIVEBLOG_EDITORIAL
} from '../../utils/subtypes/subtypeHelper';
import transformISODate from '../../utils/transformISODate';
import { addEventToDataLayerV2 } from '../../../LN/common/utils/addEventToDataLayer';

export const configClassName = {
    'la-nacion-ar': {
        horizontal: {
            container: 'content-media cursor-pointer container-center-100',
            mediaContainer: 'mod-media ratio-16-9',
            videoContainer: 'mod-video',
            videoPlayer: 'video-player bg-black ratio-16-9',
            facade: 'com-image',
            facadeContainer: 'ratio-16-9',
            captionClasses: 'px-0_l mb-8'
        },
        vertical: {
            container: 'content-media cursor-pointer',
            mediaContainer: 'mod-media w-100',
            videoContainer: 'mod-video flex flex-column ai-center bg-black',
            videoPlayer:
                'video-player w-320 h-640 w-100 ratio-9-16 flex jc-center ai-center',
            facade: 'com-image',
            facadeContainer: 'w-320 ratio-9-16',
            captionClasses: 'w-100'
        }
    },
    ott: {
        horizontal: {
            container: 'container cursor-pointer pt-32',
            mediaContainer: 'ratio-16-9',
            videoPlayer: 'video-player bg-black ratio-16-9',
            facade: 'flex w-100 h-100',
            captionClasses: 'px-0_l mb-8'
        }
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
        .filter(
            item =>
                !(
                    subtype !== FOTOAL100 &&
                    item.srcSet.includes('1280') &&
                    item.minWidth === 1280
                )
        );
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

export const handleVideoEventsScript = (
    title,
    idVideo,
    initialVideoMode = ''
) => {
    const player = window.jwplayer(`${idVideo}`);
    player.on('ready', () => {
        const element = document.querySelector('.video-player');
        if (element) element.classList.remove('bg-black');
    });

    let firstPlay = true;

    player.on('play', (e = {}) => {
        let mode;
        if (firstPlay && initialVideoMode) {
            mode = initialVideoMode;
        } else {
            const reason = e.playReason;
            const isAutoplay = reason === 'autostart' || reason === 'viewable';
            mode = isAutoplay ? 'autoplay' : 'manual';
        }
        firstPlay = false;

        addEventToDataLayerV2({
            event: 'videoPlay',
            videoName: `${title}`,
            videoID: `${idVideo}`,
            rest: { mode }
        });
    });

    player.on('pause', () => {
        addEventToDataLayerV2({
            event: 'videoPause',
            videoName: `${title}`,
            videoID: `${idVideo}`
        });
    });

    player.on('time', e => {
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

    player.on('complete', () => {
        if (!isInDatalayerEvent('videoComplete', `${idVideo}`)) {
            addEventToDataLayerV2({
                event: 'videoComplete',
                videoName: `${title}`,
                videoID: `${idVideo}`
            });
        }
    });
};

export const getVerticalPlayer = playerId => {
    const idsPlayersVertical = ['hOz6uuUy', 'HbGKzdo0', '9gbjbJp8', 'tMVdYMxO'];
    return idsPlayersVertical.includes(playerId);
};

export const buildTagsUrl = (baseUrl = '') => {
    try {
        const pdfLocalStorage = localStorage.getItem('_pdfps') || '[]';
        const permutiveSegment = encodeURIComponent(
            `&permutive=${encodeURIComponent(
                JSON.parse(pdfLocalStorage).slice(0, 250).join(',')
            )}`
        );

        return baseUrl.replace(/(cust_params[^&]+)/, `$1${permutiveSegment}`);
    } catch (e) {
        console.warn('Error building permutive segment', e);
        return baseUrl;
    }
};

export const getJWScript = (
    title,
    player,
    playlist,
    hasAutoplay,
    idVideo,
    tagsUrl,
    autostart = true,
    arcSite = ''
) => {
    const facadeDiv = document.getElementById(`facade-${idVideo}`);
    let initialVideoMode;

    const setJwScript = () => {
        const scriptElement = document.createElement('script');
        scriptElement.src = `https://cdn.jwplayer.com/libraries/${player}.js`;
        document.head.appendChild(scriptElement);

        scriptElement.addEventListener('load', () => {
            window.jwplayer(`${idVideo}`).setup({
                playlist,
                autostart,
                mute: hasAutoplay ?? false,
                ...(arcSite === 'foodit' ? { related: null } : {}),
                ...(player === 'ih0086X3'
                    ? {
                          advertising: {
                              client: 'googima',
                              autoplayadsmuted: hasAutoplay ?? false,
                              schedule: [
                                  {
                                      tag: tagsUrl,
                                      offset: 'pre'
                                  }
                              ]
                          }
                      }
                    : {}),
                ...(getVerticalPlayer(player) && {
                    fullscreenOrientationLock: 'portrait'
                })
            });

            handleVideoEventsScript(title, idVideo, initialVideoMode);
        });

        if (facadeDiv) {
            facadeDiv.remove();
        }
    };

    if (hasAutoplay) {
        setTimeout(() => {
            initialVideoMode = 'autoplay';
            setJwScript();
        }, 1000);
    } else {
        facadeDiv.addEventListener('click', () => {
            initialVideoMode = 'manual';
            setJwScript();
        });
    }

    addVideoDisplayEvent({ title, idVideo });
};

export const getCaptionBgClass = subtype =>
    subtype === LIVEBLOG_EDITORIAL ? 'bg-transparent' : 'bg-white';
