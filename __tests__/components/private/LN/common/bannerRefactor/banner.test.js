/* 
jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
}); */

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

/* jest.mock(
    '../../../../../../components/private/common/hocs/withScreenUtils',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
); */

//import Banner from '../../../../../../components/private/LN/common/bannerRefactor';
import Banner from '../../../../../../components/features/LN-common/bannerRefactor';

const registerAdFn = jest.fn();
global.ArcAds = jest.fn().mockImplementationOnce(() => ({
    registerAd: registerAdFn
}));

jest.mock(
    '../../../../../../components/private/LN/common/bannerRefactor/placeholder.jsx',
    () => 'mock-placeholder'
);

global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
};

describe('Banner', () => {
    const props = {
        siteProperties: {
            bannerConfig: {
                dfp_id: 133919216
            }
        },
        globalContent: {
            banner: {},
            termicas: {
                banners: 'true'
            },
            owner: {
                sponsored: 'false'
            },
            label: {
                mostrar_banners: {
                    text: 'Si'
                },
                marca_anunciante: {
                    text: ''
                }
            }
        },
        screenUtils: {
            device: 'mobile'
        },
        isAdmin: false,
        customFields: {
            desktop: undefined,
            mobile: 'caja1_dsk',
            tablet: undefined
        },
        group: 'nota',
        background: false,
        sticky: false,
        extraClasses: '',
        siteService: {
            termicas: [{ key: 'banners', value: 'true' }],
            adserver: []
        }
    };

    /* function setMobileUA() {
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
    } */

    // Mejorar y agregar nuevos tests
    it('Renders as expected', () => {
        const component = mount(
            <Banner
                {...{
                    ...props
                }}
            />
        );

        expect(component.find('Banner')).toHaveLength(1);
    });
});
