import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';
import { useWebviewPageView } from './useWebviewPageView';

function ChatIaPageView() {
    const { contextPath, deployment } = useAppContext();
    useWebviewPageView({ section: 'chat', content_type: 'buscador' });

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
