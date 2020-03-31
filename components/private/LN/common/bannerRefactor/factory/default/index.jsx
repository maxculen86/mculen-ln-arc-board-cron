/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Sticky1Mob from './types/sticky1Mob';
import Sticky2Mob from './types/sticky2Mob';

export default config => {
    const { slotId: type } = config;

    // console.log("############ CONFIG EN FACTORY: ", config);

    return props => {
        switch (type) {
            case 'sticky1_mob':
                return <Sticky1Mob {...config} />;
            case 'sticky2_mob':
                return <Sticky2Mob {...config} />;
            default:
                return null;
        }
    };
};
