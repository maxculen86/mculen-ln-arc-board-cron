import {
    appendPageReferrerParam,
    getArticlePath,
    getUrlInstance,
    shouldDecorateHost,
    PAGE_REFERRER_SUFFIX
} from '../../../../../components/private/LN/common/utils/pageReferrer';

describe('pageReferrer utils', () => {
    const originalWindow = global.window;

    afterEach(() => {
        global.window = originalWindow;
    });

    describe('getArticlePath', () => {
        it('sanitizes the pathname from a provided location object', () => {
            const locationObj = { pathname: '/deportes/futbol/nota/' };
            expect(getArticlePath(locationObj)).toBe('deportes/futbol/nota');
        });

        it('returns an empty string when no pathname is available', () => {
            expect(getArticlePath({})).toBe('');
        });
    });

    describe('getUrlInstance', () => {
        it('returns a URL instance when the value is absolute', () => {
            const result = getUrlInstance(
                undefined,
                'https://canchallena.lanacion.com.ar/futbol'
            );

            expect(result?.href).toBe(
                'https://canchallena.lanacion.com.ar/futbol'
            );
        });

        it('uses the provided base origin for relative values', () => {
            const result = getUrlInstance(
                'https://canchallena.lanacion.com.ar',
                '/futbol/fixture'
            );

            expect(result?.href).toBe(
                'https://canchallena.lanacion.com.ar/futbol/fixture'
            );
        });

        it('returns null when the URL cannot be created', () => {
            delete global.window;
            expect(getUrlInstance(undefined, '/relative')).toBeNull();
            expect(getUrlInstance(undefined, '')).toBeNull();
        });
    });

    describe('shouldDecorateHost', () => {
        it('accepts the canonical canchallena host', () => {
            expect(
                shouldDecorateHost('canchallena.lanacion.com.ar')
            ).toBeTruthy();
        });

        it('accepts prefixed environments of the same host', () => {
            expect(
                shouldDecorateHost('qa-canchallena.lanacion.com.ar')
            ).toBeTruthy();
        });

        it('rejects unrelated hosts', () => {
            expect(shouldDecorateHost('example.com')).toBeFalsy();
            expect(shouldDecorateHost('foodit.lanacion.com.ar')).toBeFalsy();
            expect(shouldDecorateHost()).toBeFalsy();
        });
    });

    describe('appendPageReferrerParam', () => {
        it('appends the page referrer when host and article path are valid', () => {
            const decorated = appendPageReferrerParam(
                'https://canchallena.lanacion.com.ar/?foo=bar',
                { articlePath: 'deportes/nota-importante' }
            );

            const url = new URL(decorated);

            expect(url.searchParams.get('foo')).toBe('bar');
            expect(url.searchParams.get('page_referrer')).toBe(
                `deportes/nota-importante${PAGE_REFERRER_SUFFIX}`
            );
        });

        it('preserves the original link when the host is not allowed', () => {
            const link = 'https://www.lanacion.com.ar/deportes/';
            expect(appendPageReferrerParam(link, { articlePath: 'nota' })).toBe(
                link
            );
        });

        it('returns the original link when the article path is missing', () => {
            const link = 'https://canchallena.lanacion.com.ar/';
            expect(appendPageReferrerParam(link, { articlePath: '' })).toBe(
                link
            );
        });

        it('can handle relative links when a base origin is provided', () => {
            const result = appendPageReferrerParam('/futbol', {
                articlePath: 'deportes/minuto-a-minuto',
                baseOrigin: 'https://canchallena.lanacion.com.ar'
            });

            const url = new URL(result);

            expect(url.origin).toBe('https://canchallena.lanacion.com.ar');
            expect(url.pathname).toBe('/futbol');
            expect(url.searchParams.get('page_referrer')).toBe(
                `deportes/minuto-a-minuto${PAGE_REFERRER_SUFFIX}`
            );
        });

        it('returns the input when link is falsy or invalid', () => {
            expect(appendPageReferrerParam('')).toBe('');
            expect(appendPageReferrerParam(null)).toBeNull();
        });
    });
});
