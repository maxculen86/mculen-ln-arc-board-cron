import compare from '../../../../../components/private/common/utils/compare';

describe('Tests for compare util', () => {
    it('Test < operator', () => {
        expect(compare(1, 2, '<')).toBeTruthy();
    });

    it('Test !== operator', () => {
        expect(compare(1, 2, '!==')).toBeTruthy();
    });

    it('Test > operator', () => {
        expect(compare(1, 2, '>')).toBeFalsy();
    });

    it('Test operator not implemented', () => {
        expect(compare(1, 2, '>=')).toBeUndefined();
    });
});
