import { removeAccents } from '../../../../../components/private/common/utils/dailyHoroscopeHelper';

describe('Components - private - common - utils - dailyHoroscopeHelper', () => {
    describe('removeAccents function', () => {
        it('should remove accents', () => {
            const input = 'Capricornio';
            const output = 'capricornio';
            expect(removeAccents(input)).toBe(output);
        });
        it('should remove accents and convert to lowercase', () => {
            const input = 'Géminis';
            const output = 'geminis';
            expect(removeAccents(input)).toBe(output);
        });

        it('should handle empty strings', () => {
            const input = '';
            const output = '';
            expect(removeAccents(input)).toBe(output);
        });
    });
});
