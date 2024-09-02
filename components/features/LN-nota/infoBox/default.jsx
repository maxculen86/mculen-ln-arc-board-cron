import React from 'react';
import { Zocalo } from '@ln/contenidos-ui-zocalo';
import { getZocaloProps } from './helper';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import { useAppContext } from 'fusion:context';

const InfoBoxFeature = () => {
    const {
        contextPath,
        deployment,
        globalContent: {
            taxonomy: { primary_section: { path = '' } = {} } = {}
        } = {}
    } = useAppContext();

    const zocaloConfig = getZocaloProps(deployment, contextPath, path);
    if (!zocaloConfig.showZocalo) return <></>;

    return (
        <Zocalo
            linkProps={zocaloConfig.linkProps}
            imgProps={zocaloConfig.imgProps}
            className="mb-32"
            logoProps={zocaloConfig.logoProps}
            description={zocaloConfig.description}
            onClick={() =>
                addEventToDataLayerV2({
                    event: 'e_linkclick',
                    action: 'zocalo_nota',
                    category: 'nota_ln9',
                    label: zocaloConfig.label
                })
            }
        />
    );
};

InfoBoxFeature.label = 'LN Caja Zocalo';
InfoBoxFeature.lazy = true;

export default InfoBoxFeature;
