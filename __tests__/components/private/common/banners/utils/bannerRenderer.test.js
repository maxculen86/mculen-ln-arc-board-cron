import React from 'react';
import {
    renderSingleBanner,
    renderBanner,
    generateBannersObject
} from '../../../../../../components/private/common/banners/utils/bannerRenderer';
import DivBannerSSR from '../../../../../../components/private/common/banners/DivBannerSSR';

describe('bannerRenderer - renderSingleBanner', () => {
    it('should render a simple banner correctly', () => {
        const config = {
            slotId: 'test_slot',
            classes: '--test-class',
            isStatic: true
        };

        const result = renderSingleBanner(config);

        expect(result).toBeDefined();
        expect(result.type).toBe(DivBannerSSR);
        expect(result.key).toBe('test_slot');
        expect(result.props.bannerConfiguration).toEqual({
            slotId: 'test_slot',
            classes: '--test-class',
            isStatic: true
        });
    });

    it('should handle banner with all props', () => {
        const config = {
            slotId: 'test_slot',
            classes: '--test',
            isStatic: true,
            closeButton: true,
            hideForSubscriptor: true,
            withoutHide: true,
            lazyClass: 'lazy'
        };

        const result = renderSingleBanner(config);

        expect(result.props.bannerConfiguration).toEqual(config);
    });

    it('should return null and log error if slotId is missing', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const config = {
            classes: '--test'
        };

        const result = renderSingleBanner(config);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith(
            'Banner configuration missing required slotId:',
            config
        );

        consoleSpy.mockRestore();
    });

    it('should use slotId as React key', () => {
        const config = {
            slotId: 'my_unique_slot'
        };

        const result = renderSingleBanner(config);

        expect(result.key).toBe('my_unique_slot');
    });
});

describe('bannerRenderer - renderBanner', () => {
    describe('Individual banners', () => {
        it('should render individual banner', () => {
            const config = {
                key: 'testBanner',
                slotId: 'test_slot',
                classes: '--test'
            };

            const result = renderBanner(config);

            expect(result).toBeDefined();
            expect(result.type).toBe(DivBannerSSR);
            expect(result.key).toBe('test_slot');
        });

        it('should return null if key is missing', () => {
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();
            const config = {
                slotId: 'test_slot'
            };

            const result = renderBanner(config);

            expect(result).toBeNull();
            expect(consoleSpy).toHaveBeenCalled();

            consoleSpy.mockRestore();
        });
    });

    describe('Groups with Fragment', () => {
        it('should render group with Fragment', () => {
            const config = {
                key: 'testGroup',
                isGroup: true,
                banners: [
                    { slotId: 'slot1', isStatic: true },
                    { slotId: 'slot2', isStatic: true }
                ]
            };

            const result = renderBanner(config);

            expect(result).toBeDefined();
            expect(result.type).toBe(React.Fragment);
            expect(result.key).toBe('testGroup');
            expect(result.props.children).toHaveLength(2);
        });

        it('should return null if banners array is invalid', () => {
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();
            const config = {
                key: 'testGroup',
                isGroup: true,
                banners: 'not-an-array'
            };

            const result = renderBanner(config);

            expect(result).toBeNull();
            expect(consoleSpy).toHaveBeenCalled();

            consoleSpy.mockRestore();
        });

        it('should render each banner in the group', () => {
            const config = {
                key: 'testGroup',
                isGroup: true,
                banners: [
                    { slotId: 'slot1', classes: '--class1' },
                    { slotId: 'slot2', classes: '--class2' }
                ]
            };

            const result = renderBanner(config);
            const children = result.props.children;

            expect(children[0].type).toBe(DivBannerSSR);
            expect(children[0].props.bannerConfiguration.slotId).toBe('slot1');
            expect(children[1].type).toBe(DivBannerSSR);
            expect(children[1].props.bannerConfiguration.slotId).toBe('slot2');
        });
    });

    describe('Groups with custom wrapper', () => {
        it('should render group with custom wrapper', () => {
            const config = {
                key: 'testGroup',
                isGroup: true,
                customWrapper: 'container --ads',
                banners: [
                    { slotId: 'slot1', classes: '--dark' },
                    { slotId: 'slot2', classes: '--dark' }
                ]
            };

            const result = renderBanner(config);

            expect(result).toBeDefined();
            expect(result.type).toBe('div');
            expect(result.props.className).toBe('container --ads');
            expect(result.key).toBe('testGroup');
            expect(result.props.children).toHaveLength(2);
        });

        it('should return null if banners array is missing', () => {
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation();
            const config = {
                key: 'testGroup',
                isGroup: true,
                customWrapper: 'container'
            };

            const result = renderBanner(config);

            expect(result).toBeNull();
            expect(consoleSpy).toHaveBeenCalled();

            consoleSpy.mockRestore();
        });
    });
});

describe('bannerRenderer - generateBannersObject', () => {
    it('should generate object from array of configs', () => {
        const configs = [
            { key: 'banner1', slotId: 'slot1', isStatic: true },
            { key: 'banner2', slotId: 'slot2', closeButton: true }
        ];

        const result = generateBannersObject(configs);

        expect(Object.keys(result)).toEqual(['banner1', 'banner2']);
        expect(result.banner1).toBeDefined();
        expect(result.banner2).toBeDefined();
    });

    it('should return empty object if input is not an array', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const result = generateBannersObject('not-an-array');

        expect(result).toEqual({});
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it('should skip invalid configs', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        const configs = [
            { key: 'banner1', slotId: 'slot1' },
            { slotId: 'slot2' },
            { key: 'banner3', slotId: 'slot3' }
        ];

        const result = generateBannersObject(configs);

        expect(Object.keys(result)).toEqual(['banner1', 'banner3']);
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it('should handle empty array', () => {
        const result = generateBannersObject([]);

        expect(result).toEqual({});
    });

    it('should handle groups correctly', () => {
        const configs = [
            {
                key: 'group1',
                isGroup: true,
                banners: [{ slotId: 'slot1' }, { slotId: 'slot2' }]
            }
        ];

        const result = generateBannersObject(configs);

        expect(result.group1).toBeDefined();
        expect(result.group1.type).toBe(React.Fragment);
    });

    it('should create correct object structure', () => {
        const configs = [
            { key: 'test', slotId: 'test_slot', classes: '--test' }
        ];

        const result = generateBannersObject(configs);

        expect(result).toMatchObject({
            test: expect.objectContaining({
                type: DivBannerSSR,
                key: 'test_slot'
            })
        });
    });
});
