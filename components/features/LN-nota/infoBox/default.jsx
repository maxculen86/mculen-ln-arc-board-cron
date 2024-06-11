import React from 'react';
import { InfoBox } from '../../LN-10-global/infoBox/default';
// import { Zocalo } from '@ln/contenidos-ui-zocalo';
// import zocaloData from './zocaloData.json';
// import { getZocaloProps } from './helper';

import { useAppContext } from 'fusion:context';

const InfoBoxFeature = () => {
    const {
        contextPath,
        deployment,
        globalContent: {
            taxonomy: {
                primary_section: { parent_id: parentId = '' } = {},
            } = {},
        } = {},
    } = useAppContext();
    if (!parentId.includes('/deportes')) return <></>;

    return <InfoBox contextPath={contextPath} deployment={deployment} />;

    //     return <Zocalo
    //     linkProps={productData.linkProps}
    //     imgProps={productData.imgProps}
    //     buttonProps={productData.buttonProps}
    //     logoProps={productData.logoProps}
    //     description={productData.description}
    //   />;
};

InfoBoxFeature.label = 'LN Caja Canchallena';
InfoBoxFeature.lazy = true;

export default InfoBoxFeature;
