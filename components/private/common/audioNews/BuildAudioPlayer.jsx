import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { BEYONDWORDS_PROJECT_ID } from 'fusion:environment';
import { Spinner } from '@ln/common-ui-spinner';
import { GlobalContext } from '../context/globalContext';
import ToggleButton from './ToggleButton';
import DisclaimerIa from '../../../features/LN-10-global/common/disclaimerIa/default';
import handleCookie from '../../LN/common/utils/handleCookie';
import { getTextDisclaimer } from './helpers';
import { useSignatureContext } from './hooks/SignatureContext';

function BuildAudioPlayer({
    setEnableButton,
    onCloseAudioPlayer,
    noteId = '',
    playbackState,
    showVariantIa
}) {
    const { dispatch } = useContext(GlobalContext) || {};
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [errorAudio, setErrorAudio] = useState(false);
    const [contentAvailable, setContentAvailable] = useState(false);
    const { setCookie } = handleCookie();
    const { contentVariant, setContentVariant, setIsAudioPlaying } =
        useSignatureContext();

    const playerRef = useRef(null);

    useEffect(() => {
        if (errorAudio) {
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
            onCloseAudioPlayer();
        }
    }, [errorAudio, dispatch, setEnableButton]);

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src =
            'https://proxy.beyondwords.io/npm/@beyondwords/player@latest/dist/umd.js';
        document.head.appendChild(script);
        script.onload = () => {
            setIsScriptLoaded(true);
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (isScriptLoaded && document.querySelector('.audio-player')) {
            try {
                if (!playerRef.current) {
                    // eslint-disable-next-line no-undef
                    playerRef.current = new BeyondWords.Player({
                        target: '.audio-player',
                        projectId: BEYONDWORDS_PROJECT_ID,
                        sourceId: noteId,
                        playbackRates: [1, 1.25, 1.5, 1.7, 2],
                        playbackState,
                        skipButtonStyle: 'seconds',
                        logoIconEnabled: false,
                        widgetWidth: '40rem'
                    });

                    playerRef.current.contentVariant = contentVariant;

                    playerRef.current.addEventListener(
                        'NoContentAvailable',
                        () => setErrorAudio(true)
                    );

                    playerRef.current.addEventListener('ContentAvailable', () =>
                        setContentAvailable(true)
                    );
                    playerRef.current.addEventListener('PlaybackPaused', () =>
                        setIsAudioPlaying(false)
                    );

                    playerRef.current.addEventListener('PlaybackPlaying', () =>
                        setIsAudioPlaying(true)
                    );
                } else {
                    playerRef.current.contentVariant = contentVariant;
                    playerRef.current.playbackState = playbackState;
                }
            } catch (error) {
                console.error(
                    'Failed to initialize the BeyondWords player:',
                    error
                );
                setErrorAudio(true);
            }
        }

        return () => {
            playerRef.current?.removeEventListener('NoContentAvailable', () =>
                setErrorAudio(true)
            );

            playerRef.current?.removeEventListener('ContentAvailable', () => {
                setContentAvailable(true);
            });

            playerRef.current?.removeEventListener('PlaybackPaused', () =>
                setIsAudioPlaying(false)
            );

            playerRef.current?.removeEventListener('PlaybackPlaying', () =>
                setIsAudioPlaying(true)
            );

            if (playerRef.current) {
                playerRef.current.playbackState = 'stopped';
            }
        };
    }, [isScriptLoaded, noteId, contentVariant, playbackState]);

    const handleToggleChange = newContentVariant => {
        setContentVariant(newContentVariant);
        setCookie('contentVariant', newContentVariant, 7);
        setIsAudioPlaying(true);
    };

    if (errorAudio) return null;

    return (
        <section className="flex flex-column gap-16 pb-16_lg mb-12_lg border border-bottom_lg border-thin border-neutral-light-100">
            <div className="flex flex-column flex-row-reverse_lg gap-12 gap-16_lg">
                <ToggleButton
                    handleToggle={handleToggleChange}
                    contentVariant={contentVariant}
                />
                <div className="w-100 flex jc-center ai-center h-48 relative">
                    {!contentAvailable && (
                        <Spinner
                            classnames={{
                                progress: 'w-24 h-24 border-4 text-blue-400'
                            }}
                            style={{ position: 'absolute' }}
                        />
                    )}
                    <div className="audio-player w-100" />
                </div>
            </div>
            <div className="disclaimer-container as-start_l mt-8 mt-0_lg">
                <DisclaimerIa
                    text={getTextDisclaimer({ contentVariant, showVariantIa })}
                />
            </div>
        </section>
    );
}

BuildAudioPlayer.propTypes = {
    noteId: PropTypes.string.isRequired,
    playbackState: PropTypes.string.isRequired,
    setEnableButton: PropTypes.func.isRequired,
    onCloseAudioPlayer: PropTypes.func.isRequired,
    showVariantIa: PropTypes.bool.isRequired
};

export default BuildAudioPlayer;
