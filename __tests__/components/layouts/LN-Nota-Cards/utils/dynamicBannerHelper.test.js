import React from 'react';
import { render } from '@testing-library/react';
import {
    createDynamicBannerConfig,
    mapBannerConfigToGoogleTagConfig,
    getDynamicBannerSettings,
    validateBannerConfig,
    BannerWithWrapper
} from 'private/common/banners/dynamicBanners/dynamicBannersHelper';
import DivBannerSSR from 'private/common/banners/DivBannerSSR';
import Banner from 'features/ui/ln/banner/default';
import { OPINION } from 'private/common/utils/subtypes/subtypeHelper';

describe('Dynamic Banner Helper', () => {
    const mockGlobalContent = {
        _id: 'test-article-123',
        headlines: { basic: 'Test Article' },
        taxonomy: {
            primary_section: { _id: 'nota' }
        }
    };

    describe('createDynamicBannerConfig', () => {
        it('should not limit banners for opinion layout', () => {
            const opinionContent = {
                ...mockGlobalContent,
                subtype: OPINION
            };

            expect(
                createDynamicBannerConfig(
                    opinionContent,
                    'desktop',
                    4,
                    'LN-Nota-Opinion'
                )
            ).toBeDefined();
            expect(
                createDynamicBannerConfig(
                    opinionContent,
                    'desktop',
                    5,
                    'LN-Nota-Opinion'
                )
            ).toBeDefined();
            expect(
                createDynamicBannerConfig(
                    opinionContent,
                    'mobile',
                    20,
                    'LN-Nota-Opinion'
                ).elementId
            ).toBe('body_caja20_mob');
        });

        it('should use unique DOM ids for unlimited dynamic body banners', () => {
            const opinionContent = {
                ...mockGlobalContent,
                subtype: OPINION
            };
            const config = createDynamicBannerConfig(
                opinionContent,
                'mobile',
                5,
                'LN-Nota-Opinion'
            );
            const googleTagConfig = mapBannerConfigToGoogleTagConfig(config);

            expect(config.slotId).toBe('caja5_mob');
            expect(config.elementId).toBe('body_caja5_mob');
            expect(config.slotName).toBe('la_nacion_mobile/Nota/caja5_mob');
            expect(googleTagConfig.opt_div).toBe('body_caja5_mob');
            expect(googleTagConfig.adUnitPath).toBe(
                '/133919216/la_nacion_mobile/Nota/caja5_mob'
            );
        });

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

    describe('Banner snapshots', () => {
        const devices = ['desktop', 'mobile', 'tablet'];

        devices.forEach(device => {
            for (let i = 1; i <= 5; i++) {
                it(`renders ${device} banner index ${i} (slotId snapshot)`, () => {
                    const config = createDynamicBannerConfig(
                        mockGlobalContent,
                        device,
                        i
                    );
                    const { asFragment } = render(
                        <Banner bannerConfiguration={config} />
                    );
                    expect(asFragment()).toMatchSnapshot();
                });
            }
        });

        it('renders desktop banner with dark theme', () => {
            const config = {
                ...createDynamicBannerConfig(mockGlobalContent, 'desktop', 1),
                theme: 'dark'
            };
            const { container } = render(
                <Banner bannerConfiguration={config} />
            );
            expect(container).toMatchSnapshot();
        });
    });

    describe('Dynamic banner settings by subtype and layout', () => {
        it('returns BannerWithWrapper for opinion subtype', () => {
            const settings = getDynamicBannerSettings({
                subtype: OPINION,
                layout: 'LN-Nota-Opinion'
            });

            expect(settings.BannerComponent).toBe(BannerWithWrapper);
            expect(settings.maxBanners).toBeUndefined();
        });

        it('returns DivBannerSSR for non-opinion subtype', () => {
            const settings = getDynamicBannerSettings({
                subtype: '14',
                layout: 'LN-Nota-Cards'
            });

            expect(settings.BannerComponent).toBe(DivBannerSSR);
            expect(settings.maxBanners).toBe(5);
        });

        it('renders BannerWithWrapper for opinion subtype (snapshot)', () => {
            const config = createDynamicBannerConfig(
                mockGlobalContent,
                'desktop',
                1
            );
            const { asFragment } = render(
                <BannerWithWrapper bannerConfiguration={config} />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('renders DivBannerSSR for non-opinion subtype (snapshot)', () => {
            const config = createDynamicBannerConfig(
                mockGlobalContent,
                'desktop',
                1
            );
            const { asFragment } = render(
                <DivBannerSSR bannerConfiguration={config} />
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
