import {
    getRuleForIndex,
    LAYOUT_RULES
} from '../../../../../components/chains/LN_DS_CajaPromo/common/layoutRules';

describe('LN_DS_CajaPromo - layoutRules', () => {
    describe('getRuleForIndex', () => {
        describe('oneLargeFourSmall layout', () => {
            it('should return featured rule at index 0', () => {
                expect(getRuleForIndex('oneLargeFourSmall', 0)).toEqual({
                    range: [0, 0],
                    size: { default: 24, md: 32 },
                    orientation: 'vertical'
                });
            });

            it('should return small card rule at index 1', () => {
                expect(getRuleForIndex('oneLargeFourSmall', 1)).toEqual({
                    range: [1, 4],
                    size: { default: 18, md: 24 },
                    orientation: 'vertical'
                });
            });

            it('should return small card rule at index 4 (last slot)', () => {
                expect(getRuleForIndex('oneLargeFourSmall', 4)).toEqual({
                    range: [1, 4],
                    size: { default: 18, md: 24 },
                    orientation: 'vertical'
                });
            });

            it('should return default rule when index is out of range', () => {
                expect(getRuleForIndex('oneLargeFourSmall', 5)).toEqual({
                    size: 24,
                    orientation: 'vertical'
                });
            });
        });

        describe('twoHorizontal layout', () => {
            it('should return horizontal rule scaling 18 to 24 from md at index 0', () => {
                expect(getRuleForIndex('twoHorizontal', 0)).toEqual({
                    range: [0, 1],
                    size: { default: 18, md: 24 },
                    orientation: 'horizontal'
                });
            });

            it('should return horizontal rule scaling 18 to 24 from md at index 1', () => {
                expect(getRuleForIndex('twoHorizontal', 1)).toEqual({
                    range: [0, 1],
                    size: { default: 18, md: 24 },
                    orientation: 'horizontal'
                });
            });

            it('should return default rule when index is out of range', () => {
                expect(getRuleForIndex('twoHorizontal', 2)).toEqual({
                    size: 24,
                    orientation: 'vertical'
                });
            });
        });

        describe('fourVertical layout', () => {
            it('should return vertical card rule at index 0', () => {
                expect(getRuleForIndex('fourVertical', 0)).toEqual({
                    range: [0, 3],
                    size: { default: 18 },
                    orientation: 'vertical'
                });
            });

            it('should return vertical card rule at index 3 (last slot)', () => {
                expect(getRuleForIndex('fourVertical', 3)).toEqual({
                    range: [0, 3],
                    size: { default: 18 },
                    orientation: 'vertical'
                });
            });

            it('should return default rule when index is out of range', () => {
                expect(getRuleForIndex('fourVertical', 4)).toEqual({
                    size: 24,
                    orientation: 'vertical'
                });
            });
        });

        describe('oneHorizontalThreeVertical layout', () => {
            it('should return vertical-to-horizontal rule for the first card at index 0', () => {
                expect(
                    getRuleForIndex('oneHorizontalThreeVertical', 0)
                ).toEqual({
                    range: [0, 0],
                    size: { default: 24 },
                    orientation: { default: 'vertical', md: 'horizontal' }
                });
            });

            it('should return horizontal-to-vertical rule for secondary cards at index 1', () => {
                expect(
                    getRuleForIndex('oneHorizontalThreeVertical', 1)
                ).toEqual({
                    range: [1, 3],
                    size: { default: 18 },
                    orientation: { default: 'horizontal', md: 'vertical' },
                    clampTitle: true
                });
            });

            it('should return horizontal-to-vertical rule for secondary cards at index 3 (last slot)', () => {
                expect(
                    getRuleForIndex('oneHorizontalThreeVertical', 3)
                ).toEqual({
                    range: [1, 3],
                    size: { default: 18 },
                    orientation: { default: 'horizontal', md: 'vertical' },
                    clampTitle: true
                });
            });

            it('should return default rule when index is out of range', () => {
                expect(
                    getRuleForIndex('oneHorizontalThreeVertical', 4)
                ).toEqual({
                    size: 24,
                    orientation: 'vertical'
                });
            });
        });

        describe('threeVertical layout', () => {
            it('should return vertical rule scaling 24 to 32 from md at index 0', () => {
                expect(getRuleForIndex('threeVertical', 0)).toEqual({
                    range: [0, 2],
                    size: { default: 24, md: 32 },
                    orientation: 'vertical'
                });
            });

            it('should return vertical rule scaling 24 to 32 from md at index 2 (last slot)', () => {
                expect(getRuleForIndex('threeVertical', 2)).toEqual({
                    range: [0, 2],
                    size: { default: 24, md: 32 },
                    orientation: 'vertical'
                });
            });

            it('should return default rule when index is out of range', () => {
                expect(getRuleForIndex('threeVertical', 3)).toEqual({
                    size: 24,
                    orientation: 'vertical'
                });
            });
        });

        describe('oneHorizontal layout', () => {
            it('should return vertical-to-horizontal size 32 rule at index 0', () => {
                expect(getRuleForIndex('oneHorizontal', 0)).toEqual({
                    range: [0, 0],
                    size: { default: 32 },
                    orientation: { default: 'vertical', md: 'horizontal' }
                });
            });

            it('should return default rule when index is out of range', () => {
                expect(getRuleForIndex('oneHorizontal', 1)).toEqual({
                    size: 24,
                    orientation: 'vertical'
                });
            });
        });

        describe('page layout overrides', () => {
            it('should return size 24 from md for fourVertical in acumulado', () => {
                expect(
                    getRuleForIndex('fourVertical', 0, 'LN-acumulado')
                ).toEqual({
                    range: [0, 3],
                    size: { default: 18, md: 24 },
                    orientation: 'vertical'
                });
            });

            it('should apply the acumulado override to every card slot', () => {
                expect(
                    getRuleForIndex('fourVertical', 3, 'LN-acumulado')
                ).toEqual({
                    range: [0, 3],
                    size: { default: 18, md: 24 },
                    orientation: 'vertical'
                });
            });

            it('should keep base rules for fourVertical in home', () => {
                expect(
                    getRuleForIndex('fourVertical', 0, 'LN10-Home_Main')
                ).toEqual({
                    range: [0, 3],
                    size: { default: 18 },
                    orientation: 'vertical'
                });
            });

            it('should keep base rules for diagramations without override in acumulado', () => {
                expect(
                    getRuleForIndex('threeVertical', 0, 'LN-acumulado')
                ).toEqual({
                    range: [0, 2],
                    size: { default: 24, md: 32 },
                    orientation: 'vertical'
                });
            });

            it('should keep base rules when pageLayout is not provided', () => {
                expect(getRuleForIndex('fourVertical', 0)).toEqual({
                    range: [0, 3],
                    size: { default: 18 },
                    orientation: 'vertical'
                });
            });

            it('should return default rule when index is out of range in acumulado', () => {
                expect(
                    getRuleForIndex('fourVertical', 4, 'LN-acumulado')
                ).toEqual({
                    size: 24,
                    orientation: 'vertical'
                });
            });
        });

        describe('edge cases', () => {
            it('should return default rule for unknown layout', () => {
                expect(getRuleForIndex('unknownLayout', 0)).toEqual({
                    size: 24,
                    orientation: 'vertical'
                });
            });

            it('should return default rule when layout is undefined', () => {
                expect(getRuleForIndex(undefined, 0)).toEqual({
                    size: 24,
                    orientation: 'vertical'
                });
            });

            it('should return default rule when layout is null', () => {
                expect(getRuleForIndex(null, 0)).toEqual({
                    size: 24,
                    orientation: 'vertical'
                });
            });

            it('should return default rule when layout is empty string', () => {
                expect(getRuleForIndex('', 0)).toEqual({
                    size: 24,
                    orientation: 'vertical'
                });
            });
        });
    });

    describe('LAYOUT_RULES', () => {
        it('should define rules for all diagramation types', () => {
            expect(Object.keys(LAYOUT_RULES)).toEqual([
                'oneLargeFourSmall',
                'twoHorizontal',
                'fourVertical',
                'oneHorizontalThreeVertical',
                'threeVertical',
                'oneHorizontal'
            ]);
        });
    });
});
