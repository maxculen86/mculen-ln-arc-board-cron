import {
    getBannerConfigFromSiteService,
    getBannerSectionDimensions,
    setPrebidBanners
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
                [160, 600]
            ]);
        });

        it('should return dimensions from getDimsFromSiteService if bannersSiteConfig is provided', () => {
            const result = getBannerConfigFromSiteService(mock);

            expect(result.dimensions).toEqual([
                [300, 250],
                [300, 600],
                [120, 600],
                [160, 600]
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
            expect(result).toBe('300x250,300x600,120x600,160x600');
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
            expect(result).toBe('300x250,300x600,120x600,160x600');
        });

        it('should return the correct dimensions for section "campo" and slot "acumulado_caja1_dsk"', () => {
            const result = getBannerSectionDimensions(
                'campo',
                'acumulado_caja1_dsk'
            );
            expect(result).toBe('300x250,300x600');
        });
    });
});
