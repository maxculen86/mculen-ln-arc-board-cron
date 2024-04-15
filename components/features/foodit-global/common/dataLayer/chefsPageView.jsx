import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';

const ChefsPageView = () => {
    const { contextPath, deployment, requestUri = '' } = useAppContext();

    const params = requestUri.split('?')[0];

    return (
        <script
            async
            id="scriptDataLayerPageView"
            type="text/javascript"
            data-url={`${SITE_FOODIT}${requestUri.split('?')[0]}`}
            data-section={'descubrir'}
            data-sub-section={params.match(/^\/(.*?)\//)[1].replace(/-/g, '_')}
            data-content-type={'descubrir'}
            data-title={'N/A'}
            src={deployment(
                `${contextPath}/resources/js/LN/dataLayerPageView.min.js`
            )}
        />
    );
};

export default ChefsPageView;
