import React from 'react';
import { InfoBox } from '../../LN-10-global/infoBox/default';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';

const InfoBoxFeature = ({ id: featureId }) => {
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

    return (
        <Static id={featureId}>
            <InfoBox contextPath={contextPath} deployment={deployment} />
        </Static>
    );
};

InfoBoxFeature.label = 'LN Caja Canchallena';

export default InfoBoxFeature;
