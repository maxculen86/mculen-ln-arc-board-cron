// TODO MIGRAR UNA VEZ EL COMPONENTE videoPlayerJw DEJE DE USARSE
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
        variant === 'vertical' &&
            'flex flex-column ai-center bg-neutral-light-50'
    ]),
    videoPlayer: videoPlayerVariant({
        variant,
        isOpening: !!isOpening,
        isNotaVideo: !!isNotaVideo
    }),
    facade: 'com-image',
    facadeContainer: cx([
        variant === 'horizontal' ? 'ratio-16-9' : 'w-100 ratio-9-16'
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

export const onJwPlayerReady = (
    playerInstance,
    { currentTitle = '', duration = 0 } = {}
) => {
    const contentTypeValue = duration >= 600000 ? 'vc12' : 'vc11';
    // eslint-disable-next-line no-underscore-dangle
    window?.ns_?.ComscoreJWPlayerPlugin(playerInstance, {
        publisherId: '6906398',
        labelmapping: `c3="lanacion.com.ar", c4="*null", c6="*null", ns_st_pu="La Nación", ns_st_pr="${currentTitle}", ns_st_ct="${contentTypeValue}", ns_st_cl="${duration}"`
    });
};

const PROGRESS_MILESTONES = [10, 25, 50, 75];

export const trackMilestone = ({
    sentProgressRef,
    percentage,
    videoId,
    title
}) => {
    if (sentProgressRef.current.has(percentage)) {
        return;
    }

    sentProgressRef.current.add(percentage);

    addEventToDataLayerV2({
        event: percentage === 100 ? 'videoComplete' : String(percentage),
        rest: {
            videoID: String(videoId || ''),
            videoName: String(title || '')
        }
    });
};

export const handleTimeTracking = ({
    event,
    sentProgressRef,
    videoId,
    title
}) => {
    const percent = Math.floor((event.currentTime / event.duration) * 100);

    PROGRESS_MILESTONES.forEach(percentage => {
        if (percent >= percentage) {
            trackMilestone({
                sentProgressRef,
                percentage,
                videoId,
                title
            });
        }
    });
};

export const handleVideoEventsScript = (
    title,
    idVideo,
    duration,
    initialVideoMode = '',
    videoOrientation = 'horizontal'
) => {
    const player = window.jwplayer(`${idVideo}`);
    const percentagesToCheck = [10, 25, 50, 75];
    let currentTitle = title;
    let currentId = idVideo;
    let currentInitialMode = initialVideoMode;
    let firstPlay = true;
    let skipPlayForSeek = false;
    let wasPaused = false;
    let shouldAutoplayNextPlaylistItem = false;
    let trackedPercentages = new Set();
    let lastPlaybackPercent = 0;
    let ignoreNextTimeEvent = false;

    const calculatePercent = (currentTime = 0, videoDuration = 0) => {
        if (!videoDuration) return 0;
        return Math.floor((currentTime / videoDuration) * 100);
    };

    registerJwVideoControlsTracking({
        player,
        defaultTitle: currentTitle,
        defaultId: currentId,
        onSeek: event => {
            skipPlayForSeek = true;
            lastPlaybackPercent = calculatePercent(
                event?.offset,
                event?.duration
            );
            ignoreNextTimeEvent = true;
        },
        onPlaylistItem: ({ title: newTitle, id: newId }) => {
            const isNewPlaylistItem = Boolean(currentId) && newId !== currentId;

            currentTitle = newTitle;
            currentId = newId;
            if (isNewPlaylistItem && shouldAutoplayNextPlaylistItem) {
                currentInitialMode = 'autoplay';
            }
            firstPlay = true;
            skipPlayForSeek = false;
            wasPaused = false;
            shouldAutoplayNextPlaylistItem = false;
            trackedPercentages = new Set();
            lastPlaybackPercent = 0;
            ignoreNextTimeEvent = false;
        }
    });

    player.on('ready', () => {
        onJwPlayerReady(player, { currentTitle, duration });
        const element = document.querySelector('.video-player');
        if (element) element.classList.remove('bg-black');
    });

    player.on('play', (e = {}) => {
        if (skipPlayForSeek) {
            skipPlayForSeek = false;
            return;
        }

        if (wasPaused) {
            wasPaused = false;
            addEventToDataLayerV2({
                event: 'videoResume',
                videoName: `${currentTitle}`,
                videoID: `${currentId}`
            });
            return;
        }

        let mode;
        if (firstPlay && currentInitialMode) {
            mode = currentInitialMode;
        } else {
            const reason = e.playReason;
            const isAutoplay = reason === 'autostart' || reason === 'viewable';
            mode = isAutoplay ? 'autoplay' : 'manual';
        }
        firstPlay = false;
        currentInitialMode = '';

        addEventToDataLayerV2({
            event: 'videoPlay',
            videoName: `${currentTitle}`,
            videoID: `${currentId}`,
            rest: { mode, videoOrientation }
        });
    });

    player.on('pause', () => {
        wasPaused = true;
        addEventToDataLayerV2({
            event: 'videoPause',
            videoName: `${currentTitle}`,
            videoID: `${currentId}`
        });
    });

    player.on('time', e => {
        if (!e?.duration) return;

        const percent = calculatePercent(e.currentTime, e.duration);

        if (ignoreNextTimeEvent) {
            lastPlaybackPercent = percent;
            ignoreNextTimeEvent = false;
            return;
        }

        percentagesToCheck.forEach(percentage => {
            if (
                !trackedPercentages.has(percentage) &&
                !isInDatalayerEvent(percentage.toString(), `${currentId}`) &&
                lastPlaybackPercent < percentage &&
                percent >= percentage
            ) {
                trackedPercentages.add(percentage);
                addEventToDataLayerV2({
                    event: percentage.toString(),
                    videoName: `${currentTitle}`,
                    videoID: `${currentId}`
                });
            }
        });

        lastPlaybackPercent = percent;
    });

    player.on('complete', () => {
        shouldAutoplayNextPlaylistItem = true;
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
                0,
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
