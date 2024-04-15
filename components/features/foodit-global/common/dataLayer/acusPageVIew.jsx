import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';

import removeAccents from '../../../../private/common/utils/removeAccents';

const AcusPageView = () => {
    const { contextPath, deployment, requestUri = '' } = useAppContext();

    const params = requestUri.split('?')[0];

    const [firstSection = '', secondSection = '', thirdSection = ''] =
        (params &&
            removeAccents(params)
                .replace(/^\/|\/$/g, '')
                .split('/')
                .map(section => section.replace(/-/g, '_'))) ||
        [];
    const isDescubrir =
        firstSection === 'nutricion' || firstSection === 'restaurantes';
    return (
        firstSection && (
            <script
                async
                id="scriptDataLayerPageView"
                type="text/javascript"
                data-url={`${SITE_FOODIT}${params}`}
                data-section={(isDescubrir && 'descubrir') || firstSection}
                data-sub-section={
                    (isDescubrir && firstSection) || secondSection || 'N/A'
                }
                data-category={thirdSection}
                data-content-type={firstSection}
                data-title={'N/A'}
                src={deployment(
                    `${contextPath}/resources/js/LN/dataLayerPageView.min.js`
                )}
            />
        )
    );
};

export default AcusPageView;
