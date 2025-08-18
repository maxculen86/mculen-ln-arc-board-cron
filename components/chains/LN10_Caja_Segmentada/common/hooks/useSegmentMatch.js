import { useState, useEffect } from 'react';
import { getUserSegments } from '../api/segmentationService';
import { isSegmentInUserSegments } from '../../_helpers';

export function useSegmentMatch(
    segmentNumber,
    hasEnteredViewport,
    validationFailed
) {
    const [loading, setLoading] = useState(false);
    const [segmentMatches, setSegmentMatches] = useState(false);
    const [attemptedLoad, setAttemptedLoad] = useState(false);

    useEffect(() => {
        if (!hasEnteredViewport) return;

        if (validationFailed) {
            setAttemptedLoad(true);
            return;
        }

        const checkSegmentMatch = async () => {
            setLoading(true);
            try {
                const userSegments = await getUserSegments();
                setSegmentMatches(
                    isSegmentInUserSegments(userSegments, segmentNumber)
                );
            } catch (error) {
                console.error('Error en useSegmentMatch:', error);
                setSegmentMatches(false);
            } finally {
                setLoading(false);
                setAttemptedLoad(true);
            }
        };
        checkSegmentMatch();
    }, [hasEnteredViewport]);

    return {
        loading,
        segmentMatches,
        attemptedLoad
    };
}
