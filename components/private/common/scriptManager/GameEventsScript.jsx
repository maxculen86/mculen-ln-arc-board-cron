import React from 'react';
import { useAppContext } from 'fusion:context';

const GameEventScript = () => {
    const { deployment, contextPath } = useAppContext();
    return (
        <script
            defer
            id="script-games-events"
            src={deployment(
                `${contextPath}/resources/js/LN/gameEventsScript.min.js`
            )}
        />
    );
};

export default GameEventScript;
