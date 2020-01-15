import React from 'react';
import { render, shallow } from 'enzyme';
import { slotsConfig } from '../../../../../../components/private/LN/common/banner/config';
import ArcWrapper from '../../../../../../components/private/LN/common/banner/arcWrapper';
//import { MutationObserver } from '../../../../../../__mocks__/mutationObserver';

const registerAdFn = jest.fn();
global.ArcAds = jest.fn().mockImplementationOnce(() => ({
    registerAd: registerAdFn
}));

/* const observeFn = jest.fn();
const MutationObserver = jest.fn().mockImplementationOnce(() => ({
    observe: jest.fn()
})); */
global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
};
//Object.defineProperty(window, 'MutationObserver', { value: MutationObserver });

describe('LaNacion - Common - Banner - ArcWrapper', () => {
    const slotId = 'caja1_dsk';
    const config = slotsConfig['nota'][slotId];

    it('Test de snapShot', () => {
        const comp = render(
            <ArcWrapper
                id={slotId}
                slotName={config.slotName}
                dimensions={config.dimensions}
                targeting={config.targeting}
                bidding={config.bidding}
                dfpId={12345}
                className="claseTest"
            />
        );

        expect(comp).toMatchSnapshot();
    });

    it('Test llamado a ArcAds', () => {
        let comp = shallow(
            <ArcWrapper
                id={slotId}
                slotName={config.slotName}
                dimensions={config.dimensions}
                targeting={config.targeting}
                bidding={config.bidding}
                dfpId={12345}
                className="claseTest"
            />
        );

        comp = shallow(
            <ArcWrapper
                id={slotId}
                slotName={config.slotName}
                dimensions={config.dimensions}
                targeting={config.targeting}
                bidding={config.bidding}
                dfpId={12345}
                className="claseTest"
            />
        );

        expect(ArcWrapper.arcAdsInstance).not.toBeUndefined();
        expect(global.ArcAds).toHaveBeenCalledTimes(1);
        expect(registerAdFn).toHaveBeenCalledTimes(2);
    });
});
