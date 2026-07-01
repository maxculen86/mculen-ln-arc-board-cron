import { useState } from 'react';
import { getEncuestaRenderStateFromStorage } from '../helpers';

const useEncuestaRenderState = ({ encuestaPostId } = {}) => {
    const [{ anonymousVoteAttemptState, targetBoxLocation }] = useState(() =>
        getEncuestaRenderStateFromStorage({ encuestaPostId })
    );

    return {
        anonymousVoteAttemptState,
        targetBoxLocation
    };
};

export default useEncuestaRenderState;
