// import { AUDIO_NEWS_URL } from 'fusion:environment';
import { addEventToDataLayer } from '../../LN/common/utils/shareHelper';

export const calculateTime = secs => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs) % 60;
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
};

export const startAudio = audioPlayer =>
    audioPlayer && audioPlayer.current && audioPlayer.current.play();

export const parseDate = (date = '') =>
    date.replace(/-|:|[a-z]|\.[^\/]+/gi, '');

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

const AUDIO_NEWS_URL =
    'https://qa-audionews.lanacion.com.ar/api/v1/audio/status/';

export const getEndpointAudioNews = (publishDate, noteId) => {
    const date = parseDate(publishDate);
    return date && noteId ? `${AUDIO_NEWS_URL}${date}/${noteId}/` : null;
};
