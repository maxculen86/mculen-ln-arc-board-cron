/* eslint-disable react/require-default-props */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import { BEYONDWORDS_PROJECT_ID } from 'fusion:environment';
import LoadingIcon from '../../LN/common/loadingIcon';
import { GlobalContext } from '../context/globalContext';

const BuildAudioPlayer = ({ setOpenPlayer, setEnableButton, noteId = '' }) => {
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
        // Checking for connection before creating the script
        if (!navigator.onLine) {
            setError(true);
        }
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src =
            'https://proxy.beyondwords.io/npm/@beyondwords/player@latest/dist/umd.js';

        // Initializing the player
        const handleScriptLoad = () => {
            setIsLoading(false);
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

            const handleNoContentAvailable = event => {
                setError(true);
            };

            player.addEventListener(
                'NoContentAvailable',
                handleNoContentAvailable
            );

            // Store the event listener remover function in a variable
            const removeEventListenerFunction = () => {
                player.removeEventListener(
                    'NoContentAvailable',
                    handleNoContentAvailable
                );
            };

            // Attach the cleanup function to the component
            return removeEventListenerFunction;
        };

        script.onload = handleScriptLoad;

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [noteId]);
    return (
        <>
            {!isLoading && !error ? (
                <div className="audio-player w-100 mb-24 mb-0_l" />
            ) : (
                <LoadingIcon />
            )}
        </>
    );
};

BuildAudioPlayer.propTypes = {
    noteId: PropTypes.string,
    setOpenPlayer: PropTypes.func,
    setEnableButton: PropTypes.func
};

export default BuildAudioPlayer;
