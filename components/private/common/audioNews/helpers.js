import { AUDIO_NEWS_URL } from 'fusion:environment';

const calculateTime = secs => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs) % 60;
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
};

export const parseDate = (date = '') =>
    date.replace(/-|:|[a-z]|\.[^\/]+/gi, '');

export const handleClickAudioNews = (
    token,
    suscription,
    setOpenPlayer,
    dispatch
) => {
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

// const AUDIO_NEWS_URL =
//     'https://qa-audionews.lanacion.com.ar/api/v1/audio/status/';

export const getEndpointAudioNews = (publishDate, noteId) => {
    const date = parseDate(publishDate);
    return date && noteId ? `${AUDIO_NEWS_URL}${date}/${noteId}/` : null;
};

export const getMessageError = (error = {}, dispatch) => {
    const actionsForEachState = {
        404: () =>
            dispatch({
                type: 'SHOW_MODAL',
                payload: {
                    typeModal: 'toast',
                    open: true,
                    data: {
                        status: 'danger',
                        description: 'Parece que hubo un problema.',
                        timeout: 2750
                    }
                }
            }),
        default: () => {
            console.log('entro al default');
            return 'Hubo un problema en la conexion';
        }
    };

    return actionsForEachState[error.statusCode]
        ? actionsForEachState[error.statusCode](error)
        : actionsForEachState.default();
};

export default calculateTime;
