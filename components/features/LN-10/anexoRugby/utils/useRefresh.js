import { useEffect, useRef } from 'react';
import { updateHomeMatches, isMatchLiveClienSide } from './liveDataHelper';

const useRefresh = (matches, setMatches) => {
    const { liveIds, updatedMatches } = isMatchLiveClienSide(matches);
    const interval = useRef(1000);
    const reset = useRef(true);
    const matchRef = useRef(updatedMatches);
    const pooling = useRef(null);
    matchRef.current = matches;

    useEffect(() => {
        if (reset.current === true) {
            setMatches(updatedMatches);
            reset.current = false;
            interval.current = 25000;
        }
        if (liveIds && liveIds.length > 0) {
            pooling.current = setInterval(async () => {
                const matchesWithLiveData = await updateHomeMatches(
                    matchRef.current,
                    liveIds
                );
                setMatches(matchesWithLiveData);
            }, interval.current);
        }
    }, []);
    useEffect(() => {
        if (liveIds.length === 0) {
            clearInterval(pooling.current);
        }
    }, [liveIds]);
};

export default useRefresh;
