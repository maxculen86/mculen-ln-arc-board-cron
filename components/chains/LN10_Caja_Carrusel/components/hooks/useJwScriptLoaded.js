import { useEffect, useState } from 'react';
import { isScriptLoaded } from '../helpers';
import loadJWPlayerScript from '../../../utils/loadJWPlayerScript';

export default function useJwScriptLoaded(playerId) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isScriptLoaded(playerId)) {
            setIsLoaded(true);
            return;
        }
        loadJWPlayerScript(playerId, () => setIsLoaded(true));
    }, [playerId]);

    return isLoaded;
}
