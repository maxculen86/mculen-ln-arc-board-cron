import {
    isValidNumber,
    isValidString,
    isEmptyString
} from '../../../../../components/private/common/utils/dataValidation';
describe('Components - private - common - utils - dataValidation', () => {
    describe('Function isValidNumber', () => {
        it('Should return true for numeric values', () => {
            expect(isValidNumber(22)).toBe(true);
            expect(isValidNumber(66.6)).toBe(true);
            expect(isValidNumber(0)).toBe(true);
        });
        it('Should return false for non-numeric values', () => {
            expect(isValidNumber(undefined)).toBe(false);
            expect(isValidNumber('22')).toBe(false);
            expect(isValidNumber({})).toBe(false);
        });
    });
    describe('Function isValidString', () => {
        it('Should return true for string values', () => {
            expect(isValidString('22')).toBe(true);
            expect(isValidString('prueba')).toBe(true);
            expect(isValidString('')).toBe(true);
        });
        it('Should return false for non-string values', () => {
            expect(isValidString(undefined)).toBe(false);
            expect(isValidString(22)).toBe(false);
            expect(isValidString({})).toBe(false);
        });
    });
    describe('Function isEmptyString', () => {
        it('Should return true for empty string values or non string values', () => {
            expect(isEmptyString('')).toBe(true);
            expect(isEmptyString(' ')).toBe(true);
            expect(isEmptyString('      ')).toBe(true);
            expect(isEmptyString(0)).toBe(true);
            expect(isEmptyString(undefined)).toBe(true);
            expect(isEmptyString({})).toBe(true);
        });
        it('Should return false for not empty string values only', () => {
            expect(isEmptyString('a')).toBe(false);
            expect(isEmptyString('prueba')).toBe(false);
            expect(isEmptyString('0')).toBe(false);
        });
    });
});
