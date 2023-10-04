import { useEffect, useRef } from 'react';
import { updateHomeMatches, isMatchLiveClienSide } from './liveDataHelper';

const useRefresh = (matches, setMatches) => {
    const { liveIds, updatedMatches } = isMatchLiveClienSide(matches);
    const reset = useRef(true);
    const matchRef = useRef(updatedMatches);
    const pooling = useRef(null);

    matchRef.current = matches;

    const callBack = async () => {
        const matchesWithLiveData = await updateHomeMatches(
            matchRef.current,
            liveIds
        );
        setMatches(matchesWithLiveData);
    };

    useEffect(() => {
        if (reset.current === true) {
            setMatches(updatedMatches);
            reset.current = false;
            setTimeout(callBack, 1000);
        }
        if (liveIds && liveIds.length > 0) {
            pooling.current = setInterval(callBack, 25000);
        }
    }, []);

    useEffect(() => {
        if (liveIds.length === 0) {
            clearInterval(pooling.current);
        }
    }, [liveIds]);
};
export default useRefresh;
