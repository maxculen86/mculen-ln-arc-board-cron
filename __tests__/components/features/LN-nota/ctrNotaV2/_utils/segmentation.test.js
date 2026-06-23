import {
    hasStickyMobileSegmentationConfig,
    normalizeDigitList
} from '../../../../../../components/features/LN-nota/crtNotaV2/_utils/segmentation';

describe('sticky mobile segmentation helpers', () => {
    describe('normalizeDigitList', () => {
        it('returns an empty array when digits is not an array', () => {
            expect(normalizeDigitList()).toEqual([]);
            expect(normalizeDigitList(null)).toEqual([]);
            expect(normalizeDigitList('1')).toEqual([]);
        });

        it('trims values and removes empty items', () => {
            expect(normalizeDigitList([' 1 ', '', '   ', '3'])).toEqual([
                '1',
                '3'
            ]);
        });

        it('coerces numeric values to strings', () => {
            expect(normalizeDigitList([1, 2, ' 3 '])).toEqual(['1', '2', '3']);
        });
    });

    describe('hasStickyMobileSegmentationConfig', () => {
        it('returns false when no segmentation field has a real value', () => {
            expect(
                hasStickyMobileSegmentationConfig({
                    experimentName: '',
                    segmentAndHide: false,
                    testDigits: [''],
                    controlDigits: ['   ']
                })
            ).toBe(false);
        });

        it('returns true when experimentName, segmentAndHide or digit lists are configured', () => {
            expect(
                hasStickyMobileSegmentationConfig({
                    experimentName: 'Exp01'
                })
            ).toBe(true);
            expect(
                hasStickyMobileSegmentationConfig({
                    segmentAndHide: true
                })
            ).toBe(true);
            expect(
                hasStickyMobileSegmentationConfig({
                    testDigits: ['1']
                })
            ).toBe(true);
            expect(
                hasStickyMobileSegmentationConfig({
                    controlDigits: ['2']
                })
            ).toBe(true);
        });
    });
});
