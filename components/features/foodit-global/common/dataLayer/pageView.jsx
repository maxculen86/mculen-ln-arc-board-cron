import React from 'react';
import { useAppContext } from 'fusion:context';

import get from '../../../../private/common/utils/get';
import getAuthorsInfo from '../../../../private/common/utils/getAuthorsInfo';
import { TRANSLATE_LAYOUTS } from './_helpers';
import capitalizeFirstLetter from '../../../../private/common/utils/capitalizeFirstLetter';

const PageViewDataLayer = ({ globalContent = {} }) => {
    const {
        subtype: _subtype,
        _id,
        publish_date = '',
        taxonomy
    } = globalContent;

    const {
        authorsName = '',
        authorsIds = '',
        authorTypes = ''
    } = getAuthorsInfo(globalContent);

    const { name: primarySection = '', parent_id: parentSection = '' } = get(
        taxonomy,
        'primary_section',
        {}
    );

    const [date, time] = (publish_date && publish_date.split('T')) || [];

    const {
        contextPath,
        deployment,
        siteProperties,
        layout,
        requestUri = ''
    } = useAppContext();

    const { title } = siteProperties;

    return (
        <script
            async
            id="scriptDataLayerPageView"
            type="text/javascript"
            data-id={_id || 'N/A'}
            data-url={`www.foodit.lanacion.com.ar${requestUri.split('?')[0]}`}
            data-section={
                capitalizeFirstLetter(parentSection.split('/').pop()) || 'N/A'
            }
            data-sub-section={primarySection}
            data-content-type={TRANSLATE_LAYOUTS[layout] || ''}
            data-published-day={date || ''}
            data-published-time={time || ''}
            data-title={title || 'N/A'}
            data-author-name={authorsName}
            data-author-type={authorTypes}
            data-author-url={authorsIds}
            src={deployment(
                `${contextPath}/resources/js/LN/dataLayerPageView.min.js`
            )}
        />
    );
};

export default PageViewDataLayer;
