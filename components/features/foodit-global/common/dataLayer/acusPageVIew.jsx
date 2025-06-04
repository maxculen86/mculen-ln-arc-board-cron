import React from 'react';
import { useAppContext } from 'fusion:context';
import { DESCUBRIR_SECTIONS, processUriParams } from './_helpers';

function AcusPageView() {
    const { contextPath, deployment, requestUri = '' } = useAppContext();

    const { firstSection, secondSection, thirdSection, cleanedUrl } =
        processUriParams(requestUri);

    const isDescubrir = DESCUBRIR_SECTIONS.includes(firstSection);

    if (!firstSection) return null;

    return (
        <script
            async
            id="scriptDataLayerPageView"
            type="text/javascript"
            data-url={cleanedUrl}
            data-section={isDescubrir ? 'descubrir' : firstSection}
            data-sub-section={
                isDescubrir ? firstSection : secondSection || 'N/A'
            }
            data-category={thirdSection || 'N/A'}
            data-content-type={firstSection}
            data-title="N/A"
            src={deployment(
                `${contextPath}/resources/js/LN/dataLayerPageView.min.js`
            )}
        />
    );
}

export default AcusPageView;
