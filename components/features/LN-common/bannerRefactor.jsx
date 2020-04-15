/* eslint-disable react/require-default-props */

/**
 * Banner feature.
 * I'm responsible of setting the feature's custom fields and passing them in to
 * the display manager through a banner config prop
 */

import React from 'react';
import { useFusionContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import BannerComponent from '../../private/LN/common/bannerRefactor';
import {
    getSlotsOptions,
    slotsConfig
} from '../../private/LN/common/bannerRefactor/config';

const Banner = props => {
    const fusionContext = useFusionContext();

    const {
        siteProperties,
        isAdmin,
        customFields: { group, desktop, mobile, tablet, sticky, background },
        termicas
    } = fusionContext;

    const { banners: show } = termicas || {};

    const banner = {
        slotGroup: group,
        selectedSlots: {
            desktopSlot: desktop,
            mobileSlot: mobile,
            tabletSlot: tablet
        },
        sticky,
        background,
        show
    };

    return (
        <BannerComponent
            siteProperties={siteProperties}
            isAdmin={isAdmin}
            banner={banner}
        />
    );
};

Banner.label = 'LN-Common-BannerRefactor';

Banner.propTypes = {
    customFields: PropTypes.shape({
        group: PropTypes.oneOf(Object.keys(slotsConfig)).tag({
            label: 'Ubicacion'
        }).isRequired,
        desktop: PropTypes.oneOf(getSlotsOptions()),
        mobile: PropTypes.oneOf(getSlotsOptions()),
        tablet: PropTypes.oneOf(getSlotsOptions()),
        sticky: PropTypes.bool,
        background: PropTypes.bool
    }).isRequired,
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    })
};

export default Banner;
