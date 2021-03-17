import React from 'react';
import { shallow } from 'enzyme';

import GlobalProvider from '../../../../../../components/private/common/context/globalContext';
import Ads from '../../../../../../components/private/LN/common/bannerRefactor/ads';

import { slotsConfig } from '../../../../../../components/private/LN/common/bannerRefactor/config';

const registerAdFn = jest.fn();
global.ArcAds = jest.fn().mockImplementationOnce(() => ({
    registerAd: registerAdFn
}));

jest.mock('fusion:context', () => ({
    useAppContext: () => ({
        arcSite: 'la-nacion-ar'
    })
}));
global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
};

describe('Ads', () => {
    const mockDispatch = jest.fn();
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
        shallow(
            <GlobalProvider value={mockDispatch}>
                <Ads {...props} />
            </GlobalProvider>
        );
        /* expect(global.ArcAds).toHaveBeenCalledTimes(1);
        expect(registerAdFn).toHaveBeenCalled(); */
    });
});
