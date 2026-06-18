import {
    hasSticky,
    layoutBySubtype
} from '../../../../../components/features/LN-nota/share/_children/helper';
import {
    FOTOAL100,
    LIVEBLOG_EDITORIAL,
    NOTICIA,
    VIDEO
} from '../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('components - features - LN-nota - share - helper', () => {
    describe('layoutBySubtype', () => {
        it('should return the correct layout for each subtype', () => {
            expect(layoutBySubtype[FOTOAL100]).toBe('fotoAl100');
            expect(layoutBySubtype[VIDEO]).toBe('video');
            expect(layoutBySubtype[LIVEBLOG_EDITORIAL]).toBe(
                'liveblogEditorial'
            );
            expect(layoutBySubtype[NOTICIA]).toBeUndefined();
        });

        it('should not return sticky for FOTOAL100', () => {
            expect(hasSticky(FOTOAL100)).toBe(false);
        });
        it('should not return sticky for VIDEO', () => {
            expect(hasSticky(VIDEO)).toBe(false);
        });
        it('should not return sticky for LIVEBLOG_EDITORIAL', () => {
            expect(hasSticky(LIVEBLOG_EDITORIAL)).toBe(false);
        });

        it('should return sticky for other subtype', () => {
            expect(hasSticky(NOTICIA)).toBe(true);
        });
    });
});
