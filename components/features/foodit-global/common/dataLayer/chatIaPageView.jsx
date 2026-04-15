import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';

function ChatIaPageView() {
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            async
            id="scriptDataLayerPageView"
            type="text/javascript"
            data-url={`${SITE_FOODIT}/chat`}
            data-section="chat"
            data-content-type="buscador"
            src={deployment(
                `${contextPath}/resources/js/LN/dataLayerPageView.min.js`
            )}
        />
    );
}

export default ChatIaPageView;
