/* eslint-disable react/require-default-props */

import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';

import { slotsConfig } from '../config';

import DefaultFactory from '../factory/default';
import AmpFactory from '../factory/amp';

const BannerManager = props => {
    const { outputType, config } = props;

    if (outputType === 'amp') {
        return AmpFactory(config);
    }

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
