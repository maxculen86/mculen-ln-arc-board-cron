import React from 'react';
import Consumer from 'fusion:consumer';
import {
    getBannerConfiguration,
    getTargetingFormat,
    isPrimarySectionInBannerSegments
} from '../../../../components/private/LN/common/utils/bannerHelper';
import BannerSSR from '../../../../components/features/LN-common/banner/default';
import BannerSSRAmp from '../../../../components/features/LN-common/banner/amp';
import Context from 'fusion:context';
import { mount, render, shallow } from 'enzyme';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

jest.mock('fusion:static', () => 'mock-static');

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({}) // what you want to return when useContext get fired goes here
    };
});

const defaultTargeting = {
    sitio: 'lanacion',
    seccion: 'nota'
};

const siteProperties = {
    bannerConfig: {
        dfp_id: 133919216,
        nota: {
            desktop: {
                adhesion_dsk: {
                    slotName: 'la_nacion_desktop/Nota/adhesion_dsk',
                    dimensions: [
                        [728, 90],
                        [920, 100]
                    ],
                    targeting: defaultTargeting,
                    closeButton: true
                },
                megatop_dsk: {
                    slotName: 'la_nacion_desktop/Nota/megatop_dsk',
                    dimensions: [[800, 600]],
                    targeting: defaultTargeting
                },
                '1x1_dsk': {
                    slotName: 'la_nacion_desktop/Nota/1x1_dsk',
                    dimensions: [[1, 1]],
                    targeting: defaultTargeting
                },
                cabezal_dsk: {
                    slotName: 'la_nacion_desktop/Nota/cabezal_dsk',
                    withoutHide: true,
                    dimensions: [
                        [1, 1],
                        [728, 90],
                        [920, 100],
                        [920, 170],
                        [970, 90],
                        [1260, 100],
                        [1260, 170]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja1_dsk: {
                    slotName: 'la_nacion_desktop/Nota/caja1_dsk',
                    withoutHide: true,
                    dimensions: [
                        [300, 600],
                        [300, 250]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja2_dsk: {
                    slotName: 'la_nacion_desktop/Nota/caja2_dsk',
                    withoutHide: true,
                    dimensions: [[300, 250]],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja3_dsk: {
                    slotName: 'la_nacion_desktop/Nota/caja3_dsk',
                    withoutHide: true,
                    dimensions: [
                        [300, 600],
                        [300, 250]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja4_dsk: {
                    slotName: 'la_nacion_desktop/Nota/caja4_dsk',
                    withoutHide: true,
                    dimensions: [
                        [300, 600],
                        [300, 250]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja5_dsk: {
                    slotName: 'la_nacion_desktop/Nota/caja5_dsk',
                    withoutHide: true,
                    dimensions: [[300, 250]],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                inread_dsk: {
                    slotName: 'la_nacion_desktop/Nota/inread_dsk',
                    dimensions: [
                        [1, 1],
                        [728, 90]
                    ],
                    targeting: defaultTargeting
                },
                middle_1_dsk: {
                    slotName: 'la_nacion_desktop/Nota/middle_1_dsk',
                    withoutHide: true,
                    dimensions: [
                        [1, 1],
                        [640, 360],
                        [640, 480],
                        [728, 90],
                        [468, 60]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                middle_2_dsk: {
                    slotName: 'la_nacion_desktop/Nota/middle_2_dsk',
                    withoutHide: true,
                    dimensions: [
                        [468, 60],
                        [640, 480],
                        [728, 90],
                        [1, 1]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                middle_3_dsk: {
                    slotName: 'la_nacion_desktop/Nota/middle_3_dsk',
                    withoutHide: true,
                    dimensions: [
                        [728, 90],
                        [640, 480],
                        [468, 60],
                        [1, 1]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                middle_teads_dsk: {
                    slotName: 'la_nacion_desktop/Nota/middle_teads_dsk',
                    dimensions: [
                        [1, 1],
                        [728, 90]
                    ],
                    targeting: defaultTargeting
                },
                comercial_dsk: {
                    slotName: 'la_nacion_desktop/Nota/comercial_dsk',
                    dimensions: [
                        [1, 1],
                        [800, 600]
                    ],
                    targeting: defaultTargeting
                }
            },
            mobile: {
                adhesion_mob: {
                    slotName: 'la_nacion_mobile/Nota/adhesion_mob',
                    dimensions: [[320, 50]],
                    targeting: defaultTargeting,
                    closeButton: true
                },
                megatop_mob: {
                    slotName: 'la_nacion_mobile/Nota/megatop_mob',
                    dimensions: [[320, 480]],
                    targeting: defaultTargeting
                },
                '1x1_mob': {
                    slotName: 'la_nacion_mobile/Nota/1x1_mob',
                    dimensions: [[1, 1]],
                    targeting: defaultTargeting
                },
                sticky1_mob: {
                    slotName: 'la_nacion_mobile/Nota/sticky1_mob',
                    dimensions: [[320, 100]],
                    targeting: defaultTargeting,
                    withoutHide: true,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                sticky2_mob: {
                    slotName: 'la_nacion_mobile/Nota/sticky2_mob',
                    dimensions: [[320, 50]],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja1_mob: {
                    slotName: 'la_nacion_mobile/Nota/caja1_mob',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [300, 450],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja2_mob: {
                    slotName: 'la_nacion_mobile/Nota/caja2_mob',
                    withoutHide: true,
                    dimensions: [
                        [1, 1],
                        [300, 250],
                        [300, 450],
                        [320, 50],
                        [320, 100],
                        [320, 180],
                        [360, 270]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja3_mob: {
                    slotName: 'la_nacion_mobile/Nota/caja3_mob',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja4_mob: {
                    slotName: 'la_nacion_mobile/Nota/caja4_mob',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja5_mob: {
                    slotName: 'la_nacion_mobile/Nota/caja5_mob',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                inread_mob: {
                    slotName: 'la_nacion_mobile/Nota/inread_mob',
                    dimensions: [
                        [1, 1],
                        [320, 50],
                        [300, 250]
                    ],
                    targeting: defaultTargeting
                },
                comercial_mob: {
                    slotName: 'la_nacion_mobile/Nota/comercial_mob',
                    dimensions: [
                        [1, 1],
                        [320, 480]
                    ],
                    targeting: defaultTargeting
                }
            },
            tablet: {
                '1x1_tab': {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/1x1_tab',
                    dimensions: [[1, 1]],
                    targeting: defaultTargeting
                },
                cabezal_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/cabezal_tab',
                    dimensions: [[728, 90]],
                    targeting: defaultTargeting,
                    withoutHide: true,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                adhesion_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/adhesion_tab',
                    dimensions: [[728, 90]],
                    targeting: defaultTargeting,
                    closeButton: true
                },
                caja1_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/caja1_tab',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [300, 600]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja2_tab: {
                    device: 'tab',
                    caja2_tab: 'la_nacion_tablet/Nota/caja2_tab',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [300, 600]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja3_tab: {
                    device: 'tab',
                    caja2_tab: 'la_nacion_tablet/Nota/caja3_tab',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [1, 1]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                inread_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/inread_tab',
                    dimensions: [
                        [1, 1],
                        [728, 90]
                    ],
                    targeting: defaultTargeting
                },
                middle_1_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/middle_1_tab',
                    withoutHide: true,
                    dimensions: [
                        [728, 90],
                        [640, 480],
                        [468, 60],
                        [1, 1]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                middle_2_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/middle_2_tab',
                    withoutHide: true,
                    dimensions: [
                        [728, 90],
                        [640, 480],
                        [468, 60],
                        [1, 1]
                    ],
                    targeting: defaultTargeting,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                middle_teads_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/middle_teads_tab',
                    dimensions: [[1, 1]],
                    targeting: defaultTargeting
                }
            },
            amp: {
                caja1_amp: {
                    slotName: '/133919216/AMP/ROS/caja1_amp',
                    dimensions: [[300, 250]]
                },
                caja2_amp: {
                    slotName: '/133919216/AMP/ROS/caja2_amp',
                    dimensions: [[300, 250]]
                },
                caja3_amp: {
                    slotName: '/133919216/AMP/ROS/caja3_amp',
                    dimensions: [[300, 250]]
                }
            }
        }
    }
};

const globalContent = {
    type: 'story',
    subscription: 'S',
    owner: { sponsored: false },
    comments: { allow_comments: true, display_comments: true },
    label: { mostrar_banners: { display: true, text: 'Si' } },
    taxonomy: {
        primary_section: {
            name: 'El Mundo',
            parent_id: '/',
            path: '/el-mundo',
            type: 'section',
            _id: '/el-mundo',
            _website: 'la-nacion-ar'
        },
        sections: [{ name: 'El Mundo' }, { name: 'Ciencia' }],
        tags: [{ text: 'deportes' }, { text: 'sake' }]
    }
};

describe('isPrimarySectionInBannerSegments =>', () => {
    const segments = ['campo', 'propiedades'];

    const evalSectionInBanner = (section, equal) => {
        const result = isPrimarySectionInBannerSegments(section)(segments);
        expect(result).toEqual(equal);
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(2);
    };

    it('it should be campo included =>', () =>
        evalSectionInBanner('/economia/campo/', [true, 'campo']));
    it('it should be propiedades included =>', () =>
        evalSectionInBanner('/propiedades/', [true, 'propiedades']));
    it('it should be economia does not included =>', () =>
        evalSectionInBanner('/economia/dolar/', [false, 'economia']));
    it('it should be sociedad does not included =>', () =>
        evalSectionInBanner('/sociedad/cultura/', [false, 'sociedad']));
    it('it should be deportes does not included =>', () =>
        evalSectionInBanner('/deportes/futbol/', [false, 'deportes']));
    it('it should be opinion does not included =>', () =>
        evalSectionInBanner('/opinion/', [false, 'opinion']));
    it('it should be deportes (two sub-categories) does not included =>', () =>
        evalSectionInBanner('/deportes/futbol/boca/', [false, 'deportes']));
});

describe('getTargetingFormat =>', () => {
    const { taxonomy } = globalContent;
    const { sections, tags } = taxonomy;
    const targeting = getTargetingFormat(sections)(tags);
    expect(targeting).toEqual(
        '{"tags":["ca_el mundo|ca_ciencia|te_deportes|te_sake"],"tags_nuevos":["ca_el mundo","ca_ciencia","te_deportes","te_sake"]}'
    );
});

describe('getBannerConfiguration =>', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent,
        siteProperties
    }));

    let customFields = {
        slot: 'caja1',
        device: 'desktop',
        group: 'nota'
    };
    const caja1 = {
        slotName: 'la_nacion_desktop/Nota/caja1_dsk',
        withoutHide: true,
        dimensions: [
            [300, 600],
            [300, 250]
        ],
        targeting: { sitio: 'lanacion', seccion: 'nota' },
        bidding: { prebid: { enabled: true } },
        subscription: undefined,
        device: 'desktop',
        slotId: 'caja1_dsk',
        slotGroup: 'nota',
        dfpId: 133919216,
        sticky: undefined,
        background: undefined,
        fixed: undefined,
        show: { termicas: true, collection: true }
    };

    const configCaja1 = getBannerConfiguration(
        globalContent,
        customFields,
        null
    );
    expect(configCaja1).toEqual(caja1);
    expect(configCaja1).toBeInstanceOf(Object);

    customFields = {
        slot: '1x1',
        device: 'mobile',
        group: 'nota'
    };

    const unoxuno = {
        dimensions: [[1, 1]],
        targeting: { sitio: 'lanacion', seccion: 'nota' },
        subscription: undefined,
        device: 'mobile',
        slotId: '1x1_mob',
        slotName: 'la_nacion_mobile/Nota/1x1_mob',
        slotGroup: 'nota',
        dfpId: 133919216,
        sticky: undefined,
        background: undefined,
        fixed: undefined,
        show: { termicas: true, collection: true }
    };

    const config1x1 = getBannerConfiguration(globalContent, customFields, null);
    expect(config1x1).toEqual(unoxuno);

    customFields = {
        slot: 'cabezal',
        device: 'desktop',
        sticky: true,
        // background,
        group: 'nota'
        //amp
    };

    const componentBannerCabezal = shallow(
        <BannerSSR customFields={customFields} globalContent={globalContent} />
    );
    expect(componentBannerCabezal).toMatchSnapshot();

    const adhesionMobile = {
        slotName: 'la_nacion_mobile/Nota/adhesion_mob',
        dimensions: [[320, 50]],
        targeting: { sitio: 'lanacion', seccion: 'nota' },
        closeButton: true,
        subscription: true,
        device: 'mobile',
        slotId: 'adhesion_mob',
        slotGroup: 'nota',
        dfpId: 133919216,
        sticky: undefined,
        background: undefined,
        fixed: true,
        show: { termicas: true, collection: true }
    };

    customFields = {
        slot: 'adhesion',
        device: 'mobile',
        fixed: true,
        // sticky,
        // background,
        group: 'nota'
        //amp
    };
    const configAdhesionMobile = getBannerConfiguration(
        globalContent,
        customFields,
        null
    );
    expect(configAdhesionMobile).toEqual(adhesionMobile);

    const componentAdhesionBanner = render(
        <BannerSSR customFields={customFields} globalContent={globalContent} />
    );
    expect(componentAdhesionBanner).toMatchSnapshot();

    const componentAmp = mount(
        <BannerSSR
            customFields={{
                slot: 'adhesion',
                device: 'mobile',
                group: 'nota',
                amp: true
            }}
            globalContent={globalContent}
        />
    );

    expect(componentAmp).toBeEmptyRender;

    const componentCajaAmp = render(
        <BannerSSRAmp
            customFields={{
                slot: 'caja1',
                device: 'desktop',
                group: 'nota',
                amp: true
            }}
            globalContent={globalContent}
            outputType="amp"
        />
    );

    expect(componentCajaAmp).toBeDefined();
    expect(componentCajaAmp.find('amp-ad')).toBeTruthy();
    expect(componentCajaAmp.find('DivBannerAMP')).toBeTruthy();
    expect(componentCajaAmp).toMatchSnapshot();
});
