import React from 'react';
import { useAppContext } from 'fusion:context';

function YouTubeLazyLoadScript() {
    const { contextPath, deployment } = useAppContext();
    return (
        <script
            id="youtube-lazy-load-script"
            defer
            type="text/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/youtubeLazyLoad.min.js`
            )}
        />
    );
}
export default YouTubeLazyLoadScript;
