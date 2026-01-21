import {
    createDynamicBannerConfig,
    validateBannerConfig
} from 'private/common/banners/dynamicBanners/dynamicBannersHelper';

describe('Dynamic Banner Helper', () => {
    const mockGlobalContent = {
        _id: 'test-article-123',
        headlines: { basic: 'Test Article' },
        taxonomy: {
            primary_section: { _id: 'nota' }
        }
    };

    describe('createDynamicBannerConfig', () => {
        it('should create desktop cinturon banner configuration', () => {
            const config = createDynamicBannerConfig(
                mockGlobalContent,
                'desktop',
                1
            );

            expect(config).toBeDefined();
            expect(config.slotId).toBe('cinturon1_dsk');
            expect(config.slotName).toBe(
                'la_nacion_desktop/Nota/cinturon1_dsk'
            );
            expect(config.device).toBe('desktop');
            expect(config.slotGroup).toBe('nota');
            expect(config.targeting).toEqual({
                sitio: 'lanacion',
                seccion: 'nota'
            });
            expect(config.dimensions).toBeDefined();
            expect(Array.isArray(config.dimensions)).toBe(true);
        });

        it('should create mobile caja banner configuration', () => {
            const config = createDynamicBannerConfig(
                mockGlobalContent,
                'mobile',
                2
            );

            expect(config).toBeDefined();
            expect(config.slotId).toBe('caja2_mob');
            expect(config.slotName).toBe('la_nacion_mobile/Nota/caja2_mob');
            expect(config.device).toBe('mobile');
            expect(config.withoutHide).toBe(true);
            expect(config.bidding.prebid.enabled).toBe(true);
        });

        it('should create tablet caja banner configuration', () => {
            const config = createDynamicBannerConfig(
                mockGlobalContent,
                'tablet',
                3
            );

            expect(config).toBeDefined();
            expect(config.slotId).toBe('caja3_tab');
            expect(config.slotName).toBe('la_nacion_tablet/Nota/caja3_tab');
            expect(config.device).toBe('tablet');
        });

        it('should return null for invalid parameters', () => {
            expect(createDynamicBannerConfig(null, 'desktop', 1)).toBeNull();
            expect(
                createDynamicBannerConfig(mockGlobalContent, null, 1)
            ).toBeNull();
            expect(
                createDynamicBannerConfig(mockGlobalContent, 'desktop', null)
            ).toBeNull();
            expect(
                createDynamicBannerConfig(mockGlobalContent, 'invalid', 1)
            ).toBeNull();
        });

        it('should return null for banner index greater than 5', () => {
            const config = createDynamicBannerConfig(
                mockGlobalContent,
                'desktop',
                6
            );
            expect(config).toBeNull();
        });

        it('should handle different banner indices correctly', () => {
            for (let i = 1; i <= 5; i++) {
                const config = createDynamicBannerConfig(
                    mockGlobalContent,
                    'desktop',
                    i
                );
                expect(config).toBeDefined();
                expect(config.slotId).toBe(`cinturon${i}_dsk`);
            }
        });
    });

    describe('validateBannerConfig', () => {
        it('should validate complete banner configuration', () => {
            const validConfig = {
                slotId: 'cinturon1_dsk',
                slotGroup: 'nota',
                device: 'desktop',
                dfpId: 133919216,
                slotName: 'la_nacion_desktop/Nota/cinturon1_dsk',
                targeting: { sitio: 'lanacion', seccion: 'nota' },
                dimensions: [[728, 90]]
            };

            expect(validateBannerConfig(validConfig)).toBe(true);
        });

        it('should reject incomplete banner configuration', () => {
            const incompleteConfig = {
                slotId: 'cinturon1_dsk',
                device: 'desktop'
            };

            expect(validateBannerConfig(incompleteConfig)).toBe(false);
        });

        it('should reject null or undefined configuration', () => {
            expect(validateBannerConfig(null)).toBe(false);
            expect(validateBannerConfig(undefined)).toBe(false);
        });
    });

    describe('Banner naming patterns', () => {
        it('should follow correct naming patterns for all devices', () => {
            const devices = ['desktop', 'mobile', 'tablet'];
            const expectedPatterns = {
                desktop: i => `cinturon${i}_dsk`,
                mobile: i => `caja${i}_mob`,
                tablet: i => `caja${i}_tab`
            };

            devices.forEach(device => {
                for (let i = 1; i <= 5; i++) {
                    const config = createDynamicBannerConfig(
                        mockGlobalContent,
                        device,
                        i
                    );
                    expect(config.slotId).toBe(expectedPatterns[device](i));
                }
            });
        });
    });

    describe('Banner dimensions', () => {
        it('should have appropriate dimensions for each device type', () => {
            const desktopConfig = createDynamicBannerConfig(
                mockGlobalContent,
                'desktop',
                1
            );
            const mobileConfig = createDynamicBannerConfig(
                mockGlobalContent,
                'mobile',
                1
            );
            const tabletConfig = createDynamicBannerConfig(
                mockGlobalContent,
                'tablet',
                1
            );

            expect(desktopConfig.dimensions).toContainEqual([728, 90]);
            expect(desktopConfig.dimensions).toContainEqual([920, 100]);

            expect(mobileConfig.dimensions).toContainEqual([300, 450]);
            expect(mobileConfig.dimensions).toContainEqual([320, 450]);
            expect(mobileConfig.dimensions).toContainEqual([300, 250]);
            expect(mobileConfig.dimensions).toContainEqual([320, 100]);

            expect(tabletConfig.dimensions).toContainEqual([300, 250]);
        });
    });
});
