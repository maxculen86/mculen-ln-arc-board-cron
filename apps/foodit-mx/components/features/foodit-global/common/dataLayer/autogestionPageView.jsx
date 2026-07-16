import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';

import { TRANSLATE_LAYOUTS } from './_helpers';

function AutogestionPageView({ globalContent = {} }) {
    const { _id } = globalContent;

    const {
        contextPath,
        deployment,
        layout,
        requestUri = ''
    } = useAppContext();

    return (
        <script
            async
            id="scriptDataLayerPageView"
            type="text/javascript"
            data-id={_id || 'N/A'}
            data-url={`${SITE_FOODIT}${requestUri.split('?')[0]}`}
            data-section={TRANSLATE_LAYOUTS[layout]}
            data-content-type="autogestion"
            data-title="N/A"
            src={deployment(
                `${contextPath}/resources/js/LN/dataLayerPageView.min.js`
            )}
        />
    );
}

export default AutogestionPageView;
