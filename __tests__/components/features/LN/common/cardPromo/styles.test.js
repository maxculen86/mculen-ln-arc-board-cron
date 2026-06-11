import {
    normalizeResponsive,
    getResponsiveCardClasses,
    getResponsiveRibbonClasses
} from '../../../../../../components/features/LN/common/cardPromo/styles';

jest.mock('@ln/ds-cva', () => ({
    cva: jest.fn(() => jest.fn(() => ''))
}));

describe('cardPromo - styles', () => {
    describe('normalizeResponsive', () => {
        it('should return default value when value is undefined', () => {
            expect(normalizeResponsive(undefined, 24)).toEqual({ default: 24 });
        });

        it('should return default value when value is null', () => {
            expect(normalizeResponsive(null, 'vertical')).toEqual({
                default: 'vertical'
            });
        });

        it('should wrap scalar number in default key', () => {
            expect(normalizeResponsive(32, 24)).toEqual({ default: 32 });
        });

        it('should wrap string scalar in default key', () => {
            expect(normalizeResponsive('horizontal', 'vertical')).toEqual({
                default: 'horizontal'
            });
        });

        it('should wrap array in default key', () => {
            const arr = [1, 2];
            expect(normalizeResponsive(arr, 24)).toEqual({ default: arr });
        });

        it('should preserve breakpoints and explicit default from object', () => {
            expect(normalizeResponsive({ default: 24, md: 32 }, 18)).toEqual({
                default: 24,
                sm: undefined,
                md: 32,
                lg: undefined,
                xl: undefined
            });
        });

        it('should use defaultValue when object has no default key', () => {
            expect(normalizeResponsive({ md: 32 }, 18)).toEqual({
                default: 18,
                sm: undefined,
                md: 32,
                lg: undefined,
                xl: undefined
            });
        });

        it('should include all breakpoint keys from object', () => {
            expect(normalizeResponsive({ sm: 18, lg: 32 }, 24)).toEqual({
                default: 24,
                sm: 18,
                md: undefined,
                lg: 32,
                xl: undefined
            });
        });
    });

    describe('getResponsiveCardClasses', () => {
        it('should return empty string when no responsive breakpoints are defined', () => {
            expect(
                getResponsiveCardClasses('root', {}, {}, 24, 'vertical')
            ).toBe('');
        });

        it('should return empty string when responsiveSize and responsiveOrientation are empty', () => {
            expect(
                getResponsiveCardClasses('media', {}, {}, 18, 'horizontal')
            ).toBe('');
        });

        it('should return md class for root 24_vertical', () => {
            const result = getResponsiveCardClasses(
                'root',
                { md: 24 },
                {},
                24,
                'vertical'
            );
            expect(result).toBe('md:flex md:flex-col');
        });

        it('should return md class for root 24_horizontal', () => {
            const result = getResponsiveCardClasses(
                'root',
                { md: 24 },
                { md: 'horizontal' },
                24,
                'vertical'
            );
            expect(result).toBe('md:grid md:grid-cols-2');
        });

        it('should return md class for root 32_vertical', () => {
            const result = getResponsiveCardClasses(
                'root',
                { md: 32 },
                {},
                32,
                'vertical'
            );
            expect(result).toBe('md:flex md:flex-col');
        });

        it('should clamp size 32 to 24 when orientation resolves to horizontal', () => {
            const result = getResponsiveCardClasses(
                'root',
                { md: 32 },
                { md: 'horizontal' },
                24,
                'vertical'
            );
            expect(result).toBe('md:grid md:grid-cols-2');
        });

        it('should return empty string for unknown component', () => {
            const result = getResponsiveCardClasses(
                'unknown',
                { md: 24 },
                {},
                24,
                'vertical'
            );
            expect(result).toBe('');
        });

        it('should return md class for content 24_vertical', () => {
            const result = getResponsiveCardClasses(
                'content',
                { md: 24 },
                {},
                24,
                'vertical'
            );
            expect(result).toBe(
                'md:flex-col md:pt-12 md:pb-16 md:px-8 md:gap-8 md:items-center'
            );
        });

        it('should return md class for content 32_vertical', () => {
            const result = getResponsiveCardClasses(
                'content',
                { md: 32 },
                {},
                32,
                'vertical'
            );
            expect(result).toBe(
                'md:flex-col md:pt-24 md:pb-32 md:px-16 md:gap-8 md:items-center'
            );
        });

        it('should cascade from sm when md is not explicitly set', () => {
            const result = getResponsiveCardClasses(
                'root',
                { sm: 24, md: 24 },
                {},
                24,
                'vertical'
            );
            expect(result).toContain('md:flex md:flex-col');
        });

        it('should return md class for title 24_vertical', () => {
            const result = getResponsiveCardClasses(
                'title',
                { md: 24 },
                {},
                24,
                'vertical'
            );
            expect(result).toBe(
                'md:text-24 md:leading-[110%] md:tracking-[-0.3px] md:opsz-50 md:text-center md:flex-[0_1_auto]'
            );
        });

        it('should return md class for description 32_vertical', () => {
            const result = getResponsiveCardClasses(
                'description',
                { md: 32 },
                {},
                32,
                'vertical'
            );
            expect(result).toBe(
                'md:line-clamp-3 md:text-18 md:leading-[140%] md:tracking-[-0.6px] md:text-center'
            );
        });

        // Secondary cards in oneHorizontalThreeVertical[1,3]: size 18 with
        // orientation horizontal (default) → vertical (md). Only the orientation
        // is responsive, so responsiveSize is empty and the md breakpoint is
        // triggered solely by responsiveOrientation. Regression guard for the
        // 18_vertical combo that was missing from CARD_RESPONSIVE.
        describe('size 18 horizontal-to-vertical at md (1+3 secondary cards)', () => {
            it('should return md class for root 18_vertical', () => {
                const result = getResponsiveCardClasses(
                    'root',
                    {},
                    { md: 'vertical' },
                    18,
                    'horizontal'
                );
                expect(result).toBe('md:flex md:flex-col');
            });

            it('should return md class for media 18_vertical', () => {
                const result = getResponsiveCardClasses(
                    'media',
                    {},
                    { md: 'vertical' },
                    18,
                    'horizontal'
                );
                expect(result).toBe('md:w-full md:h-auto md:aspect-1/1');
            });

            it('should return md class for content 18_vertical', () => {
                const result = getResponsiveCardClasses(
                    'content',
                    {},
                    { md: 'vertical' },
                    18,
                    'horizontal'
                );
                expect(result).toBe(
                    'md:flex-col md:pt-12 md:pb-16 md:px-8 md:gap-8 md:items-center'
                );
            });

            it('should return md class for title 18_vertical', () => {
                const result = getResponsiveCardClasses(
                    'title',
                    {},
                    { md: 'vertical' },
                    18,
                    'horizontal'
                );
                expect(result).toBe(
                    'md:text-18 md:leading-[140%] md:tracking-[-0.6px] md:text-center md:flex-[0_1_auto]'
                );
            });

            it('should return md class for description 18_vertical', () => {
                const result = getResponsiveCardClasses(
                    'description',
                    {},
                    { md: 'vertical' },
                    18,
                    'horizontal'
                );
                expect(result).toBe('md:hidden');
            });

            it('should return md class for action 18_vertical', () => {
                const result = getResponsiveCardClasses(
                    'action',
                    {},
                    { md: 'vertical' },
                    18,
                    'horizontal'
                );
                expect(result).toBe('md:mt-auto');
            });
        });
    });

    describe('getResponsiveRibbonClasses', () => {
        it('should return empty strings when no responsive breakpoints are defined', () => {
            expect(getResponsiveRibbonClasses({}, 24)).toEqual({
                container: '',
                icon: ''
            });
        });

        it('should return ribbon classes for md size 24', () => {
            expect(getResponsiveRibbonClasses({ md: 24 }, 24)).toEqual({
                container: 'md:w-40 md:h-44',
                icon: 'md:size-24'
            });
        });

        it('should return ribbon classes for md size 32', () => {
            expect(getResponsiveRibbonClasses({ md: 32 }, 32)).toEqual({
                container: 'md:w-40 md:h-44',
                icon: 'md:size-24'
            });
        });

        it('should return empty strings for size 18 (not defined in CARD_RIBBON_RESPONSIVE)', () => {
            expect(getResponsiveRibbonClasses({ md: 18 }, 18)).toEqual({
                container: '',
                icon: ''
            });
        });

        it('should return empty strings when responsiveSize is undefined', () => {
            expect(getResponsiveRibbonClasses(undefined, 24)).toEqual({
                container: '',
                icon: ''
            });
        });
    });
});
