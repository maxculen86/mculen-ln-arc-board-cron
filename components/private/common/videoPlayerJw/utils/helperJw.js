import { cx } from '@ln/cva';
import {
    isInDatalayerEvent,
    addVideoDisplayEvent,
    registerJwVideoControlsTracking
} from '../../utils/videoPlayerHelper';

import {
    CARDS,
    FOTOAL100,
    LIVEBLOG_EDITORIAL
} from '../../utils/subtypes/subtypeHelper';
import transformISODate from '../../utils/transformISODate';
import { addEventToDataLayerV2 } from '../../../LN/common/utils/addEventToDataLayer';
import { mediaContainerVariant, videoPlayerVariant } from './styles';

export const getConfigClassName = (
    variant,
    isNotaVideo = false,
    isOpening = false
) => ({
    container: cx([
        'content-media',
        'cursor-pointer',
        variant === 'horizontal' && 'container-center-100'
    ]),
    mediaContainer: mediaContainerVariant({
        variant,
        isOpening: !!isOpening,
        isNotaVideo: !!isNotaVideo
    }),
    videoContainer: cx([
        'mod-video',
        variant === 'vertical' && 'flex flex-column ai-center bg-black'
    ]),
    videoPlayer: videoPlayerVariant({
        variant,
        isOpening: !!isOpening,
        isNotaVideo: !!isNotaVideo
    }),
    facade: 'com-image',
    facadeContainer: cx([
        variant === 'horizontal' ? 'ratio-16-9' : 'w-320 ratio-9-16'
    ]),
    captionClasses: cx([variant === 'horizontal' ? 'px-0_l mb-8' : 'w-100'])
});

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
    initialVideoMode = '',
    videoOrientation = 'horizontal'
) => {
    const player = window.jwplayer(`${idVideo}`);
    let currentTitle = title;
    let currentId = idVideo;
    let firstPlay = true;
    let skipPlayForSeek = false;

    registerJwVideoControlsTracking({
        player,
        defaultTitle: currentTitle,
        defaultId: currentId,
        onSeek: () => {
            skipPlayForSeek = true;
        },
        onPlaylistItem: ({ title: newTitle, id: newId }) => {
            currentTitle = newTitle;
            currentId = newId;
            firstPlay = true;
            skipPlayForSeek = false;
        }
    });

    player.on('ready', () => {
        const element = document.querySelector('.video-player');
        if (element) element.classList.remove('bg-black');
    });

    player.on('play', (e = {}) => {
        if (skipPlayForSeek) {
            skipPlayForSeek = false;
            return;
        }

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
            videoName: `${currentTitle}`,
            videoID: `${currentId}`,
            rest: { mode, videoOrientation }
        });
    });

    player.on('pause', () => {
        addEventToDataLayerV2({
            event: 'videoPause',
            videoName: `${currentTitle}`,
            videoID: `${currentId}`
        });
    });

    player.on('time', e => {
        const percent = Math.floor((e.currentTime / e.duration) * 100);
        const percentagesToCheck = [25, 50, 75];

        percentagesToCheck.forEach(percentage => {
            if (
                !isInDatalayerEvent(percentage.toString(), `${currentId}`) &&
                percent === percentage
            ) {
                addEventToDataLayerV2({
                    event: percentage.toString(),
                    videoName: `${currentTitle}`,
                    videoID: `${currentId}`
                });
            }
        });
    });

    player.on('complete', () => {
        if (!isInDatalayerEvent('videoComplete', `${currentId}`)) {
            addEventToDataLayerV2({
                event: 'videoComplete',
                videoName: `${currentTitle}`,
                videoID: `${currentId}`
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
            const videoOrientation = getVerticalPlayer(player)
                ? 'vertical'
                : 'horizontal';

            handleVideoEventsScript(
                title,
                idVideo,
                initialVideoMode,
                videoOrientation
            );
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

const subtypesWithTransparentCaption = [LIVEBLOG_EDITORIAL, CARDS];

export const getCaptionBgClass = subtype =>
    subtypesWithTransparentCaption.includes(subtype)
        ? 'bg-transparent'
        : 'bg-white';
