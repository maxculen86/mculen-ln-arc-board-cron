import React, { useEffect } from 'react';
import loadScriptOnce from './utils/loadScriptOnce';

function WebComponentRenderer({
    tagName,
    attributes = {},
    scriptId,
    scriptUrl,
    scriptType = 'module'
}) {
    useEffect(() => {
        if (!tagName) return;

        loadScriptOnce({ scriptId, scriptUrl, scriptType });
    }, [scriptId, scriptType, scriptUrl, tagName]);

    if (!tagName) return null;

    return React.createElement(tagName, attributes);
}

export default WebComponentRenderer;
