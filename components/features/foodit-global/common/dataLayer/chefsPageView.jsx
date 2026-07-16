import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';
import { useWebviewPageView } from './useWebviewPageView';

function ChefsPageView() {
    const { contextPath, deployment, requestUri = '' } = useAppContext();

    const params = requestUri ? requestUri.split('?')[0] : '';
    const contentType = params.match(/^\/(.*?)\//);

    useWebviewPageView({
        section: 'descubrir',
        content_type: (contentType && contentType[1]?.replace(/-/g, '_')) || ''
    });

    return (
        <script
            async
            id="scriptDataLayerPageView"
            type="text/javascript"
            data-url={`${SITE_FOODIT}${params}`}
            data-section="descubrir"
            data-content-type={
                (contentType && contentType[1]?.replace(/-/g, '_')) || ''
            }
            data-title="N/A"
            src={deployment(
                `${contextPath}/resources/js/LN/dataLayerPageView.min.js`
            )}
        />
    );
}

export default ChefsPageView;
