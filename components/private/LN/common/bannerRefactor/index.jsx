/* eslint-disable react/require-default-props */

import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'prop-types';

import { slotsConfig } from './config';

import DefaultFactory from './factory/default';
import AmpFactory from './factory/amp';

const index = props => {
    const { outputType, config } = props;

    if (outputType === 'amp') {
        return AmpFactory(config);
    }

    const Component = DefaultFactory(config);
    return <Component />;
};

index.propTypes = {
    outputType: PropTypes.string,
    config: PropTypes.shape({
        group: PropTypes.oneOf(Object.keys(slotsConfig)).isRequired,
        selectedSlots: PropTypes.shape({
            desktopSlot: PropTypes.string,
            mobileSlot: PropTypes.string,
            tabletSlot: PropTypes.string
        }),
        sticky: PropTypes.bool,
        background: PropTypes.bool,
        fixed: PropTypes.bool,
        show: PropTypes.bool
    })
};

index.defaultProps = {
    outputType: 'default',
    config: PropTypes.shape({
        group: PropTypes.oneOf(Object.keys(slotsConfig)),
        selectedSlots: PropTypes.shape({
            desktopSlot: PropTypes.string,
            mobileSlot: PropTypes.string,
            tabletSlot: PropTypes.string
        }),
        sticky: PropTypes.bool,
        background: PropTypes.bool,
        fixed: PropTypes.bool,
        show: PropTypes.bool
    })
};

export default Context(index);
