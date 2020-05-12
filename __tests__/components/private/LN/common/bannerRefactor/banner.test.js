import Consumer from 'fusion:consumer';

import React from 'react';
import { mount, shallow, render } from 'enzyme';

jest.mock('fusion:context', Component => {
    return function(Component) {
        const outputType = 'default';
        return props => <Component {...props} outputType={outputType} />;
    };
});

import Context from 'fusion:context';

jest.mock(
    '../../../../../../components/private/common/hocs/withNavigation',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

import Banner from '../../../../../../components/private/LN/common/bannerRefactor';

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
    const siteProps = {
        bannerConfig: {
            dfp_id: 133919216
        }
    };

    const baseConfig = {
        selectedSlots: {
            desktopSlot: undefined,
            mobileSlot: 'sticky1_mob',
            tabletSlot: undefined
        },
        slotGroup: 'nota',
        background: true,
        sticky: true,
        show: undefined,
        extraClasses: ''
    };

    function setMobileUA() {
        delete window.navigator;
        global.navigator = {
            userAgent:
                'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) \
                        AppleWebKit/537.36 (KHTML, like Gecko) \
                        Chrome/76.0.3809.100 \
                        Mobile Safari/537.36'
        };
    }

    function setDesktopUA() {
        delete window.navigator;
        global.navigator = {
            userAgent:
                'Mozilla/5.0 (X11; Linux x86_64) \
                        AppleWebKit/537.36 (KHTML, like Gecko) \
                        Chrome/76.0.3809.100 Safari/537.36'
        };
    }

    it('Renders placeholder in pagebuiler', () => {
        setMobileUA();

        const component = shallow(
            <Banner
                siteProperties={siteProps}
                isAdmin={true}
                banner={baseConfig}
            />
        );

        expect(component.html()).toContain('placeholder');
    });

    it('Renders as expected when dfp id is missing', () => {
        setMobileUA();

        const component = mount(
            <Banner
                siteProperties={{ bannerConfig: {} }}
                isAdmin={true}
                banner={baseConfig}
            />
        );

        expect(component.html()).toContain('no-dfpid');
    });

    it("Does not render if device ain't mobile", () => {
        setDesktopUA();

        const component = render(
            <Banner
                siteProperties={siteProps}
                isAdmin={false}
                banner={baseConfig}
            />
        );

        expect(component.html()).toBeNull();
    });
});
