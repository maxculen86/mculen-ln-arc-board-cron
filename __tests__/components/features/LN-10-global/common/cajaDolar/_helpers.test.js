import getFillClass from '../../../../../../components/features/LN-10/cajaDolar/_helpers';

describe('getFillClass', () => {
    it('should return "--fewElem" if the array has 3 or fewer elements', () => {
        expect(getFillClass([1, 2, 3])).toBe('--fewElem');
        expect(getFillClass([1, 2])).toBe('--fewElem');
        expect(getFillClass([1])).toBe('--fewElem');
        expect(getFillClass([])).toBe('--fewElem');
    });

    it('should return an empty string for an array with 4 elements', () => {
        expect(getFillClass([1, 2, 3, 4])).toBe('');
    });

    it('should return "--minusThree" for an array with 5 elements', () => {
        expect(getFillClass([1, 2, 3, 4, 5])).toBe('--minusThree');
    });

    it('should return "--minusTwo" for an array with 6 elements', () => {
        expect(getFillClass([1, 2, 3, 4, 5, 6])).toBe('--minusTwo');
    });

    it('should return "--minusOne" for an array with 7 elements', () => {
        expect(getFillClass([1, 2, 3, 4, 5, 6, 7])).toBe('--minusOne');
    });

    it('should return an empty string for arrays with 8, 12, 16, etc. elements', () => {
        expect(getFillClass([1, 2, 3, 4, 5, 6, 7, 8])).toBe('');
        expect(getFillClass(Array(12).fill(1))).toBe('');
        expect(getFillClass(Array(16).fill(1))).toBe('');
    });

    it('should return "--minusThree" for arrays with 9, 13, 17, etc. elements', () => {
        expect(getFillClass(Array(9).fill(1))).toBe('--minusThree');
        expect(getFillClass(Array(13).fill(1))).toBe('--minusThree');
        expect(getFillClass(Array(17).fill(1))).toBe('--minusThree');
    });

    it('should return "--minusTwo" for arrays with 10, 14, 18, etc. elements', () => {
        expect(getFillClass(Array(10).fill(1))).toBe('--minusTwo');
        expect(getFillClass(Array(14).fill(1))).toBe('--minusTwo');
        expect(getFillClass(Array(18).fill(1))).toBe('--minusTwo');
    });

    it('should return "--minusOne" for arrays with 11, 15, 19, etc. elements', () => {
        expect(getFillClass(Array(11).fill(1))).toBe('--minusOne');
        expect(getFillClass(Array(15).fill(1))).toBe('--minusOne');
        expect(getFillClass(Array(19).fill(1))).toBe('--minusOne');
    });

    it('should return an empty string if the data is null or undefined', () => {
        expect(getFillClass(null)).toBe('');
        expect(getFillClass(undefined)).toBe('');
    });
});
