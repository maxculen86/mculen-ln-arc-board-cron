/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import BannerManager from './manager/banner';

const index = props => {
    const { banner } = props;

    return <BannerManager config={banner} />;
};

index.propTypes = {
    banner: PropTypes.shape({
        slotGroup: PropTypes.string.isRequired,
        selectedSlots: PropTypes.shape({
            desktopSlot: PropTypes.string,
            mobileSlot: PropTypes.string,
            tabletSlot: PropTypes.string
        }).isRequired,
        sticky: PropTypes.bool,
        background: PropTypes.bool,
        fixed: PropTypes.bool,
        show: PropTypes.shape({
            termicas: PropTypes.bool,
            collection: PropTypes.bool
        })
    })
};

export default index;
