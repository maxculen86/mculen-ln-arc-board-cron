import {
    shouldHideSubheaderText,
    shouldLoadEager
} from '../../../../../../components/private/LN/acumulado/utils/helpers';

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

    describe('shouldLoadEager', () => {
        it('returns true when requestUri includes "/dolar-hoy/", isWiki is false, and index is 1 or 2', () => {
            expect(shouldLoadEager(1, false, '/dolar-hoy/')).toBe(true);
            expect(shouldLoadEager(2, false, '/dolar-hoy/')).toBe(true);
        });

        it('returns true when requestUri includes "/tema/", isWiki is false, and index is 1 or 2', () => {
            expect(shouldLoadEager(1, false, '/tema/dolar-blue/')).toBe(true);
            expect(shouldLoadEager(2, false, '/tema/cualquiera/')).toBe(true);
        });

        it('returns false if index is not 1 or 2', () => {
            expect(shouldLoadEager(0, false, '/dolar-hoy/')).toBe(false);
            expect(shouldLoadEager(3, false, '/tema/loque sea')).toBe(false);
        });

        it('returns false if isWiki is true, even if URL matches and index is valid', () => {
            expect(shouldLoadEager(1, true, '/dolar-hoy/')).toBe(false);
            expect(shouldLoadEager(2, true, '/tema/loquesea')).toBe(false);
        });

        it('returns false if URL does not include /dolar-hoy/ or /tema/, even if other conditions are true', () => {
            expect(shouldLoadEager(1, false, '/otra-ruta/')).toBe(false);
            expect(shouldLoadEager(2, false, '/noticias/')).toBe(false);
        });
    });
});
