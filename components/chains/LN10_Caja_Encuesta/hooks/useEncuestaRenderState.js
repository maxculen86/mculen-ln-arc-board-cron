import { useState } from 'react';
import { getEncuestaRenderStateFromStorage } from '../helpers';

const useEncuestaRenderState = () => {
    const [{ anonymousVoteAttemptState, targetBoxLocation }] = useState(() =>
        getEncuestaRenderStateFromStorage()
    );

    return {
        anonymousVoteAttemptState,
        targetBoxLocation
    };
};

export default useEncuestaRenderState;
