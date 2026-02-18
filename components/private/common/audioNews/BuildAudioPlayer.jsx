import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { BEYONDWORDS_PROJECT_ID } from 'fusion:environment';
import { Spinner } from '@ln/common-ui-spinner';
import ToggleButton from './ToggleButton';
import handleCookie from '../../LN/common/utils/handleCookie';
import { getTextDisclaimer, setupBwReproductionTracking } from './helpers';
import { useSignatureContext } from './hooks/SignatureContext';
import renderToast from '../../../features/private-global/common/utils/renderToast';
import DisclaimerIA from '../../../features/LN-10-global/common/disclaimerIa/default';

function BuildAudioPlayer({
    setEnableButton,
    onCloseAudioPlayer,
    noteId = '',
    playbackState,
    showVariantIa,
    openToast
}) {
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
            renderToast({
                variant: 'danger',
                message: 'Parece que hubo un problema.',
                title: 'Error de audio'
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
                    widgetWidth: '40rem',
                    summary: isSummary
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
                playerRef.current.summary = isSummary;
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
                <DisclaimerIA
                    text={getTextDisclaimer({ isSummary, showVariantIa })}
                />
            </div>
        </section>
    );
}

export default BuildAudioPlayer;
