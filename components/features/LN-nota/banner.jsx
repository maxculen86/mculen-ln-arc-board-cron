import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Banner from '../../private/LN/common/banner';
import { getSlotsOptions } from '../../private/LN/common/banner/config';

const banner = ({ siteProperties, isAdmin, customFields: { slotId } }) => {
    return (
        <Banner
            siteProperties={siteProperties}
            isAdmin={isAdmin}
            slotId={slotId}
        />
    );
};

banner.label = 'LN-Common-Banner';

banner.propTypes = {
    customFields: PropTypes.shape({
        slotId: PropTypes.oneOf(getSlotsOptions())
    }).isRequired,
    siteProperties: PropTypes.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default Consumer(banner);
