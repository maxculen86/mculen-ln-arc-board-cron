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
    customFields: { group, desktop, mobile, tablet, sticky, background }
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
            sticky={sticky}
            background={background}
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
        tablet: PropTypes.oneOf(getSlotsOptions()),
        sticky: PropTypes.bool,
        background: PropTypes.bool
    }).isRequired,
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }),
    isAdmin: PropTypes.bool
};

// banner.defaultProps = {
//     isAdmin: false,
//     siteProperties: {
//         bannerConfig: {
//             dfp_id: 0
//         }
//     }
// };

export default Consumer(banner);
