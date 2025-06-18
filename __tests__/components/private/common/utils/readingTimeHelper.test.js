import {
    calcReadingMinutes,
    countWords,
    getRoundedWords,
    getWordsAndReadingTime,
    isExcludedSubtype
} from '../../../../../components/features/LN-10-global/common/readingTime/_helpers';
import {
    HTMLLIBRE,
    VIDEO,
    FOTOAL100,
    AGENCIA,
    NOTICIA,
    RECETA
} from '../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('Components - private - common - utils', () => {
    describe('Exclude reading time for different types of notes', () => {
        it('should return true for excluded subtypes', () => {
            expect(isExcludedSubtype(HTMLLIBRE)).toBe(true);
            expect(isExcludedSubtype(VIDEO)).toBe(true);
            expect(isExcludedSubtype(FOTOAL100)).toBe(true);
            expect(isExcludedSubtype(AGENCIA)).toBe(true);
        });

        it('should return false for non-excluded subtypes', () => {
            expect(isExcludedSubtype(NOTICIA)).toBe(false);
            expect(isExcludedSubtype(RECETA)).toBe(false);
        });
    });

    describe('calculate reading time', () => {
        it('should return the correct rounded up reading time', () => {
            expect(calcReadingMinutes(200)).toBe(0o1);
            expect(calcReadingMinutes(201)).toBe(0o2);
            expect(calcReadingMinutes(400)).toBe(0o2);
            expect(calcReadingMinutes(399)).toBe(0o2);
        });

        it('should handle edge cases', () => {
            expect(calcReadingMinutes(0)).toBe(0o0);
            expect(calcReadingMinutes(1)).toBe(0o1);
        });
    });

    describe('countWords', () => {
        it('should count words in a normal string', () => {
            expect(countWords('Esto es una prueba')).toBe(4);
        });

        it('should count words in a normal string with apostrophes and hyphens', () => {
            expect(countWords("It's a long-term project.")).toBe(4);
        });

        it('should ignore multiple spaces', () => {
            expect(countWords('  Esto    es   una    prueba  ')).toBe(4);
        });

        it('should return 0 if given an empty string', () => {
            expect(countWords('')).toBe(0);
        });

        it('should return 0 if given null or undefined', () => {
            expect(countWords(null)).toBe(0);
            expect(countWords(undefined)).toBe(0);
        });

        it('should return 0 if the string contains only spaces', () => {
            expect(countWords('     ')).toBe(0);
        });
    });

    describe('getRoundedWords', () => {
        it('should return 100 if the count is less than or equal to 100', () => {
            expect(getRoundedWords(1)).toBe(100);
            expect(getRoundedWords(100)).toBe(100);
        });

        it('should round down if the remainder is less than or equal to 50', () => {
            expect(getRoundedWords(548)).toBe(500);
            expect(getRoundedWords(250)).toBe(200);
        });

        it('should round up if the remainder is greater than 50', () => {
            expect(getRoundedWords(788)).toBe(800);
            expect(getRoundedWords(1992)).toBe(2000);
        });

        it('should return 0 if input is not a number', () => {
            expect(getRoundedWords('abc')).toBe(0);
        });
    });

    describe('getWordsAndReadingTime', () => {
        it('should correctly calculate rounded words and reading time', () => {
            expect(getWordsAndReadingTime(1298)).toEqual({
                words: 1300,
                readingTime: '7'
            });
            expect(getWordsAndReadingTime(548)).toEqual({
                words: 500,
                readingTime: '3'
            });
            expect(getWordsAndReadingTime(788)).toEqual({
                words: 800,
                readingTime: '4'
            });
        });

        it('should handle invalid input', () => {
            expect(getWordsAndReadingTime('abc')).toEqual({
                words: 0,
                readingTime: '0'
            });
        });
    });
});
