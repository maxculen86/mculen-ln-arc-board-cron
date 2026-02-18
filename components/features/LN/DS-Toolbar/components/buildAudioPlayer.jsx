import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { Spinner } from '@ln/ds-common-spinner';
import { BEYONDWORDS_PROJECT_ID } from 'fusion:environment';
import { useToolbarContext } from '../context/ToolbarContext';
import renderToasts from '../../../ui/ln/toastsContainer/renderToast';
import { handleVisibilityChanged } from '../_helpers';
import {
    getTextDisclaimer,
    setupBwReproductionTracking
} from '../../../../private/common/audioNews/helpers';
import Disclaimer from '../../common/disclaimer/default';

function BuildAudioPlayer({
    isOpenAudioPlayer,
    setDisableButton,
    onCloseAudioPlayer,
    noteId = '',
    playbackState,
    showVariantIa,
    openToast
}) {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [errorAudio, setErrorAudio] = useState(false);
    const [contentAvailable, setContentAvailable] = useState(false);
    const { setIsAudioPlaying } = useToolbarContext();
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();

    const playerRef = useRef(null);

    useEffect(() => {
        if (errorAudio) {
            onCloseAudioPlayer();
            setDisableButton(true);
            renderToasts({
                title: 'Error de audio',
                description: 'Parece que hubo un problema.',
                color: 'error',
                duration: 5000
            });
        }
    }, [errorAudio, openToast, onCloseAudioPlayer]);

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
        if (!isScriptLoaded || !document.querySelector('.audio-player'))
            return undefined;

        const controller = new AbortController();
        const { signal } = controller;

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

                playerRef.current.addEventListener(
                    'NoContentAvailable',
                    () => setErrorAudio(true),
                    { signal }
                );
                playerRef.current.addEventListener(
                    'ContentAvailable',
                    () => setContentAvailable(true),
                    { signal }
                );
                playerRef.current.addEventListener(
                    'VisibilityChanged',
                    handleVisibilityChanged,
                    { signal }
                );
                playerRef.current.addEventListener(
                    'PlaybackPaused',
                    () => setIsAudioPlaying(false),
                    { signal }
                );
                playerRef.current.addEventListener(
                    'PlaybackPlaying',
                    () => setIsAudioPlaying(true),
                    { signal }
                );
            } else {
                playerRef.current.playbackState = playbackState;
            }

            setupBwReproductionTracking({
                playerRef,
                globalContent,
                globalContentConfig,
                setContentAvailable,
                signal
            });
        } catch (error) {
            console.error(
                'Failed to initialize the BeyondWords player:',
                error
            );
            setErrorAudio(true);
        }

        return () => {
            controller.abort();
            if (playerRef.current) {
                playerRef.current.playbackState = 'stopped';
            }
            console.info('signal.aborted:', signal.aborted);
        };
    }, [
        isScriptLoaded,
        noteId,
        playbackState,
        globalContent,
        globalContentConfig,
        setContentAvailable,
        setIsAudioPlaying
    ]);

    if (!isOpenAudioPlayer || errorAudio) return null;

    return (
        <section className="flex flex-col gap-16 xl:pb-16 xl:mb-12 xl:border-b xl:border-muted">
            <div className="flex">
                <div className="w-full flex flex-col justify-center items-center h-48 relative">
                    {!contentAvailable && (
                        <Spinner
                            color="primary"
                            size="custom"
                            borderClassName="size-24 border-2"
                        />
                    )}
                    {/* CRÍTICO: La clase "audio-player" es requerida por BeyondWords.Player (línea 92).
                        NO ELIMINAR - Es el selector CSS que usa la librería para instanciar el reproductor de audio. */}
                    <div className="audio-player w-full" />
                </div>
            </div>
            <div className="disclaimer-container self-start mt-8 xl:mt-8">
                <Disclaimer
                    text={getTextDisclaimer({
                        isSummary: false,
                        showVariantIa
                    })}
                />
            </div>
        </section>
    );
}

export default BuildAudioPlayer;
