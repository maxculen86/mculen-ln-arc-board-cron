import React from 'react';
import DivBannerSSR from '../../../../../../components/private/common/banners/DivBannerSSR';
import {
    validateInterval,
    hasBomba,
    validateBanner,
    getSectionId,
    filterChildrenWithNoRoof,
    matchesEnabledDay
} from '../../../../../../components/private/common/banners/dynamicBanners/getDynamicBannersHelper';
import getRenderables from '../../../../../../__mocks__/data/renderables/banners/dynamicBannersRenderables';
import { getViewport } from '../../../../../../components/private/LN/common/utils/homeHelper';
import getChildrenFromSectionHome from '../../../../../../components/private/LN/common/utils/cajaTemasHelperLN10-WebApi';
import { isTodayEnabled } from '../../../../../../components/chains/LN10_Caja_Segmentada/_helpers';

jest.mock(
    '../../../../../../components/private/LN/common/utils/homeHelper',
    () => ({
        ...jest.requireActual(
            '../../../../../../components/private/LN/common/utils/homeHelper'
        ),
        getViewport: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Segmentada/_helpers',
    () => ({
        isTodayEnabled: jest.fn()
    })
);

describe('Components - private - common - banners - dynamicBanners - getDynamicBannersHelper', () => {
    describe('Function getSectionId', () => {
        it('should test getSectionId func', () => {
            expect(
                getSectionId(getRenderables(), 'f0fS1oFDXlHk93q')
            ).toStrictEqual(1);
        });

        it('should return undefined when the feature does not exist in any section', () => {
            const renderables = [
                {
                    collection: 'sections',
                    children: [
                        {
                            props: {
                                id: 'section1'
                            }
                        },
                        {
                            props: {
                                id: 'section2'
                            }
                        }
                    ]
                }
            ];
            const featureId = 'feature1';

            const result = getSectionId(renderables, featureId);

            expect(result).toBe(undefined);
        });

        it('should return undefined when no section contains the feature', () => {
            const renderables = [
                {
                    collection: 'sections',
                    children: [
                        {
                            props: {
                                id: 'section1'
                            }
                        },
                        {
                            props: {
                                id: 'section2'
                            }
                        }
                    ]
                }
            ];
            const featureId = 'feature3';

            const result = getSectionId(renderables, featureId);

            expect(result).toBeUndefined();
        });

        it('should return undefined when renderables is empty', () => {
            const renderables = [];
            const featureId = 'feature1';

            const result = getSectionId(renderables, featureId);

            expect(result).toBeUndefined();
        });

        it('should return undefined when no child has the specified featureId', () => {
            const renderables = [
                {
                    collection: 'sections',
                    children: [
                        {
                            props: {
                                id: 'section1'
                            }
                        },
                        {
                            props: {
                                id: 'section2'
                            }
                        }
                    ]
                }
            ];
            const featureId = 'feature3';

            const result = getSectionId(renderables, featureId);

            expect(result).toBeUndefined();
        });
    });

    describe('Function validateInterval', () => {
        it('should test validateInterval func', () => {
            expect(validateInterval(2, 0)).toStrictEqual(false);
            expect(validateInterval(2, 1)).toStrictEqual(true);
            expect(validateInterval(2, 2)).toStrictEqual(false);
            expect(validateInterval(3, 0)).toStrictEqual(false);
            expect(validateInterval(3, 1)).toStrictEqual(false);
            expect(validateInterval(3, 2)).toStrictEqual(true);
        });

        it('should return true when index + 1 is divisible by interval', () => {
            expect(validateInterval(2, 1)).toBe(true);
            expect(validateInterval(3, 2)).toBe(true);
            expect(validateInterval(4, 3)).toBe(true);
            expect(validateInterval(5, 4)).toBe(true);
        });

        it('should return false when index + 1 is not divisible by interval', () => {
            expect(validateInterval(2, 0)).toBe(false);
            expect(validateInterval(3, 0)).toBe(false);
            expect(validateInterval(4, 0)).toBe(false);
            expect(validateInterval(5, 0)).toBe(false);
        });

        it('should handle interval of 1 correctly', () => {
            expect(validateInterval(1, 0)).toBe(true);
            expect(validateInterval(1, 1)).toBe(true);
            expect(validateInterval(1, 2)).toBe(true);
            expect(validateInterval(1, 3)).toBe(true);
        });
    });

    describe('Function hasBomba', () => {
        it('should test hasBomba func', () => {
            expect(hasBomba(getRenderables())).toStrictEqual(true);
            expect(hasBomba(getRenderables(true))).toStrictEqual(false);
            expect(hasBomba([])).toStrictEqual(false);
        });

        it('should return false when renderables array is empty', () => {
            const renderables = [];

            expect(hasBomba(renderables)).toBe(false);
        });
    });

    describe('Function validateBanner', () => {
        it('should test validateBanner func', () => {
            expect(
                validateBanner(
                    1,
                    getRenderables(),
                    '',
                    {
                        position: 2,
                        max: 8,
                        min: 4,
                        bannersMob: ['caja3Mob', 'caja4Mob', 'caja5Mob'],
                        bannersDsk: ['billboard'],
                        intervalMob: 2,
                        intervalDsk: 3
                    },
                    0,
                    true
                )
            ).toStrictEqual(
                <DivBannerSSR
                    bannerConfiguration={{
                        isStatic: true,
                        lazyClass: 'lazy',
                        slotId: 'caja3_mob',
                        withoutHide: true
                    }}
                />
            );
            expect(
                validateBanner(
                    2,
                    getRenderables(),
                    '',
                    {
                        position: 2,
                        max: 8,
                        min: 4,
                        bannersMob: ['caja3Mob', 'caja4Mob', 'caja5Mob'],
                        bannersDsk: ['billboard'],
                        intervalMob: 2,
                        intervalDsk: 3
                    },
                    0
                )
            ).toStrictEqual(
                <DivBannerSSR
                    bannerConfiguration={{
                        classes: 'billboard_dsk',
                        isStatic: true,
                        lazyClass: 'lazy',
                        slotId: 'billboard_dsk',
                        withoutHide: true
                    }}
                />
            );
            expect(
                validateBanner(
                    1,
                    getRenderables(),
                    'Apertura',
                    {
                        position: 1,
                        bannersMob: ['caja1Mob'],
                        intervalMob: 2
                    },
                    0,
                    true
                )
            ).toStrictEqual(false);
        });

        it('should return undefined when validateInterval returns false for mobile', () => {
            const index = 1;
            const renderables = [];
            const sectionName = 'Apertura';
            const sectionValues = {
                intervalMob: 2,
                bannersMob: ['megatopDsk', 'megatopTab']
            };
            const currentBanner = 'megatopTab';
            const isMobile = true;

            const result = validateBanner(
                index,
                renderables,
                sectionName,
                sectionValues,
                currentBanner,
                isMobile
            );

            expect(result).toBeUndefined();
        });

        it('should return undefined when the current banner is not valid for mobile', () => {
            const index = 0;
            const renderables = [];
            const sectionName = 'Apertura';
            const sectionValues = {
                intervalMob: 1,
                bannersMob: ['megatopDsk', 'megatopTab']
            };
            const currentBanner = 'caja1Mob';
            const isMobile = true;

            const result = validateBanner(
                index,
                renderables,
                sectionName,
                sectionValues,
                currentBanner,
                isMobile
            );

            expect(result).toBeUndefined();
        });

        it('should return undefined when there is a bomba in renderables for mobile', () => {
            const index = 0;
            const renderables = ['bomba'];
            const sectionName = 'Apertura';
            const sectionValues = {
                intervalMob: 1,
                bannersMob: ['megatopDsk', 'megatopTab']
            };
            const currentBanner = 'megatopDsk';
            const isMobile = true;

            const result = validateBanner(
                index,
                renderables,
                sectionName,
                sectionValues,
                currentBanner,
                isMobile
            );

            expect(result).toBeUndefined();
        });

        it('should return undefined when validateInterval returns false for mobile', () => {
            const index = 1;
            const renderables = [];
            const sectionName = 'Apertura';
            const sectionValues = {
                intervalMob: 2,
                bannersMob: ['megatopDsk', 'megatopTab']
            };
            const currentBanner = 'megatopTab';
            const isMobile = true;

            const result = validateBanner(
                index,
                renderables,
                sectionName,
                sectionValues,
                currentBanner,
                isMobile
            );

            expect(result).toBeUndefined();
        });
    });

    describe('Function filterChildrenWithNoRoof', () => {
        it('should test filterChildrenWithNoRoof', () => {
            getViewport.mockReturnValueOnce({
                device: 'mobile'
            });
            expect(filterChildrenWithNoRoof(getRenderables())).toStrictEqual(
                getRenderables()
            );
            getViewport.mockReturnValueOnce({
                device: 'desktop'
            });
            expect(
                filterChildrenWithNoRoof(
                    getChildrenFromSectionHome(
                        getRenderables(),
                        'Breaking_1',
                        '3'
                    )
                )
            ).toStrictEqual(elementWithoutHideTitle);
        });

        it('should ignore LN10_Caja_Segmentada on desktop even if hideTitle is false', () => {
            getViewport.mockReturnValueOnce({ device: 'desktop' });

            const sectionChildren = [
                {
                    collection: 'chains',
                    type: 'LN10_Caja_Manual',
                    props: { customFields: { hideTitle: false } }
                },
                {
                    collection: 'chains',
                    type: 'LN10_Caja_Segmentada',
                    props: { customFields: { hideTitle: false } }
                },
                {
                    collection: 'chains',
                    type: 'LN10_Caja_Manual',
                    props: { customFields: { hideTitle: true } }
                }
            ];

            const result = filterChildrenWithNoRoof(sectionChildren);

            expect(result).toHaveLength(1);
            expect(result[0].type).toBe('LN10_Caja_Manual');
            expect(result[0].props.customFields.hideTitle).toBe(false);
        });

        it('should ignore LN10_Caja_Encuesta on desktop even if hideTitle is false', () => {
            getViewport.mockReturnValueOnce({ device: 'desktop' });

            const sectionChildren = [
                {
                    collection: 'chains',
                    type: 'LN10_Caja_Manual',
                    props: { customFields: { hideTitle: false } }
                },
                {
                    collection: 'chains',
                    type: 'LN10_Caja_Encuesta',
                    props: { customFields: { hideTitle: false } }
                },
                {
                    collection: 'chains',
                    type: 'LN10_Caja_Manual',
                    props: { customFields: { hideTitle: true } }
                }
            ];

            const result = filterChildrenWithNoRoof(sectionChildren);

            expect(result).toHaveLength(1);
            expect(result[0].type).toBe('LN10_Caja_Manual');
            expect(result[0].props.customFields.hideTitle).toBe(false);
        });

        it('should ignore LN10_Caja_Segmentada and LN10_Caja_Carrusel on desktop and mantain only visible and not excluded roofs', () => {
            getViewport.mockReturnValueOnce({ device: 'desktop' });

            const sectionChildren = [
                {
                    type: 'LN10_Caja_Manual',
                    props: { customFields: { hideTitle: false } }
                },
                {
                    type: 'LN10_Caja_Segmentada',
                    props: { customFields: { hideTitle: false } }
                },
                {
                    type: 'LN10_Caja_Carrusel',
                    props: { customFields: { hideTitle: false } }
                },
                {
                    type: 'LN10_Caja_Manual',
                    props: { customFields: { hideTitle: false } }
                },
                {
                    type: 'LN10_Caja_Manual',
                    props: { customFields: { hideTitle: true } }
                }
            ];

            const result = filterChildrenWithNoRoof(sectionChildren);

            expect(result).toHaveLength(2);
            expect(result.map(children => children.type)).toEqual([
                'LN10_Caja_Manual',
                'LN10_Caja_Manual'
            ]);
        });
    });

    describe('Function matchesEnabledDay', () => {
        beforeEach(() => jest.clearAllMocks());

        it('should return true when scheduling disabled (ignores days)', () => {
            const child = {
                props: {
                    customFields: {
                        shouldSchedule: false,
                        enabledDays: ['lunes']
                    }
                }
            };
            expect(matchesEnabledDay(child)).toBe(true);
            expect(isTodayEnabled).not.toHaveBeenCalled();
        });

        it('should return true when scheduling enabled and today is allowed', () => {
            isTodayEnabled.mockReturnValue(true);
            const child = {
                props: {
                    customFields: {
                        shouldSchedule: true,
                        enabledDays: ['sabado', 'domingo']
                    }
                }
            };
            expect(matchesEnabledDay(child)).toBe(true);
            expect(isTodayEnabled).toHaveBeenCalledWith(['sabado', 'domingo']);
        });

        it('should return false when scheduling enabled and today is NOT allowed', () => {
            isTodayEnabled.mockReturnValue(false);
            const child = {
                props: {
                    customFields: {
                        shouldSchedule: true,
                        enabledDays: ['lunes']
                    }
                }
            };
            expect(matchesEnabledDay(child)).toBe(false);
            expect(isTodayEnabled).toHaveBeenCalledWith(['lunes']);
        });

        it('should return false when scheduling enabled but enabledDays is empty', () => {
            const child = {
                props: {
                    customFields: { shouldSchedule: true, enabledDays: [] }
                }
            };
            expect(matchesEnabledDay(child)).toBe(false);
            expect(isTodayEnabled).not.toHaveBeenCalled();
        });

        it('should return true when scheduling disabled and enabledDays is empty', () => {
            const child = {
                props: {
                    customFields: { shouldSchedule: false, enabledDays: [] }
                }
            };
            expect(matchesEnabledDay(child)).toBe(true);
            expect(isTodayEnabled).not.toHaveBeenCalled();
        });

        it('should return true when scheduling disabled and enabledDays is undefined', () => {
            const child = {
                props: {
                    customFields: {}
                }
            };
            expect(matchesEnabledDay(child)).toBe(true);
            expect(isTodayEnabled).not.toHaveBeenCalled();
        });
    });
});

const elementWithoutHideTitle = [
    {
        children: [
            {
                collection: 'features',
                props: {
                    collection: 'features',
                    contentConfig: {
                        contentConfigValues: {},
                        contentService: '',
                        inherit: true
                    },
                    customFields: {
                        layout: 'grillaVideo1',
                        noteId: 'TZB4LFHEQVAANDWWQOH5FPJUBY'
                    },
                    displayProperties: {},
                    id: 'f0fM09sKP3loaEU',
                    localEdits: {},
                    name: null,
                    type: 'LN-common/articulo',
                    variants: {}
                },
                type: 'LN-common/articulo'
            }
        ],
        collection: 'chains',
        props: {
            collection: 'chains',
            customFields: {
                hideTitle: false,
                idCollection: '',
                imageId: '',
                initialPosition: 1,
                layout: 'grillaVideo1',
                title: 'Multimedia',
                url: ''
            },
            displayProperties: {},
            id: 'c0f33MAKOxlDyp',
            name: null,
            type: 'Ln_Caja_Manual'
        },
        type: 'Ln_Caja_Manual'
    },
    {
        collection: 'features',
        props: {
            collection: 'features',
            contentConfig: {
                contentConfigValues: {},
                contentService: '',
                inherit: true
            },
            customFields: {
                heightDesktop: 174,
                heightMobile: 236,
                heightTablet: 174,
                hideByUrl: true,
                html: '<style>iframe.iframe_anexoAnuario21{height:390px}@media(max-width:850px){iframe.iframe_anexoAnuario21{height:360px}}@media(max-width:700px){iframe.iframe_anexoAnuario21{height:345px}}@media(max-width:650px){iframe.iframe_anexoAnuario21{height:535px}}@media(max-width:550px){iframe.iframe_anexoAnuario21{height:840px}}@media(max-width:450px){iframe.iframe_anexoAnuario21{height:770px}}@media(max-width:400px){iframe.iframe_anexoAnuario21{height:745px}}@media(max-width:350px){iframe.iframe_anexoAnuario21{height:690px}}</style> <iframe class="iframe_anexoAnuario21" frameborder="0" width="100%" height="390" scrolling="no" src="https://especialess3.lanacion.com.ar/21/11/anexo-anuario-2021/"></iframe>',
                url: 'https://especialess3.lanacion.com.ar/interactivos/22/08/anexos-calculadora-mundial-2022-v07/?v=13'
            },
            displayProperties: {},
            id: 'f0f7L1jCKXiv19v',
            localEdits: {},
            name: null,
            type: 'LN-common/anexo',
            variants: {}
        },
        type: 'LN-common/anexo'
    }
];
