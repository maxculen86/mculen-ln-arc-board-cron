import {
    isValidNumber,
    isValidString,
    isEmptyString,
    escapedStringForRegex
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
    describe('Function escapedStringForRegex', () => {
        it('Should return empty string when paramether is not a string', () => {
            expect(escapedStringForRegex('')).toBe('');
            expect(escapedStringForRegex(' ')).toBe('');
            expect(escapedStringForRegex('      ')).toBe('');
            expect(escapedStringForRegex(0)).toBe('');
            expect(escapedStringForRegex(undefined)).toBe('');
            expect(escapedStringForRegex({})).toBe('');
        });
        it('Should return same string when not special characters are present', () => {
            const regularUrl =
                'https://www.lanacion.com.ar/propiedades/tendencia-que-es-la-ciudad-de-los-15-minutos-nid15112020/';
            expect(escapedStringForRegex('a')).toBe('a');
            expect(escapedStringForRegex('prueba')).toBe('prueba');
            expect(escapedStringForRegex('0')).toBe('0');
            expect(escapedStringForRegex(regularUrl)).toBe(
                `https:\\/\\/www\\.lanacion\\.com\\.ar\\/propiedades\\/tendencia-que-es-la-ciudad-de-los-15-minutos-nid15112020\\/`
            );
        });
        it('Should return same string with special characters escaped for regex creation, and should match original url', () => {
            const specialCharactersUrl =
                'https://www.lanacion.com.ar/estados-unidos/compartio-un-truco-infalible-para-que-entre-la-ropa-en-la-valija-pero-le-hicieron-una-advertencia-nid31082022/#:~:text=Sann%20(%40sancb_%20en%20TikTok,que%20todo%20ocupara%20menos%20espacio.';
            const result = escapedStringForRegex(specialCharactersUrl);
            expect(result).toBe(
                `https:\\/\\/www\\.lanacion\\.com\\.ar\\/estados-unidos\\/compartio-un-truco-infalible-para-que-entre-la-ropa-en-la-valija-pero-le-hicieron-una-advertencia-nid31082022\\/#:~:text=Sann%20\\(%40sancb_%20en%20TikTok,que%20todo%20ocupara%20menos%20espacio\\.`
            );
            expect(new RegExp(result).test(specialCharactersUrl)).toBeTruthy();
        });
    });
});
