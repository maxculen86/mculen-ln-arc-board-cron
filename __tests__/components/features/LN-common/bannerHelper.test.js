import {
    getBannerConfigFromSiteService,
    getBannerSectionDimensions,
    setPrebidBanners,
    getDimsFromSiteService,
    getBannerConfiguration,
    queueGoogletagCommand,
    changeSegmentAdUnit,
    setCustomAdUnit,
    shouldHideBannerForSubscriberOnlyContent
} from '../../../../components/private/LN/common/utils/bannerHelper';

jest.mock(
    '../../../../components/private/LN/common/utils/bannerHelper',
    () => ({
        ...jest.requireActual(
            '../../../../components/private/LN/common/utils/bannerHelper'
        ),
        setPrebidBanners: jest.fn()
    })
);

global.googletag = {
    cmd: {
        push: jest.fn(callback => callback())
    },
    defineSlot: jest.fn(() => ({
        addService: jest.fn(() => ({
            setTargeting: jest.fn()
        }))
    })),
    pubads: jest.fn(() => ({
        refresh: jest.fn(),
        addEventListener: jest.fn()
    }))
};

global.pbjs = {
    adserverRequestSent: false,
    adserverCalled: false,
    que: {
        push: jest.fn(callback => callback())
    },
    rp: {
        requestBids: jest.fn(({ callback }) => callback([]))
    }
};

global.apstag = {
    fetchBids: jest.fn((slots, callback) => callback([])),
    setDisplayBids: jest.fn()
};

global.navigator = {
    userAgent: 'some user agent string'
};

const bannersToLoad = [
    {
        adUnitPath: '/some/ad/unit/path',
        size: [[300, 250]],
        opt_div: 'banner1',
        customTargeting: { key1: 'value1' },
        prebidEnabled: true,
        withoutHide: false
    },
    {
        adUnitPath: '/some/ad/unit/path2',
        size: [[728, 90]],
        opt_div: 'banner2',
        customTargeting: {},
        prebidEnabled: false,
        withoutHide: true
    }
];

describe('common - utils - bannerHelper', () => {
    describe('getBannerConfigFromSiteService', () => {
        const mock = {
            bannersSiteConfig: [
                {
                    adunit: 'nota_caja1_dsk',
                    dimensions: '350x700,260x500,100x600'
                },
                {
                    adunit: 'nota_caja1_mob',
                    dimensions: null
                },
                {
                    adunit: 'nota_caja1_tab',
                    dimensions: null
                },
                {
                    adunit: 'nota_caja2_dsk',
                    dimensions: null
                }
            ],
            bannerConfiguration: {
                dimensions: [
                    [300, 250],
                    [120, 600]
                ]
            },
            slotGroup: 'nota',
            slotId: 'caja1_dsk',
            section: 'propiedades'
        };

        it('should return default dimensions when section is "propiedades" and slotName is "nota_caja1_dsk"', () => {
            const result = getBannerConfigFromSiteService({
                ...mock,
                bannersSiteConfig: null
            });

            expect(result.dimensions).toEqual([
                [300, 250],
                [300, 600],
                [120, 600],
                [160, 600],
                [300, 450]
            ]);
        });

        it('should return dimensions from getDimsFromSiteService if bannersSiteConfig is provided', () => {
            const result = getBannerConfigFromSiteService(mock);

            expect(result.dimensions).toEqual([
                [300, 250],
                [300, 600],
                [120, 600],
                [160, 600],
                [300, 450]
            ]);
        });

        it('should return bannerConfiguration.dimensions when section is not "propiedades" or "campo"', () => {
            const bannerConfiguration = {
                dimensions: [
                    [300, 250],
                    [120, 600]
                ]
            };
            const result = getBannerConfigFromSiteService({
                bannersSiteConfig: null,
                bannerConfiguration,
                slotGroup: 'nota',
                slotId: 'caja1_dsk',
                section: 'deportes'
            });

            expect(result.dimensions).toEqual([
                [300, 250],
                [120, 600]
            ]);
        });

        it('should handle case when bannersSiteConfig is null and section is "campo"', () => {
            const result = getBannerConfigFromSiteService({
                bannersSiteConfig: null,
                bannerConfiguration: {
                    dimensions: [
                        [300, 250],
                        [120, 600]
                    ]
                },
                slotGroup: 'acumulado',
                slotId: 'caja1_dsk',
                section: 'campo'
            });

            expect(result.dimensions).toEqual([
                [300, 250],
                [300, 600]
            ]);
            expect(setPrebidBanners).not.toHaveBeenCalled();
        });
    });

    describe('getBannerSectionDimensions', () => {
        it('should return the correct dimensions for section "propiedades" and slot "nota_caja1_dsk"', () => {
            const result = getBannerSectionDimensions(
                'propiedades',
                'nota_caja1_dsk'
            );
            expect(result).toBe('300x250,300x600,120x600,160x600,300x450');
        });

        it('should return the correct dimensions for section "propiedades" and slot "acumulado_caja1_dsk"', () => {
            const result = getBannerSectionDimensions(
                'propiedades',
                'acumulado_caja1_dsk'
            );
            expect(result).toBe('300x250,300x600');
        });

        it('should return undefined for an other slot in a propiedades section', () => {
            const result = getBannerSectionDimensions(
                'propiedades',
                'nota_caja2_mob'
            );
            expect(result).toBeUndefined();
        });

        it('should return undefined for an economia section', () => {
            const result = getBannerSectionDimensions(
                'economia',
                'nota_caja1_dsk'
            );
            expect(result).toBeUndefined();
        });

        it('should return the correct dimensions for section "campo" and slot "nota_caja1_dsk"', () => {
            const result = getBannerSectionDimensions(
                'campo',
                'nota_caja1_dsk'
            );
            expect(result).toBe('300x250,300x600,120x600,160x600,300x450');
        });

        it('should return the correct dimensions for section "campo" and slot "acumulado_caja1_dsk"', () => {
            const result = getBannerSectionDimensions(
                'campo',
                'acumulado_caja1_dsk'
            );
            expect(result).toBe('300x250,300x600');
        });
    });

    describe('getBannerConfiguration', () => {
        expect(getBannerConfiguration({}, {}, {}, {})).toEqual(null);
    });

    describe('getDimsFromSiteService', () => {
        it('should return null from getDimsFromSiteService if there is no config or slot name', () => {
            expect(getDimsFromSiteService(null, 'nota_caja1_dsk')).toEqual(
                null
            );
            expect(getDimsFromSiteService([], null)).toEqual(null);
        });

        it('should return null from getDimsFromSiteService if there is no position, or dimensions or ""', () => {
            expect(
                getDimsFromSiteService(
                    [
                        {
                            adunit: 'nota_caja1_dsk',
                            dimensions: '350x700,260x500,100x600'
                        }
                    ],
                    'nota_caja2_dsk'
                )
            ).toEqual(null);
            expect(
                getDimsFromSiteService(
                    [
                        {
                            adunit: 'nota_caja1_dsk',
                            dimensions: null
                        }
                    ],
                    'nota_caja1_dsk'
                )
            ).toEqual(null);
            expect(
                getDimsFromSiteService(
                    [
                        {
                            adunit: 'nota_caja1_dsk',
                            dimensions: ''
                        }
                    ],
                    'nota_caja1_dsk'
                )
            ).toEqual(null);
        });
    });

    describe('queueGoogletagCommand', () => {
        it('should correctly define header bidding slots and call ad server', () => {
            queueGoogletagCommand(bannersToLoad);

            expect(googletag.cmd.push).toHaveBeenCalled();
            expect(googletag.defineSlot).toHaveBeenCalledTimes(2);
            expect(apstag.fetchBids).toHaveBeenCalled();
            expect(pbjs.rp.requestBids).toHaveBeenCalled();
            expect(apstag.setDisplayBids).toHaveBeenCalled();
        });

        it('should trigger the fallback if prebid takes too long', () => {
            jest.useFakeTimers();
            queueGoogletagCommand(bannersToLoad);

            jest.runAllTimers();
            expect(pbjs.adserverCalled).toBe(true);
        });
    });

    describe('changeSegmentAdUnit', () => {
        it('should replace the first part of the slotName with section and device', () => {
            const section = 'sports';
            const device = 'mobile';
            const slotName = '/someSection/ad/unit/path2';

            const result = changeSegmentAdUnit(section, device, slotName);

            expect(result).toBe('/sports_mobile/ad/unit/path2');
        });
    });

    describe('setCustomAdUnit', () => {
        it('should replace the middle part of the slotName with the unit', () => {
            const slotName = '/123456/old_section/slotName';
            const unit = 'new_section';

            const result = setCustomAdUnit(slotName, unit);

            expect(result).toBe('/123456/new_section/slotName');
        });

        it('should return the original slotName if there are fewer than 3 sections', () => {
            const slotName = '/123456/slotName';
            const unit = 'new_section';

            const result = setCustomAdUnit(slotName, unit);

            expect(result).toBe('new_section/123456/slotName');
        });

        it('should handle an empty slotName', () => {
            const result = setCustomAdUnit('', 'new_section');
            expect(result).toBe('new_section');
        });
    });

    describe('shouldHideBannerForSubscriberOnlyContent', () => {
        it('should return true when soloNoSuscriptores is true and subscription is "S"', () => {
            const result = shouldHideBannerForSubscriberOnlyContent(true, {
                subscription: 'S'
            });
            expect(result).toBe(true);
        });
    });
});
