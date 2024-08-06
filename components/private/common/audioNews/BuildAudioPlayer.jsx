import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import { BEYONDWORDS_PROJECT_ID } from 'fusion:environment';
import LoadingIcon from '../../LN/common/loadingIcon';
import { GlobalContext } from '../context/globalContext';

const BuildAudioPlayer = ({
    setOpenPlayer,
    setEnableButton,
    noteId = '',
    loaderClass = ''
}) => {
    const { dispatch } = useContext(GlobalContext) || {};
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
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
            });
            setEnableButton(true);
            setOpenPlayer(false);
        }
    }, [error, dispatch, setEnableButton, setOpenPlayer]);

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src =
            'https://proxy.beyondwords.io/npm/@beyondwords/player@latest/dist/umd.js';
        document.head.appendChild(script);

        script.onload = () => {
            setIsLoading(false);
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (!isLoading && document.querySelector('.audio-player')) {
            try {
                const player = new BeyondWords.Player({
                    target: '.audio-player',
                    projectId: BEYONDWORDS_PROJECT_ID,
                    sourceId: noteId,
                    playbackRates: [1, 1.25, 1.5, 1.7, 2],
                    playbackState: 'playing',
                    skipButtonStyle: 'seconds',
                    logoIconEnabled: false,
                    widgetWidth: '40rem'
                });

                const handleNoContentAvailable = () => {
                    setError(true);
                };

                player.addEventListener(
                    'NoContentAvailable',
                    handleNoContentAvailable
                );

                return () => {
                    player.removeEventListener(
                        'NoContentAvailable',
                        handleNoContentAvailable
                    );
                };
            } catch (error) {
                console.error(
                    'Failed to initialize the BeyondWords player:',
                    error
                );
                setError(true);
            }
        }
    }, [isLoading, noteId]);

    return (
        <>
            {!isLoading && !error ? (
                <div className="audio-player w-100 mb-24 mb-0_l" />
            ) : (
                <LoadingIcon className={loaderClass} />
            )}
        </>
    );
};

BuildAudioPlayer.propTypes = {
    noteId: PropTypes.string,
    setOpenPlayer: PropTypes.func,
    setEnableButton: PropTypes.func,
    loaderClass: PropTypes.string
};

export default BuildAudioPlayer;
