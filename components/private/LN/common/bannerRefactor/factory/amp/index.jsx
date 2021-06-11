/* eslint-disable no-case-declarations         */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Amp from './types';

import { CAJA_1_AMP, CAJA_2_AMP, CAJA_3_AMP } from '../constants';

import withSimpleAmpWrapper from '../../decorators/withSimpleAmpWrapper';
import withStickyAmpWrapper from '../../decorators/withStickyAmpWrapper';

export default config => {
    const { slotId } = config;

    switch (slotId) {
        case CAJA_1_AMP:
        case CAJA_2_AMP:
        case CAJA_3_AMP:
            return React.createElement(withSimpleAmpWrapper(Amp), {
                ...config
            });
        // case CAJA_3_AMP:
        //     return React.createElement(withStickyAmpWrapper(Amp), {
        //         ...config
        //     });
        default:
            return <></>;
    }
};
