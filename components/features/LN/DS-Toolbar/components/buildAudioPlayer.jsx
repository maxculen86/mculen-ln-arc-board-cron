import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { BEYONDWORDS_PROJECT_ID } from 'fusion:environment';
import handleCookie from '../../../../private/LN/common/utils/handleCookie';
import { useSignatureContext } from '../../../../private/common/audioNews/hooks/SignatureContext';
import renderToasts from '../../../ui/ln/toastsContainer/renderToast';
import {
    getTextDisclaimer,
    setupBwReproductionTracking
} from '../../../../private/common/audioNews/helpers';
import ToggleButton from './toggleButton';
import Disclaimer from '../../common/disclaimer/default';

function BuildAudioPlayer({
    isOpen,
    setEnableButton,
    onCloseAudioPlayer,
    noteId = '',
    playbackState,
    showVariantIa,
    openToast
}) {
    if (!isOpen) return null;

    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [errorAudio, setErrorAudio] = useState(false);
    const [contentAvailable, setContentAvailable] = useState(false);
    const { setCookie } = handleCookie();
    const { isSummary, setIsSummary, setIsAudioPlaying } =
        useSignatureContext();
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();

    const playerRef = useRef(null);

    useEffect(() => {
        if (errorAudio) {
            onCloseAudioPlayer();
            setEnableButton(true);
            renderToasts({
                title: 'Error de audio',
                description: 'Parece que hubo un problema.',
                color: 'danger'
            });
        }
    }, [errorAudio, setEnableButton, openToast, onCloseAudioPlayer]);

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
        const cleanupAudioPlayerListeners = () => {
            if (!playerRef.current) return;

            playerRef.current.removeEventListener('NoContentAvailable', () =>
                setErrorAudio(true)
            );

            playerRef.current.removeEventListener('ContentAvailable', () => {
                setContentAvailable(true);
            });

            playerRef.current.removeEventListener('PlaybackPaused', () =>
                setIsAudioPlaying(false)
            );

            playerRef.current.removeEventListener('PlaybackPlaying', () =>
                setIsAudioPlaying(true)
            );

            playerRef.current.playbackState = 'stopped';
        };

        if (isScriptLoaded && document.querySelector('.audio-player')) {
            let removeProgressTrackingListeners;

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
                        widgetWidth: '40rem',
                        summary: isSummary
                    });

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
                    playerRef.current.summary = isSummary;
                    playerRef.current.playbackState = playbackState;
                }

                removeProgressTrackingListeners = setupBwReproductionTracking({
                    playerRef,
                    globalContent,
                    globalContentConfig,
                    setContentAvailable
                });
            } catch (error) {
                console.error(
                    'Failed to initialize the BeyondWords player:',
                    error
                );
                setErrorAudio(true);
            }

            return () => {
                cleanupAudioPlayerListeners();
                removeProgressTrackingListeners?.();
            };
        }

        return () => {
            cleanupAudioPlayerListeners();
        };
    }, [
        isScriptLoaded,
        noteId,
        isSummary,
        playbackState,
        globalContent,
        globalContentConfig,
        setContentAvailable,
        setIsAudioPlaying
    ]);

    const handleToggleChange = summary => {
        setIsSummary(summary);
        setCookie('summary', summary, 7);
        setIsAudioPlaying(true);
    };
    if (errorAudio) return null;

    return (
        <section className="flex flex-column gap-16 pb-16_lg mb-12_lg border border-bottom_lg border-thin border-neutral-light-100">
            <div className="flex flex-column flex-row-reverse_lg gap-12 gap-16_lg">
                <ToggleButton
                    handleToggle={handleToggleChange}
                    isSummary={isSummary}
                />
                <div className="w-100 flex jc-center ai-center h-48 relative">
                    {/* TODO: Reemplazar con Spinner de librería de front */}
                    {!contentAvailable && <span>Cargando...</span>}
                    <div className="audio-player w-100" />
                </div>
            </div>
            <div className="disclaimer-container as-start_l mt-8 mt-0_lg">
                {/* REFACTORIZAR CON LO NUEVO DEL DS */}
                <Disclaimer
                    text={getTextDisclaimer({ isSummary, showVariantIa })}
                />
            </div>
        </section>
    );
}

export default BuildAudioPlayer;
