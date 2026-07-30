import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { Spinner } from '@ln/ds-common-spinner';
import { BEYONDWORDS_PROJECT_ID } from 'fusion:environment';
import { useAudioPlayerState } from '../hooks/useAudioPlayerState';
import { useAudioPlayerActions } from '../hooks/useAudioPlayerActions';
import { useBeyondWordsScript } from '../hooks/useBeyondWordsScript';
import { setupBwReproductionTracking } from '../helpers';
import renderToasts from '../../../../ui/ln/toastsContainer/renderToast';

function BuildAudioPlayer() {
    const [contentAvailable, setContentAvailable] = useState(false);

    const { noteId, isSummary, summaryAvailable, hasError } =
        useAudioPlayerState();
    const actions = useAudioPlayerActions();
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();

    const isScriptLoaded = useBeyondWordsScript();
    const playerRef = useRef(null);
    const hasNotifiedError = useRef(false);

    const notifyAudioError = () => {
        if (hasNotifiedError.current) return;
        hasNotifiedError.current = true;
        actions.setError();
        renderToasts({
            color: 'error',
            title: 'Error de audio',
            description: 'Parece que hubo un problema.',
            duration: 5000
        });
    };

    useEffect(() => {
        if (
            !isScriptLoaded ||
            !noteId ||
            !document.querySelector('.audio-player')
        )
            return undefined;

        hasNotifiedError.current = false;
        const controller = new AbortController();
        const { signal } = controller;

        try {
            playerRef.current = new window.BeyondWords.Player({
                target: '.audio-player',
                projectId: BEYONDWORDS_PROJECT_ID,
                sourceId: noteId,
                playbackRates: [1, 1.25, 1.5, 1.7, 2],
                playbackState: 'playing',
                skipButtonStyle: 'seconds',
                logoIconEnabled: false,
                widgetWidth: '40rem',
                // Arranca en completo; recién subimos a resumen tras confirmar
                // que la nota lo tiene (ContentAvailable → summaryAvailable).
                summary: false
            });

            playerRef.current.addEventListener(
                'NoContentAvailable',
                notifyAudioError,
                { signal }
            );
            playerRef.current.addEventListener(
                'PlaybackPaused',
                () => actions.setPlaying(false),
                { signal }
            );
            playerRef.current.addEventListener(
                'PlaybackPlaying',
                () => actions.setPlaying(true),
                { signal }
            );

            setupBwReproductionTracking({
                playerRef,
                globalContent,
                globalContentConfig,
                setContentAvailable,
                setSummaryAvailable: actions.setSummaryAvailable,
                signal
            });
        } catch (error) {
            console.error(
                'Failed to initialize the BeyondWords player:',
                error
            );
            notifyAudioError();
        }

        return () => {
            controller.abort();
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [isScriptLoaded, noteId, globalContent, globalContentConfig]);

    useEffect(() => {
        if (!playerRef.current) return;
        // Solo reproducimos el resumen si la nota efectivamente lo tiene; si no,
        // se respeta la preferencia guardada pero esta nota queda en completo.
        playerRef.current.summary = isSummary && summaryAvailable === true;
        playerRef.current.playbackState = 'playing';
    }, [isSummary, summaryAvailable]);

    if (hasError) return null;

    return (
        <div className="w-full flex justify-center items-center h-48 relative">
            {!contentAvailable && (
                <Spinner
                    color="black"
                    size="custom"
                    borderClassName="size-24 border-2"
                    className="mx-auto"
                />
            )}
            {/* La clase "audio-player" es el selector que usa BeyondWords.Player para montarse. NO ELIMINAR. */}
            <div className="audio-player w-full" />
        </div>
    );
}

export default BuildAudioPlayer;
