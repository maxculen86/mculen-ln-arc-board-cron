import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';

import get from '../../../../private/common/utils/get';
import { getAuthorsInfo } from '../../../../private/common/utils/getAuthorsInfo';
import { TRANSLATE_LAYOUTS } from './_helpers';
import removeAccents from '../../../../private/common/utils/removeAccents';

function PageViewDataLayer({ globalContent = {} }) {
    const {
        _id,
        publish_date = '',
        taxonomy,
        headlines,
        content_restrictions
    } = globalContent;

    const { authorsName = '', authorsIds = '' } = getAuthorsInfo(globalContent);
    const { name: primarySection = '', parent_id: parentSection = '' } = get(
        taxonomy,
        'primary_section',
        {}
    );

    const [date, time] = (publish_date && publish_date.split('T')) || [];

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
            data-section={parentSection.split('/').pop() || 'N/A'}
            data-sub-section={removeAccents(primarySection.toLowerCase())}
            data-content-type={TRANSLATE_LAYOUTS[layout] || ''}
            data-published-day={date || ''}
            data-published-time={time || ''}
            data-title={get(headlines, 'basic', 'N/A')}
            data-author-name={authorsName}
            data-valor={get(content_restrictions, 'content_code')}
            data-author-url={authorsIds}
            src={deployment(
                `${contextPath}/resources/js/LN/dataLayerPageView.min.js`
            )}
        />
    );
}

export default PageViewDataLayer;
