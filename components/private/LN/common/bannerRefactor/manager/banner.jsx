/* eslint-disable react/require-default-props */

/**
 * Banner Manager
 * I'm responsible of calling the right factory
 */

import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';

import { slotsConfig } from '../config';

import DefaultFactory from '../factory/default';
// import AmpFactory from '../factory/amp';

const BannerManager = props => {
    const { outputType, config } = props;

    if (outputType === 'amp') {
        // Calls amp banner factory
        // return AmpFactory(config);
    }

    //console.log("############# config: ", config);

    // Calls default banner factory
    const Component = DefaultFactory(config);

    return <Component />;
};

BannerManager.propTypes = {
    outputType: PropTypes.string.isRequired,
    config: PropTypes.shape({
        group: PropTypes.oneOf(Object.keys(slotsConfig)).isRequired,
        selectedSlots: PropTypes.shape({
            desktopSlot: PropTypes.string,
            mobileSlot: PropTypes.string,
            tabletSlot: PropTypes.string
        }),
        sticky: PropTypes.bool,
        background: PropTypes.bool,
        show: PropTypes.bool
    })
};

export default Context(BannerManager);
