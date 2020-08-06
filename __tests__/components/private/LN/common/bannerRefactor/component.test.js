import React from 'react';
import { render } from 'enzyme';
import Banner from '../../../../../../components/private/LN/common/bannerRefactor/factory/default/types';

import { slotsConfig } from '../../../../../../components/private/LN/common/bannerRefactor/config';

const registerAdFn = jest.fn();
global.ArcAds = jest.fn().mockImplementationOnce(() => ({
    registerAd: registerAdFn
}));

global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
};

describe('Banner', () => {
    const config = slotsConfig['nota']['cabezal_dsk'];

    const props = {
        slotId: 'cabezal_dsk',
        slotName: config.slotName,
        dimensions: config.dimensions,
        targeting: {
            sitio: 'lanacion',
            seccion: 'nota'
        },
        bidding: config.bidding,
        display: 'all',
        background: true,
        sticky: false,
        closeButton: false
    };

    it('Matches snapshot', () => {
        const component = render(<Banner {...props} />);
        expect(component).toMatchSnapshot();
    });
});
