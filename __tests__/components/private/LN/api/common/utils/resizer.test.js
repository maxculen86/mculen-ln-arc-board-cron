import { getFocalPoint } from '../../../../../../../components/private/LN/api/common/utils/resizer';

describe('getFocalPoint', () => {
    test('should return focal point from query', () => {
        const query = '?someParam=1&focal=100,100';
        expect(getFocalPoint(query)).toBe('100,100');
    });

    test('should decode url-encoded focal value', () => {
        const query = '?focal=100%2C100';
        expect(getFocalPoint(query)).toBe('100,100');
    });

    test('should return empty string for falsy inputs', () => {
        expect(getFocalPoint(null)).toBe('');
        expect(getFocalPoint(undefined)).toBe('');
        expect(getFocalPoint('')).toBe('');
    });

    test('should return empty string for non-string input', () => {
        expect(getFocalPoint(123)).toBe('');
        expect(getFocalPoint({ focal: 'center' })).toBe('');
        expect(getFocalPoint(['focal=center'])).toBe('');
    });

    test('should return empty string when focal missing or empty', () => {
        expect(getFocalPoint('?lala=1&lalalalo=2')).toBe('');
        expect(getFocalPoint('?focal=')).toBe('');
    });
});
