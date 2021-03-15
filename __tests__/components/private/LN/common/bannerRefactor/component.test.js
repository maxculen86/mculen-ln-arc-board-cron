import React from 'react';
import { render } from 'enzyme';
import Banner from '../../../../../../components/private/LN/common/bannerRefactor/factory/default/types';
import GlobalProvider from '../../../../../../components/private/common/context/globalContext';

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

describe('Banner', () => {
    const mockDispatch = jest.fn();
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
        closeButton: false,
        show: {
            termicas: true
        }
    };

    it('Matches snapshot', () => {
        const component = render(
            <GlobalProvider value={mockDispatch}>
                <Banner {...props} />
            </GlobalProvider>
        );
        expect(component).toMatchSnapshot();
    });
});
