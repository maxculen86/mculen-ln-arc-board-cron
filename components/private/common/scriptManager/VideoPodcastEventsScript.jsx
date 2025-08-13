import React from 'react';
import { useAppContext } from 'fusion:context';

function VideoPodcastEventsScript() {
    const { deployment, contextPath } = useAppContext();
    return (
        <script
            defer
            id="script-videopodcasts-events"
            src={deployment(
                `${contextPath}/resources/js/LN/videopodcastsEventsScript.min.js`
            )}
        />
    );
}

export default VideoPodcastEventsScript;
