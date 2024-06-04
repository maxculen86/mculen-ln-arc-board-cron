import React from 'react';
import { InfoBox } from '../../LN-10-global/infoBox/default';
import { useAppContext } from 'fusion:context';

const InfoBoxFeature = () => {
    const {
        contextPath,
        deployment,
        globalContent: {
            taxonomy: {
                primary_section: { parent_id: parentId = '' } = {}
            } = {}
        } = {}
    } = useAppContext();
    if (!parentId.includes('/deportes')) return <></>;

    return <InfoBox contextPath={contextPath} deployment={deployment} />;
};

InfoBoxFeature.label = 'LN Caja Canchallena';
InfoBoxFeature.lazy = true;

export default InfoBoxFeature;
