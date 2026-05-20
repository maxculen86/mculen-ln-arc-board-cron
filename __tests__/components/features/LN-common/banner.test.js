import React from 'react';
import Context from 'fusion:context';
import {
    buildBannerClasses,
    changeSegmentAdUnit,
    getBannerConfiguration,
    getDimsFromSiteService,
    isPrimarySectionInBannerSegments,
    handleCanchallenaException,
    shouldShow,
    setPrebidBanners,
    parseDimensionsBanners
} from '../../../../components/private/LN/common/utils/bannerHelper';
import Banner from '../../../../components/features/LN-common/bannerRefactor/default';
import { render } from '@testing-library/react';

jest.mock(
    '../../../../components/private/common/staticContent',
    () => 'mock-static-content'
);

jest.mock('fusion:consumer', component => {
    return function (component) {
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
    },
    useAppContext: jest.fn()
}));

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({
            state: {
                siteService: {
                    adserver: [
                        {
                            value: 'campo'
                        },
                        {
                            value: 'propiedades'
                        }
                    ]
                }
            }
        })
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

const globalContentDeNotaCampo = {
    type: 'story',
    subscription: 'S',
    owner: { sponsored: false },
    comments: { allow_comments: true, display_comments: true },
    label: { mostrar_banners: { display: true, text: 'Si' } },
    taxonomy: {
        primary_section: {
            name: 'El Mundo',
            parent_id: '/economia',
            path: '/economia/campo/',
            type: 'section',
            _id: '/economia/campo/',
            _website: 'la-nacion-ar'
        },
        sections: [{ name: 'Economia' }, { name: 'Campo' }],
        tags: [{ text: 'campo' }]
    }
};

const subSections = [
    {
        id: '/deportes/futbol/river-plate',
        _website: 'la-nacion-ar',
        additional_properties: {
            original: {
                ancestors: {
                    default: ['/', '/deportes', '/deportes/futbol']
                },
                migration: {
                    id_section_ln9: '7262',
                    migrated_mob: 'true'
                }
            }
        },
        name: 'River Plate',
        parent_id: '/deportes/futbol',
        path: '/deportes/futbol/river-plate',
        type: 'section'
    },
    {
        _id: '/deportes/canchallena',
        _website: 'la-nacion-ar',
        additional_properties: {
            original: {
                ancestors: {
                    default: ['/', '/deportes']
                },
                site: {}
            }
        },
        name: 'Canchallena',
        parent_id: '/deportes',
        path: '/deportes/canchallena',
        type: 'section'
    }
];

describe('common - utils - bannerHelper', () => {
    describe('isPrimarySectionInBannerSegments =>', () => {
        Context.useAppContext = jest.fn(() => ({
            deployment: jest.fn(),
            contextPath: '/pf'
        }));
        const segments = ['campo', 'propiedades', 'IA', 'que-sale'];

        const evalSectionInBanner = (section, equal, tags = []) => {
            const result =
                isPrimarySectionInBannerSegments(tags)(section)(segments);
            expect(result).toEqual(equal);
            expect(result).toBeInstanceOf(Array);
            expect(result).toHaveLength(2);
        };

        it('should test the tag que-sale', () => {
            evalSectionInBanner(
                '/anysection/',
                [true, 'que-sale'],
                [{ slug: 'que-sale' }]
            );
        });

        it('should test the tag futuria', () => {
            evalSectionInBanner(
                '/anysection/',
                [true, 'futuria'],
                [{ slug: 'futuria' }]
            );
        });

        it('it should be campo included =>', () =>
            evalSectionInBanner('/economia/campo/', [true, 'campo']));

        it('it should be futuria included =>', () =>
            evalSectionInBanner('/economia/IA/', [true, 'futuria']));

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

        it('should test exceptions', () => {
            const exceptions = [
                { primarySection: '/estados-unidos', segment: 'la_nacion_usa' },
                { primarySection: '/salud', segment: 'bienestar' },
                { primarySection: '/autos', segment: 'movilidad' }
            ];
            exceptions.forEach(element =>
                expect(
                    isPrimarySectionInBannerSegments([])(
                        element.primarySection
                    )([element.segment])
                ).toStrictEqual([true, element.segment])
            );
        });

        it('should be canchallena exception', () => {
            expect(
                isPrimarySectionInBannerSegments([])('deportes')(
                    segments,
                    subSections
                )
            ).toStrictEqual([true, 'canchallena']);
        });
    });

    describe('handleCanchallenaException =>', () => {
        Context.useAppContext = jest.fn(() => ({
            deployment: jest.fn(),
            contextPath: '/pf'
        }));
        it('it should return true and canchallena section =>', () => {
            expect(handleCanchallenaException(subSections)).toEqual([
                true,
                'canchallena'
            ]);
        });

        it('it should return false if not canchallena =>', () => {
            expect(handleCanchallenaException([subSections[0]])).toEqual(false);
        });

        it('it should return false by default =>', () => {
            expect(handleCanchallenaException()).toEqual(false);
        });
    });

    describe('getDimsFromSiteService =>', () => {
        Context.useAppContext = jest.fn(() => ({
            deployment: jest.fn(),
            contextPath: '/pf'
        }));
        it('should test getDimsFromSiteService func', () => {
            let dimensions = getDimsFromSiteService(
                [],
                `nota_caja1_dsk`,
                'propiedades'
            );
            expect(dimensions).toEqual([
                [300, 250],
                [300, 600],
                [120, 600],
                [160, 600],
                [300, 450]
            ]);

            dimensions = getDimsFromSiteService(
                [
                    {
                        adunit: 'nota_caja2_mob',
                        dimensions:
                            '320x50,320x100,300x250,300x450,1x1,360x270,320x180, 360x450, 380x450'
                    }
                ],
                `nota_caja2_mob`,
                'espectaculos'
            );
            expect(dimensions).toHaveLength(9);

            dimensions = getDimsFromSiteService(
                [
                    {
                        adunit: 'nota_caja5_mob',
                        dimensions:
                            '320x50,320x100,300x250,300x450,1x1,360x270,320x180, 360x450, 380x450,fluid'
                    }
                ],
                `nota_caja5_mob`,
                'espectaculos'
            );

            const expectArray = [
                [320, 50],
                [320, 100],
                [300, 250],
                [300, 450],
                [1, 1],
                [360, 270],
                [320, 180],
                [360, 450],
                [380, 450],
                ['fluid']
            ];
            expect(dimensions).toEqual(expectArray);
            expect(dimensions).toHaveLength(10);
        });

        it('should add corresponding dimensions for sections', () => {
            const banners = ['nota_caja1_dsk', 'acumulado_caja1_dsk'];
            const sections = ['la_nacion_usa'];
            banners.forEach(banner =>
                sections.forEach(section =>
                    expect(
                        getDimsFromSiteService(
                            [
                                {
                                    adunit: banner,
                                    dimensions: '200x300'
                                }
                            ],
                            banner,
                            section
                        )
                    ).toStrictEqual([
                        [120, 600],
                        [160, 600],
                        [300, 600]
                    ])
                )
            );
        });
    });

    describe('changeSegmentAdUnit =>', () => {
        Context.useAppContext = jest.fn(() => ({
            deployment: jest.fn(),
            contextPath: '/pf'
        }));
        it('Should change the slot name if one of the adserver segments is in the path', () => {
            const slotName = changeSegmentAdUnit(
                'campo',
                'desktop',
                'la_nacion_desktop/Nota/middle_1_dsk'
            );
            expect(slotName).toEqual('campo_desktop/Nota/middle_1_dsk');
        });

        it("The banner configuration should come with the adserver segment's own slot", () => {
            let customFields = {
                desktop: 'caja1_dsk',
                group: 'nota'
            };

            const configCaja1 = getBannerConfiguration(
                globalContentDeNotaCampo,
                customFields,
                null,
                { device: 'desktop', slotId: 'caja1_dsk' }
            );

            expect(configCaja1.slotName).toEqual(
                'campo_desktop/Nota/caja1_dsk'
            );

            const configCajaNoCampo = getBannerConfiguration(
                globalContent,
                {
                    desktop: 'caja1_dsk',
                    group: 'nota'
                },
                null,
                { device: 'desktop', slotId: 'caja1_dsk' }
            );

            expect(configCajaNoCampo.slotName).toEqual(
                'la_nacion_desktop/Nota/caja1_dsk'
            );
        });
    });

    describe('getBannerConfiguration =>', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent,
            siteProperties,
            deployment: jest.fn(),
            contextPath: '/pf'
        }));

        let customFields = {
            desktop: 'caja1_dsk',
            group: 'nota'
        };

        it('Deberia traer la configuracion del banner Caja1_dsk', () => {
            const caja1 = {
                slotName: 'la_nacion_desktop/Nota/caja1_dsk',
                withoutHide: true,
                dimensions: [
                    [300, 600],
                    [300, 250]
                ],
                targeting: { sitio: 'lanacion', seccion: 'nota' },
                bidding: { prebid: { enabled: true } },
                device: 'desktop',
                slotId: 'caja1_dsk',
                slotGroup: 'nota',
                dfpId: 133919216,
                classes: '',
                theme: 'light'
            };

            const configCaja1 = getBannerConfiguration(
                globalContent,
                customFields,
                null,
                { device: 'desktop', slotId: 'caja1_dsk' }
            );
            expect(configCaja1).toEqual(caja1);
            expect(configCaja1).toBeInstanceOf(Object);
        });

        it('Deberia traer la configuracion del banner 1x1_mob con y sin suscripcion', () => {
            customFields = {
                mobile: '1x1_mob',
                group: 'nota'
            };

            const config1x1 = getBannerConfiguration(
                globalContent,
                customFields,
                null,
                { device: 'mobile', slotId: '1x1_mob' }
            );
            expect(config1x1).toEqual(null);

            const unoxuno = {
                dimensions: [[1, 1]],
                targeting: { sitio: 'lanacion', seccion: 'nota' },
                device: 'mobile',
                slotId: '1x1_mob',
                slotName: 'la_nacion_mobile/Nota/1x1_mob',
                slotGroup: 'nota',
                dfpId: 133919216,
                classes: 'none ',
                theme: 'light'
            };

            const config1x1SinSuscripcion = getBannerConfiguration(
                { ...globalContent, subscription: 'A' },
                customFields,
                null,
                { device: 'mobile', slotId: '1x1_mob' }
            );
            expect(config1x1SinSuscripcion).toEqual(unoxuno);
        });

        it('Deberia traer la configuracion del banner cabezal', () => {
            customFields = {
                desktop: 'cabezal_dsk',
                sticky: true,
                group: 'nota'
            };

            const componentBannerCabezal = render(
                <Banner
                    customFields={customFields}
                    globalContent={globalContent}
                />
            );
            expect(componentBannerCabezal).toMatchSnapshot();

            const componentBannerCabezalNoShow = render(
                <Banner
                    customFields={customFields}
                    globalContent={{
                        ...globalContent,
                        acumuladoGeneral: { hide_banner: 'true' }
                    }}
                />
            );
            expect(componentBannerCabezalNoShow).toBeEmptyRender;
        });

        it('Deberia traer la configuracion del adhesion_mob con y sin suscripcion', () => {
            const adhesionMobile = {
                slotName: 'la_nacion_mobile/Nota/adhesion_mob',
                dimensions: [[320, 50]],
                targeting: { sitio: 'lanacion', seccion: 'nota' },
                closeButton: true,
                device: 'mobile',
                slotId: 'adhesion_mob',
                slotGroup: 'nota',
                dfpId: 133919216,
                classes: '--fixed --close none ',
                theme: 'light'
            };

            customFields = {
                mobile: 'adhesion_mob',
                fixed: true,
                group: 'nota'
            };
            const configAdhesionMobileConSuscripcion = getBannerConfiguration(
                globalContent,
                customFields,
                null,
                { device: 'mobile', slotId: 'adhesion_mob' }
            );
            expect(configAdhesionMobileConSuscripcion).toEqual(null);

            const configAdhesionMobileSinSuscripcion = getBannerConfiguration(
                { ...globalContent, subscription: 'A' },
                customFields,
                null,
                { device: 'mobile', slotId: 'adhesion_mob' }
            );
            expect(configAdhesionMobileSinSuscripcion).toEqual(adhesionMobile);

            const componentAdhesionBanner = render(
                <Banner
                    customFields={customFields}
                    globalContent={{ ...globalContent, subscription: 'A' }}
                />
            );
            expect(componentAdhesionBanner).toMatchSnapshot();
        });

        it('Validar que las clases css se construyan bien segun la configuracion del banner', () => {
            expect(
                buildBannerClasses({ closeButton: true }, { fixed: true })
            ).toEqual('--fixed --close none ');
            expect(buildBannerClasses({}, {})).toEqual('none ');
            expect(
                buildBannerClasses(
                    { closeButton: true, withoutHide: false },
                    { fixed: true, sticky: true, background: true }
                )
            ).toEqual('--bg-banner --sticky --fixed --close none ');
            expect(
                buildBannerClasses({ slotName: 'Nota/comercial_dsk' }, {})
            ).toEqual('none --comercial ');
            expect(
                buildBannerClasses(
                    {
                        slotName: 'Home/cajasuscriptores_dsk',
                        withoutHide: true
                    },
                    {}
                )
            ).toEqual('');
        });

        it('Validar que el banner no se muestra si recibe por termicas, por section o por composer el valor', () => {
            expect(shouldShow(undefined, undefined, undefined)).toEqual(true);
            expect(
                shouldShow(undefined, undefined, [
                    { key: 'banners', value: 'false' }
                ])
            ).toEqual(false);
            expect(
                shouldShow('true', undefined, [
                    { key: 'banners', value: 'true' }
                ])
            ).toEqual(false);
            expect(
                shouldShow(
                    'false',
                    {
                        mostrar_banners: { text: 'No' }
                    },
                    [{ key: 'banners', value: 'true' }]
                )
            ).toEqual(false);
            expect(
                shouldShow(
                    'false',
                    {
                        mostrar_banners: { text: 'Si' }
                    },
                    [{ key: 'banners', value: 'true' }]
                )
            ).toEqual(true);

            const banner = render(
                <Banner
                    customFields={customFields}
                    globalContent={{
                        ...globalContent,
                        label: { mostrar_banners: { text: 'No' } }
                    }}
                />
            );
            expect(banner).toBeEmptyRender;
        });

        it('deberia ocultar banner si es el usuario es suscriptor y el banner es solo para no suscriptores', () => {
            customFields = {
                desktop: 'cabezal_dsk',
                solo_no_suscriptores: true,
                group: 'nota'
            };
            const { container } = render(
                <Banner
                    customFields={customFields}
                    globalContent={globalContent}
                />
            );
            expect(container.innerHTML).toStrictEqual('');
        });

        it('deberia mostrar banner para todos los usuarios con nuevo custom field', () => {
            const cabezalBanner = `<div class=\"ln-banner-container --no-app --cabezal_dsk\"><div id=\"cabezal_dsk\" class=\"ln-banner\" data-slot-group=\"nota\" data-device=\"desktop\" data-subscription=\"false\" data-ad-unit-path=\"/133919216/la_nacion_desktop/Nota/cabezal_dsk\" data-targeting=\"{&quot;sitio&quot;:&quot;lanacion&quot;,&quot;seccion&quot;:&quot;nota&quot;}\" data-without-hide=\"true\" data-size=\"[[1,1],[728,90],[920,100],[920,170],[970,90],[1260,100],[1260,170]]\" data-sizemap=\"[]\" data-prebid-enabled=\"true\"></div></div>`;

            customFields = {
                desktop: 'cabezal_dsk',
                solo_no_suscriptores: false,
                group: 'nota'
            };
            const { container } = render(
                <Banner
                    customFields={customFields}
                    globalContent={globalContent}
                />
            );
            expect(container.innerHTML).toStrictEqual(cabezalBanner);
        });
    });

    describe('setPrebidBanners function', () => {
        const config = {
            adhesion_dsk: {
                slotName: 'la_nacion_desktop/Nota/adhesion_dsk',
                dimensions: [
                    [728, 90],
                    [920, 100]
                ],
                targeting: defaultTargeting,
                closeButton: true
            }
        };

        it('should return config with prebid enabled using correct section', () => {
            expect(setPrebidBanners(config, 'propiedades')).toStrictEqual({
                prebid: {
                    enabled: true
                }
            });
        });

        it('should return config with prebid disabled', () => {
            expect(setPrebidBanners(config, 'economia')).toStrictEqual({
                prebid: {
                    enabled: false
                }
            });
        });
    });

    describe('parseDimensionsBanners', () => {
        it('should correctly parse a valid dimensions string', () => {
            const dimensionsString = '300x250,728x90,160x600';
            const expectedOutput = [
                [300, 250],
                [728, 90],
                [160, 600]
            ];
            expect(parseDimensionsBanners(dimensionsString)).toEqual(
                expectedOutput
            );
        });

        it('should return null when an empty string is provided', () => {
            const dimensionsString = '';
            expect(parseDimensionsBanners(dimensionsString)).toBeNull();
        });

        it('should handle a single dimension correctly', () => {
            const dimensionsString = '120x600';
            const expectedOutput = [[120, 600]];
            expect(parseDimensionsBanners(dimensionsString)).toEqual(
                expectedOutput
            );
        });
    });
});
