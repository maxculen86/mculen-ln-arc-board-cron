const calculateTime = secs => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs) % 60;
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
};

export const parseDate = date => date.replace(/-|:|[a-z]|\.[^\/]+/gi, '');

export const handleClickAudioNews = (
    token,
    suscription,
    setOpenPlayer,
    dispatch
) => {
    if (token && suscription) setOpenPlayer(true);

    (!suscription || !token) &&
        dispatch({
            type: 'SHOW_MODAL_BARRIER',
            payload: {
                open: true,
                origin: 'audioNews',
                typeAlert: 'exclusive-ln'
            }
        });
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
                        description:
                            'Hubo un problema de conexión. Reintenta más tarde.',
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
