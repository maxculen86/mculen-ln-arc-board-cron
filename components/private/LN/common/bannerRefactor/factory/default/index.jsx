/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import Sticky1Mob from './types/sticky1Mob';
import Sticky2Mob from './types/sticky2Mob';

import Default from './types';

import withStickyFromTo from '../../decorators/withStickyFromTo';

export default config => {
    const { slotId: type } = config;

    console.log('confg en default:', config);

    return props => {
        switch (type) {
            case 'sticky1_mob':
                return <Sticky1Mob {...config} />;
            case 'sticky2_mob':
                return <Sticky2Mob {...config} />;
            case 'cabezal_dsk':
                const Banner = withStickyFromTo(Default)('caja1_dsk');
                return <Banner {...config} />;
            // return <Default {...config} />;
            default:
                console.log('pasa pordefault');
                return <Default {...config} />;
        }
    };
};
