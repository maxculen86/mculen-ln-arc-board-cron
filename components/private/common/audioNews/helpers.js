/* eslint-disable no-param-reassign */
import { AUDIO_NEWS_URL } from 'fusion:environment';
import { addEventToDataLayer } from '../../LN/common/utils/shareHelper';
import get from '../utils/get';

export const calculateTime = secs => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs) % 60;
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
};

export const getTime = (duration, currentTime) =>
    !isNaN(duration) ? calculateTime(duration - currentTime) : '00:00';

export const getTitleAndIcon = isPlaying =>
    isPlaying
        ? { title: 'Pausar', icon: 'pause' }
        : { title: 'Reproducir', icon: 'play' };

export const parseDate = (date = '') =>
    date && date.replace(/-|:|[a-z]|\.[^\/]+/gi, '');

export const handleClickAudioNews = (
    token,
    suscription,
    setOpenPlayer,
    dispatch
) => {
    addEventToDataLayer('Escuchar nota');
    if (token && suscription) setOpenPlayer(true);

    (!suscription || !token) &&
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                open: true,
                origin: 'audioNews',
                typeAlert: 'exclusive-ln',
                typeModal: 'barrier'
            }
        });
};

export const getEndpointAudioNews = (publishDate, noteId) => {
    const date = parseDate(publishDate);
    return date && noteId ? `${AUDIO_NEWS_URL}${date}/${noteId}/` : null;
};

export const handleEnded = (
    isPlaying,
    setIsPlaying,
    setCurrentTime,
    progressBar
) => {
    setIsPlaying(!isPlaying);
    setCurrentTime(0);
    progressBar.current.style.setProperty('width', '0');
};

export const togglePlayPause = (isPlaying, setIsPlaying, audioPlayer = {}) => {
    setIsPlaying(!isPlaying);
    !isPlaying ? audioPlayer.current.play() : audioPlayer.current.pause();
};

export const handleProgressBar = (progressBar, duration, audioPlayer = {}) => {
    progressBar.current.style.setProperty(
        'width',
        `${(audioPlayer.current.currentTime / duration) * 100}%`
    );
};

export const backTenSecs = (audioPlayer = {}) => {
    audioPlayer.current.currentTime -= 10;
    handleProgressBar();
};

export const forwardTenSecs = (duration, audioPlayer = {}) => {
    if (audioPlayer && audioPlayer.current.currentTime + 10 < duration) {
        audioPlayer.current.currentTime += 10;
        handleProgressBar();
    }
};

export const handlePlaybackRate = (
    playBackRate,
    setPlayBackRate,
    audioPlayer = {}
) => {
    audioPlayer.current.playbackRate = playBackRate + 0.25;
    const playBack = get(audioPlayer, 'current.playbackRate', 0);
    setPlayBackRate(playBack);

    if (audioPlayer.current.playbackRate > 2) {
        audioPlayer.current.playbackRate = 1;
        setPlayBackRate(1);
    }
};
