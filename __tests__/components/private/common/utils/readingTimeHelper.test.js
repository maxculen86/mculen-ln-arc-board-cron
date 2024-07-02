import {
    calcReadingMinutes,
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
