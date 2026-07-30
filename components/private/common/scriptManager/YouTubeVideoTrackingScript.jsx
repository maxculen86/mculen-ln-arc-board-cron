import React from 'react';
import { useAppContext } from 'fusion:context';

function YouTubeVideoTrackingScript() {
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            id="youtube-video-tracking-script"
            defer
            src={deployment(
                `${contextPath}/resources/js/LN/scriptYoutubeVideoTracking.min.js`
            )}
        />
    );
}

export default YouTubeVideoTrackingScript;
