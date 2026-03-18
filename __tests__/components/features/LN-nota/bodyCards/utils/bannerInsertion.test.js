import React from 'react';
import {
    insertBannersIntoCards,
    createRenderConfig,
    createBannerElement,
    createCardElement
} from 'features/LN-nota/bodyCards/utils/bannerInsertion';
import { buildGoogleTagBannerConfig } from 'private/common/banners/dynamicBanners/dynamicBannersHelper';

// Test constants
const DESKTOP_DEVICE = 'desktop';
const MOBILE_DEVICE = 'mobile';

jest.mock('private/common/banners/dynamicBanners/dynamicBannersHelper', () => {
    const actual = jest.requireActual(
        'private/common/banners/dynamicBanners/dynamicBannersHelper'
    );
    const createDynamicBannerConfig = jest.fn(() => ({
        slotId: 'test_slot',
        slotGroup: 'nota',
        dfpId: '133919216',
        slotName: 'la_nacion_desktop/Nota/test_slot',
        targeting: { sitio: 'lanacion', seccion: 'nota' },
        dimensions: [[300, 250]],
        withoutHide: true,
        bidding: { prebid: { enabled: true } },
        hideForSubscriptor: false
    }));

    return {
        ...actual,
        renderDynamicBanner: jest.fn(),
        MAX_DYNAMIC_BANNERS: 5,
        BANNER_INSERT_INTERVAL: 4,
        SUPPORTED_DEVICES: ['desktop', 'mobile'],
        createDynamicBannerConfig,
        buildGoogleTagBannerConfig: (device, bannerIndex, globalContent) => {
            const bannerConfiguration = createDynamicBannerConfig(
                globalContent,
                device,
                bannerIndex
            );

            return bannerConfiguration
                ? actual.mapBannerConfigToGoogleTagConfig(bannerConfiguration)
                : null;
        }
    };
});

describe('Banner Insertion Utilities', () => {
    const mockGlobalContent = { _id: 'test-content' };
    const mockRenderExpandedCard = jest.fn((_, index) => `Card-${index}`);
    const mockBanners = [];
    const mockOutputType = 'default';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createRenderConfig', () => {
        it('should create render configuration object with provided parameters', () => {
            const config = createRenderConfig(
                mockRenderExpandedCard,
                mockOutputType
            );

            expect(config).toEqual({
                renderExpandedCard: mockRenderExpandedCard,
                outputType: mockOutputType
            });
        });
    });

    describe('buildGoogleTagBannerConfig', () => {
        it('should build correct Google Tag config from dynamic banner config', () => {
            const result = buildGoogleTagBannerConfig(
                DESKTOP_DEVICE,
                1,
                mockGlobalContent
            );

            expect(result).toEqual({
                adUnitPath: '/133919216/la_nacion_desktop/Nota/test_slot',
                size: [[300, 250]],
                opt_div: 'test_slot',
                sizemap: [],
                prebidEnabled: true,
                targeting: { sitio: 'lanacion', seccion: 'nota' },
                slotGroup: 'nota',
                hideForSubscriptor: false,
                withoutHide: true,
                customTargeting: {}
            });
        });

        it('should return null when createDynamicBannerConfig returns null', () => {
            const {
                createDynamicBannerConfig
            } = require('private/common/banners/dynamicBanners/dynamicBannersHelper');
            createDynamicBannerConfig.mockReturnValueOnce(null);

            const result = buildGoogleTagBannerConfig(
                DESKTOP_DEVICE,
                1,
                mockGlobalContent
            );

            expect(result).toBeNull();
        });

        it('should handle missing bidding config gracefully', () => {
            const {
                createDynamicBannerConfig
            } = require('private/common/banners/dynamicBanners/dynamicBannersHelper');
            createDynamicBannerConfig.mockReturnValueOnce({
                slotId: 'test_slot',
                slotGroup: 'nota',
                dfpId: '133919216',
                slotName: 'la_nacion_desktop/Nota/test_slot',
                targeting: { sitio: 'lanacion', seccion: 'nota' },
                dimensions: [[300, 250]],
                withoutHide: true,
                bidding: null,
                hideForSubscriptor: false
            });

            const result = buildGoogleTagBannerConfig(
                DESKTOP_DEVICE,
                1,
                mockGlobalContent
            );

            expect(result.prebidEnabled).toBe(false);
        });
    });

    describe('createCardElement', () => {
        it('should create card element with card id as key and render with all parameters', () => {
            const cardGroup = { id: 'card-1' };
            const element = createCardElement(
                cardGroup,
                0,
                mockRenderExpandedCard,
                mockOutputType,
                mockGlobalContent
            );

            expect(element.key).toBe('card-1');
            expect(mockRenderExpandedCard).toHaveBeenCalledWith(
                cardGroup,
                0,
                mockOutputType,
                mockGlobalContent,
                'expanded'
            );
        });
    });

    describe('createBannerElement', () => {
        it('should create banner element with correct props and key', () => {
            const {
                renderDynamicBanner
            } = require('private/common/banners/dynamicBanners/dynamicBannersHelper');
            renderDynamicBanner.mockReturnValue(<div>Mock Banner</div>);

            const bannerResult = createBannerElement(
                mockGlobalContent,
                DESKTOP_DEVICE,
                1,
                3
            );

            expect(renderDynamicBanner).toHaveBeenCalledWith(
                mockGlobalContent,
                DESKTOP_DEVICE,
                1,
                'dynamic-banner-desktop-1-3'
            );
            expect(bannerResult.bannerElement.key).toBe(
                'dynamic-banner-desktop-1-3'
            );
            expect(bannerResult.bannerConfig).toBeDefined();
            expect(bannerResult.bannerConfig.adUnitPath).toContain('133919216');
        });

        it('should return null when banner render function returns null', () => {
            const {
                renderDynamicBanner
            } = require('private/common/banners/dynamicBanners/dynamicBannersHelper');
            renderDynamicBanner.mockReturnValue(null);

            const bannerElement = createBannerElement(
                mockGlobalContent,
                DESKTOP_DEVICE,
                1,
                3
            );

            expect(bannerElement).toBeNull();
        });

        it('should return null when buildGoogleTagBannerConfig returns null', () => {
            const {
                renderDynamicBanner,
                createDynamicBannerConfig
            } = require('private/common/banners/dynamicBanners/dynamicBannersHelper');
            renderDynamicBanner.mockReturnValue(<div>Mock Banner</div>);
            createDynamicBannerConfig.mockReturnValueOnce(null);

            const bannerResult = createBannerElement(
                mockGlobalContent,
                DESKTOP_DEVICE,
                1,
                3
            );

            expect(bannerResult).toBeNull();
        });
    });

    describe('insertBannersIntoCards', () => {
        const EIGHT_CARD_GROUPS = [
            { id: 'card-1' },
            { id: 'card-2' },
            { id: 'card-3' },
            { id: 'card-4' },
            { id: 'card-5' },
            { id: 'card-6' },
            { id: 'card-7' },
            { id: 'card-8' }
        ];

        const EXPECTED_TOTAL_ELEMENTS_WITH_BANNERS = 12;
        const EXPECTED_BANNER_COUNT = 4;
        const EXPECTED_CARD_RENDER_COUNT = 8;
        const FIRST_DESKTOP_BANNER_CALL_PARAMETERS = [
            mockGlobalContent,
            DESKTOP_DEVICE,
            1,
            'dynamic-banner-desktop-1-3'
        ];
        const FIRST_MOBILE_BANNER_CALL_PARAMETERS = [
            mockGlobalContent,
            MOBILE_DEVICE,
            1,
            'dynamic-banner-mobile-1-3'
        ];
        const SECOND_DESKTOP_BANNER_CALL_PARAMETERS = [
            mockGlobalContent,
            DESKTOP_DEVICE,
            2,
            'dynamic-banner-desktop-2-7'
        ];
        const SECOND_MOBILE_BANNER_CALL_PARAMETERS = [
            mockGlobalContent,
            MOBILE_DEVICE,
            2,
            'dynamic-banner-mobile-2-7'
        ];

        const renderConfig = {
            renderExpandedCard: mockRenderExpandedCard,
            outputType: mockOutputType
        };

        it('should insert two banners at fourth and eighth card positions', () => {
            const {
                renderDynamicBanner
            } = require('private/common/banners/dynamicBanners/dynamicBannersHelper');
            renderDynamicBanner.mockReturnValue(<div>Mock Banner</div>);

            const result = insertBannersIntoCards(
                EIGHT_CARD_GROUPS,
                mockGlobalContent,
                renderConfig,
                DESKTOP_DEVICE
            );

            expect(result.elements).toHaveLength(
                EXPECTED_TOTAL_ELEMENTS_WITH_BANNERS
            );
            expect(mockRenderExpandedCard).toHaveBeenCalledTimes(
                EXPECTED_CARD_RENDER_COUNT
            );
            expect(renderDynamicBanner).toHaveBeenCalledTimes(
                EXPECTED_BANNER_COUNT
            );
            expect(renderDynamicBanner).toHaveBeenNthCalledWith(
                1,
                ...FIRST_DESKTOP_BANNER_CALL_PARAMETERS
            );
            expect(renderDynamicBanner).toHaveBeenNthCalledWith(
                2,
                ...FIRST_MOBILE_BANNER_CALL_PARAMETERS
            );
            expect(renderDynamicBanner).toHaveBeenNthCalledWith(
                3,
                ...SECOND_DESKTOP_BANNER_CALL_PARAMETERS
            );
            expect(renderDynamicBanner).toHaveBeenNthCalledWith(
                4,
                ...SECOND_MOBILE_BANNER_CALL_PARAMETERS
            );
        });

        it('should return empty array when no card groups provided', () => {
            const emptyCardGroups = [];
            const result = insertBannersIntoCards(
                emptyCardGroups,
                mockGlobalContent,
                renderConfig,
                DESKTOP_DEVICE
            );

            expect(result.elements).toHaveLength(0);
            expect(result.googleTagConfigs).toHaveLength(0);
        });

        it('should render only cards when insufficient cards for banner insertion', () => {
            const INSUFFICIENT_CARDS_FOR_BANNERS = [
                { id: 'card-1' },
                { id: 'card-2' }
            ];
            const EXPECTED_CARD_COUNT = 2;

            const result = insertBannersIntoCards(
                INSUFFICIENT_CARDS_FOR_BANNERS,
                mockGlobalContent,
                renderConfig,
                DESKTOP_DEVICE
            );

            expect(result.elements).toHaveLength(EXPECTED_CARD_COUNT);
            expect(mockRenderExpandedCard).toHaveBeenCalledTimes(
                EXPECTED_CARD_COUNT
            );
        });

        it('should only include Google Tag configs for current device', () => {
            const {
                renderDynamicBanner
            } = require('private/common/banners/dynamicBanners/dynamicBannersHelper');
            renderDynamicBanner.mockReturnValue(<div>Mock Banner</div>);

            const EIGHT_CARD_GROUPS = Array.from({ length: 8 }, (_, i) => ({
                id: `card-${i + 1}`
            }));
            const EXPECTED_ELEMENTS_COUNT = 12;
            const EXPECTED_CONFIGS_PER_DEVICE = 2;

            const desktopResult = insertBannersIntoCards(
                EIGHT_CARD_GROUPS,
                mockGlobalContent,
                renderConfig,
                DESKTOP_DEVICE
            );

            const mobileResult = insertBannersIntoCards(
                EIGHT_CARD_GROUPS,
                mockGlobalContent,
                renderConfig,
                MOBILE_DEVICE
            );

            expect(desktopResult.elements).toHaveLength(
                EXPECTED_ELEMENTS_COUNT
            );
            expect(mobileResult.elements).toHaveLength(EXPECTED_ELEMENTS_COUNT);

            expect(desktopResult.googleTagConfigs).toHaveLength(
                EXPECTED_CONFIGS_PER_DEVICE
            );
            expect(mobileResult.googleTagConfigs).toHaveLength(
                EXPECTED_CONFIGS_PER_DEVICE
            );

            expect(desktopResult.googleTagConfigs[0]).toHaveProperty(
                'adUnitPath'
            );
            expect(mobileResult.googleTagConfigs[0]).toHaveProperty(
                'adUnitPath'
            );
        });

        it('should return empty Google Tag configs when current device not in supported devices', () => {
            const {
                renderDynamicBanner
            } = require('private/common/banners/dynamicBanners/dynamicBannersHelper');
            renderDynamicBanner.mockReturnValue(<div>Mock Banner</div>);

            const EIGHT_CARD_GROUPS = Array.from({ length: 8 }, (_, i) => ({
                id: `card-${i + 1}`
            }));
            const EXPECTED_ELEMENTS_COUNT = 12;
            const EXPECTED_CONFIGS_COUNT = 0;

            const tabletResult = insertBannersIntoCards(
                EIGHT_CARD_GROUPS,
                mockGlobalContent,
                renderConfig,
                'tablet'
            );

            expect(tabletResult.elements).toHaveLength(EXPECTED_ELEMENTS_COUNT);
            expect(tabletResult.googleTagConfigs).toHaveLength(
                EXPECTED_CONFIGS_COUNT
            );
        });
    });
});
