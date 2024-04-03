import React from 'react';
import { useAppContext } from 'fusion:context';
import { TRANSLATE_LAYOUTS } from './_helpers';
import capitalizeFirstLetter from '../../../../private/common/utils/capitalizeFirstLetter';

const AcusPageView = ({ globalContent = {} }) => {
    const { _id, parent = {}, name = '' } = globalContent;

    const { default: parentSection = '' } = parent;

    const {
        contextPath,
        deployment,
        siteProperties,
        requestUri = '',
        layout = ''
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
            data-sub-section={name}
            data-category={'Acumulado'}
            data-content-type={TRANSLATE_LAYOUTS[layout] || ''}
            data-title={title || 'N/A'}
            src={deployment(
                `${contextPath}/resources/js/LN/dataLayerPageView.min.js`
            )}
        />
    );
};

export default AcusPageView;
