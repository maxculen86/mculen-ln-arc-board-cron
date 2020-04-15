import React from 'react';
import { shallow } from 'enzyme';

import Ads from '../../../../../../components/private/LN/common/bannerRefactor/ads';

import { slotsConfig } from '../../../../../../components/private/LN/common/bannerRefactor/config';

const registerAdFn = jest.fn();
global.ArcAds = jest.fn().mockImplementationOnce(() => ({
    registerAd: registerAdFn
}));

describe('Ads', () => {
    const config = slotsConfig['nota']['sticky1_mob'];

    const props = {
        id: 'sticky1_mob',
        slotName: config.slotName,
        dimensions: config.dimensions,
        targeting: {
            sitio: 'lanacion',
            seccion: 'nota'
        },
        bidding: config.bidding,
        display: null,
        background: true
    };

    it('Gets called', () => {
        shallow(<Ads {...props} />);
        expect(global.ArcAds).toHaveBeenCalledTimes(1);
        expect(registerAdFn).toHaveBeenCalled();
    });
});
