import React from 'react';
import { useAppContext } from 'fusion:context';
import { selectJwPlayerId } from './helpers';

function JwPlayerHome() {
    const { renderables } = useAppContext();
    const selectedPlayerId = selectJwPlayerId(renderables);

    if (!selectedPlayerId) return null;

    return (
        <script
            defer
            src={`https://cdn.jwplayer.com/libraries/${selectedPlayerId}.js`}
        />
    );
}

export default JwPlayerHome;
