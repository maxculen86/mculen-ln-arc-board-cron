import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Banner from '../../private/LN/common/banner';
import {
    getSlotsOptions,
    slotsConfig
} from '../../private/LN/common/banner/config';

const banner = ({
    siteProperties,
    isAdmin,
    customFields: { group, desktop, mobile, tablet }
}) => {
    return (
        <Banner
            siteProperties={siteProperties}
            isAdmin={isAdmin}
            slotGroup={group}
            devices={group}
            selectedSlots={{
                desktopSlot: desktop,
                mobileSlot: mobile,
                tabletSlot: tablet
            }}
        />
    );
};

banner.label = 'LN-Common-Banner';

banner.propTypes = {
    customFields: PropTypes.shape({
        group: PropTypes.oneOf(Object.keys(slotsConfig)).tag({
            label: 'Ubicacion'
        }).isRequired,
        desktop: PropTypes.oneOf(getSlotsOptions()),
        mobile: PropTypes.oneOf(getSlotsOptions()),
        tablet: PropTypes.oneOf(getSlotsOptions())
    }).isRequired,
    siteProperties: PropTypes.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default Consumer(banner);
