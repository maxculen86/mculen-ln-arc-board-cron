import getImageConfigByCollections from '../../../../components/chains/utils/getImageConfigByCollections';

describe('getImageConfigByCollections', () => {
    it('should return a comma-separated string for a valid array.', () => {
        const rules = [
            { imageConfig: 'A' },
            { imageConfig: 'B' },
            { imageConfig: 'C' }
        ];
        expect(getImageConfigByCollections(rules)).toBe('A,B,C');
    });

    it('should return an empty string for an empty array', () => {
        const rules = [];
        expect(getImageConfigByCollections(rules)).toBe('');
    });

    it('should return an empty string when the input is null', () => {
        expect(getImageConfigByCollections(null)).toBe('');
    });

    it('should return an empty string when the input is undefined.', () => {
        expect(getImageConfigByCollections(undefined)).toBe('');
    });

    it('should handle null/empty values ​​correctly in imageConfig', () => {
        const rules = [
            { imageConfig: null },
            { imageConfig: 'E' },
            { imageConfig: '' }
        ];
        expect(getImageConfigByCollections(rules)).toBe(',E,');
    });

    it('should include "undefined" if imageConfig is missing from a rule', () => {
        const rules = [
            { imageConfig: 'F' },
            { otherProp: 1 },
            { imageConfig: 'G' }
        ];
        expect(getImageConfigByCollections(rules)).toBe('F,,G');
    });

    it('should handle numeric values ​​in imageConfig', () => {
        const rules = [{ imageConfig: 123 }, { imageConfig: 456 }];
        expect(getImageConfigByCollections(rules)).toBe('123,456');
    });
});
