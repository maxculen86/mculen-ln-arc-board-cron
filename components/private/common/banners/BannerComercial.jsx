import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import findTermica from '../utils/findTermica';
import get from '../utils/get';
import Comercial from '../../LN/common/bannerRefactor/factory/default/types/comercial';
import { slotsConfig } from '../../LN/common/bannerRefactor/config';

const BannerComercial = ({ id, device, slotGroup }) => {
    if (typeof window === 'undefined') return <></>;
    const termicas = findTermica('banners');
    const config = slotsConfig.home[id] || {};
    const { siteProperties } = useAppContext();
    const dfpId = get(siteProperties, 'bannerConfig.dfp_id');

    return (
        <Comercial
            isHome
            targeting={config.targeting}
            dimensions={config.dimensions}
            dfpId={dfpId}
            show={{
                termicas,
                collections: true
            }}
            bidding={{}}
            sizemap={{}}
            device={device}
            slotId={id}
            slotName={config.slotName}
            slotGroup={slotGroup}
        />
    );
};

BannerComercial.propTypes = {
    id: PropTypes.string.isRequired,
    device: PropTypes.string.isRequired,
    slotGroup: PropTypes.string.isRequired
};

export default BannerComercial;
