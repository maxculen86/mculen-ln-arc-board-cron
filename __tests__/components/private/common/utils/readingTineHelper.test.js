import {
    calculateReadingTime,
    isExcludedSubtype
} from '../../../../../components/features/LN-10-global/common/readingTime/_helpers';
import {
    HTMLLIBRE,
    VIDEO,
    FOTOAL100,
    AGENCIA,
    NOTICIA,
    RECETA
} from '../.././../../../components/private/common/utils/subtypes/subtypeHelper';

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
        expect(calculateReadingTime(250)).toBe(1);
        expect(calculateReadingTime(251)).toBe(2);
        expect(calculateReadingTime(500)).toBe(2);
        expect(calculateReadingTime(499)).toBe(2);
    });

    it('should handle edge cases', () => {
        expect(calculateReadingTime(0)).toBe(0);
        expect(calculateReadingTime(1)).toBe(1);
    });
});
