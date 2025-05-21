import { shouldHideSubheaderText } from '../../../../../../components/private/LN/acumulado/utils/helpers';

describe('components - private - LN - acumulado - utils - helpers', () => {
    describe('shouldHideSubheaderText', () => {
        it('should return true when requestUri includes a path where subheader text should be hidden', () => {
            expect(shouldHideSubheaderText('/avisos/funebres/')).toBe(true);
            expect(
                shouldHideSubheaderText(
                    '/avisos/funebres/?adstest=true&_website=la-nacion-ar&d=72'
                )
            ).toBe(true);
        });

        it('should return false when requestUri does not include a path where subheader text should be hidden', () => {
            expect(shouldHideSubheaderText('/opinion/')).toBe(false);
            expect(shouldHideSubheaderText('/economia/')).toBe(false);
        });

        it('should return false when requestUri is null, undefined or empty', () => {
            expect(shouldHideSubheaderText(null)).toBe(false);
            expect(shouldHideSubheaderText(undefined)).toBe(false);
            expect(shouldHideSubheaderText('')).toBe(false);
        });
    });
});
