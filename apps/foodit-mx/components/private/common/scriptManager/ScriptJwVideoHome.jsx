import React from 'react';
import { useAppContext } from 'fusion:context';

function ScriptJwVideoHome() {
    const { deployment, contextPath } = useAppContext();

    return (
        <script
            id="script-video-home"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptJwVideoHome.min.js`
            )}
        />
    );
}

export default ScriptJwVideoHome;
