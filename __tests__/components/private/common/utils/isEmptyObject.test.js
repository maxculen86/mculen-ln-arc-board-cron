import { isEmptyObject } from '../../../../../components/private/common/utils/isEmptyObject';

describe('isEmptyObject', () => {
    it('should return true for an empty object', () => {
        const obj = {};
        expect(isEmptyObject(obj)).toBe(true);
    });

    it('should return false for an object with properties', () => {
        const obj = { key: 'value' };
        expect(isEmptyObject(obj)).toBe(false);
    });

    it('should return true for null', () => {
        expect(isEmptyObject(null)).toBe(true);
    });

    it('should return true for undefined', () => {
        expect(isEmptyObject(undefined)).toBe(true);
    });

    it('should return false for an array (because it has keys)', () => {
        const arr = [1, 2, 3];
        expect(isEmptyObject(arr)).toBe(false);
    });

    it('should return false for a non-object value like a string', () => {
        const str = 'string';
        expect(isEmptyObject(str)).toBe(false);
    });
});
