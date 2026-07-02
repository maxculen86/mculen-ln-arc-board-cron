import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BEYONDWORDS_PROJECT_ID_FOODIT } from 'fusion:environment';
import { Skeleton } from '@ln/common-ui-skeleton';
import {
    createPlayer,
    createScript,
    getPreparationItems,
    getSteps
} from './helpers/_helper';
import get from '../../../../private/common/utils/get';
import { StepsAudioFoodit } from './helpers/stepsAudioFoodit';

export function AudioFoodit({ article, setIsAudioPlaying }) {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [contentAvailable, setContentAvailable] = useState(false);
    const [segmentIndex, setSegmentIndex] = useState(0);
    const playerRef = useRef(null);
    const contentElements = get(article, 'content_elements', []);
    const hasCustomPreparacion = contentElements.some(
        element => element?.subtype === 'custom-preparacion'
    );

    const stepList = useMemo(
        () =>
            hasCustomPreparacion
                ? getSteps(contentElements)
                : getPreparationItems(contentElements),
        [contentElements, hasCustomPreparacion]
    );

    const idArticle = get(article, '_id', '');
    const segmentContainer = useRef(null);

    useEffect(() => {
        const script = createScript();
        document?.head?.appendChild(script);
        script.onload = () => {
            setIsScriptLoaded(true);
        };

        return () => {
            document?.head?.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (segmentContainer?.current) {
            const currentStep = segmentContainer.current.querySelector(
                `[data-step-index="${segmentIndex - 1}"]`
            );
            if (currentStep) {
                currentStep.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }, [segmentIndex]);

    useEffect(() => {
        const audioElement = document.querySelector('.audio-player');

        if (isScriptLoaded && audioElement) {
            try {
                if (!playerRef.current) {
                    // eslint-disable-next-line no-undef
                    playerRef.current = createPlayer({
                        idArticle,
                        projectId: BEYONDWORDS_PROJECT_ID_FOODIT,
                        setSegmentIndex,
                        setContentAvailable,
                        setIsAudioPlaying
                    });
                }
            } catch (error) {
                console.error(
                    'Failed to initialize the BeyondWords player:',
                    error
                );
            }
        }
    }, [isScriptLoaded]);
    if (!isScriptLoaded) {
        return null;
    }
    return (
        <>
            <div className="py-32">
                <div className="h-48">
                    {!contentAvailable && (
                        <Skeleton className="w-100 max-w-456_md" height={48} />
                    )}
                    <div className="audio-player" />
                </div>
            </div>
            <div
                ref={segmentContainer}
                className="flex flex-column gap-16 max-h-60dvh max-h-100_md foodit-scrollbar overflow-y-auto"
            >
                <StepsAudioFoodit
                    stepList={stepList}
                    segmentIndex={segmentIndex}
                />
            </div>
        </>
    );
}
