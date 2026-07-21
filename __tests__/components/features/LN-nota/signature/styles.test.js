import { googleButtonClasses } from '../../../../../components/features/LN-nota/signature/styles';
import {
    NOTICIA,
    VIDEO_VERTICAL,
    STORYTELLING
} from '../../../../../components/private/common/utils/subtypes/subtypeHelper';
import { place } from '../../../../../components/private/common/utils/firmaHelper';

describe('components - feature - LN-nota - signature - styles', () => {
    describe('googleButtonClasses', () => {
        it('should always include the base classes', () => {
            expect(googleButtonClasses()).toMatchInlineSnapshot(
                `"hidden lg:inline-flex"`
            );
        });

        it('should apply md:mb-24 when hasVisibleContent is false', () => {
            expect(
                googleButtonClasses({ hasVisibleContent: false })
            ).toMatchInlineSnapshot(`"hidden lg:inline-flex md:mb-24"`);
        });

        it('should not apply md:mb-24 when hasVisibleContent is true', () => {
            expect(
                googleButtonClasses({ hasVisibleContent: true })
            ).not.toContain('md:mb-24');
        });

        it('should apply mb-16 when position is Top, hasAuthors is true and subtype belongs to withMargin', () => {
            expect(
                googleButtonClasses({
                    position: place.Top,
                    hasAuthors: true,
                    subtype: NOTICIA
                })
            ).toMatchInlineSnapshot(`"hidden lg:inline-flex mb-16"`);
        });

        it('should not apply mb-16 when position is Bottom even if hasAuthors is true and subtype is in withMargin', () => {
            const result = googleButtonClasses({
                position: place.Bottom,
                hasAuthors: true,
                subtype: NOTICIA
            });
            expect(result).not.toContain('mb-16');
        });

        it('should not apply mb-16 when subtype is VIDEO_VERTICAL even if position is Top and hasAuthors is true', () => {
            const result = googleButtonClasses({
                position: place.Top,
                hasAuthors: true,
                subtype: VIDEO_VERTICAL
            });
            expect(result).not.toContain('mb-16');
        });

        it('should not apply mb-16 when subtype is STORYTELLING even if position is Top and hasAuthors is true', () => {
            const result = googleButtonClasses({
                position: place.Top,
                hasAuthors: true,
                subtype: STORYTELLING
            });
            expect(result).not.toContain('mb-16');
        });

        it('should apply both md:mb-24 and mb-16 when hasVisibleContent is false, position is Top, hasAuthors is true and subtype is in withMargin', () => {
            expect(
                googleButtonClasses({
                    hasVisibleContent: false,
                    position: place.Top,
                    hasAuthors: true,
                    subtype: NOTICIA
                })
            ).toMatchInlineSnapshot(`"hidden lg:inline-flex md:mb-24 mb-16"`);
        });
    });
});
