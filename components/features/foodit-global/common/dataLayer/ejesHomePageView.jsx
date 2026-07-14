import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';
import { ejesMapping } from './_helpers';
import { useWebviewPageView } from './useWebviewPageView';

function EjesHomePageView() {
    const { contextPath, deployment, requestUri = '' } = useAppContext();

    const params = requestUri ? requestUri.split('?')[0] : '';

    const ejeMatch = params.match(/^\/(.*?)\//);
    const ejeName = ejeMatch ? ejeMatch[1] : '';

    const ejeData = ejesMapping[ejeName];

    useWebviewPageView(ejeData ? { content_type: ejeData.contentType } : {});

    if (!ejeData) return null;

    return (
        <script
            async
            id="scriptDataLayerPageView"
            type="text/javascript"
            data-url={`${SITE_FOODIT}${params}`}
            data-section="N/A"
            data-content-type={ejeData.contentType}
            data-title={ejeData.title}
            src={deployment(
                `${contextPath}/resources/js/LN/dataLayerPageView.min.js`
            )}
        />
    );
}

export default EjesHomePageView;
