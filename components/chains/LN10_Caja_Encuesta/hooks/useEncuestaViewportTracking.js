import { useEffect, useRef } from 'react';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import { safeGetJSON } from '../../../private/LN/common/utils/safeLocalStorageHelpers';
import { buildEncuestaImpressionEvent } from '../analytics';
import {
    ENCUESTA_HOME_STATE_STORAGE_KEY,
    ENCUESTA_VOTE_STORAGE_KEY
} from '../constants';
import {
    getEncuestaUserStateCode,
    getAnonymousVoteAttemptState,
    getViewportCountByBoxLocation,
    incrementEncuestaViewportCount,
    parseEncuestaVote,
    parseEncuestaHomeState,
    shouldApplyDeferredVoteRender,
    writeEncuestaHomeState
} from '../helpers';

const useEncuestaViewportTracking = ({
    boxLocation,
    segment,
    shouldRender,
    encuestaPostId
}) => {
    const wrapperRef = useRef(null);
    const isWrapperVisibleRef = useRef(false);

    useEffect(() => {
        let observer = null;

        if (
            shouldRender &&
            wrapperRef.current &&
            typeof window !== 'undefined' &&
            typeof window.IntersectionObserver === 'function'
        ) {
            observer = new window.IntersectionObserver(entries => {
                const isVisible = entries.some(entry => entry.isIntersecting);
                const didEnterViewport =
                    isVisible && !isWrapperVisibleRef.current;

                isWrapperVisibleRef.current = isVisible;

                if (!didEnterViewport) return;

                const currentState = parseEncuestaHomeState(
                    safeGetJSON(ENCUESTA_HOME_STATE_STORAGE_KEY, null)
                );
                const webComponentVoteState = parseEncuestaVote(
                    safeGetJSON(ENCUESTA_VOTE_STORAGE_KEY, null),
                    encuestaPostId
                );
                const anonymousVoteAttemptState = getAnonymousVoteAttemptState({
                    webComponentVoteState,
                    encuestaHomeState: currentState
                });
                const nextState = incrementEncuestaViewportCount({
                    boxLocation,
                    encuestaHomeState: currentState
                });
                const stateToSave = shouldApplyDeferredVoteRender(
                    anonymousVoteAttemptState
                )
                    ? {
                          ...nextState,
                          consumedDeferredVoteKey: anonymousVoteAttemptState.key
                      }
                    : nextState;
                const savedState =
                    writeEncuestaHomeState(stateToSave) || stateToSave;
                const viewportEntryCount = getViewportCountByBoxLocation({
                    boxLocation,
                    encuestaHomeState: savedState
                });
                const stateCode = getEncuestaUserStateCode({
                    webComponentVoteState,
                    encuestaHomeState: savedState,
                    anonymousVoteAttemptState
                });

                addEventToDataLayerV2(
                    buildEncuestaImpressionEvent({
                        slot: boxLocation,
                        segment,
                        viewportEntryCount,
                        stateCode,
                        encuestaPostId
                    })
                );
            });

            observer.observe(wrapperRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [boxLocation, segment, shouldRender]);

    return wrapperRef;
};

export default useEncuestaViewportTracking;
