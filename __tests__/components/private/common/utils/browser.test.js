import Browser from '../../../../../components/private/common/utils/browser';

describe('Common - Browser Utils', () => {
    const infoErrorUrl = 'El parametro de Url es obligatorio en SSR';
    describe('getParameterByName', () => {
        const url =
            'http://localhost/pf/api/v1/notas/?_website=la-nacion-ar&param1=&outputType=json&section=/recetas&size=10&page=1';
        it('I get searched parameter', () => {
            const result = Browser.getParameterByName('size', url);
            const result1 = Browser.getParameterByName('page', url);

            expect(result).toBe('10');
            expect(result1).toBe('1');
        });

        it('I ask for a value that is not there', () => {
            const result = Browser.getParameterByName('paramFalso', url);

            expect(result).toBe(null);
        });

        it('I request a value that is not set', () => {
            const result = Browser.getParameterByName('param1', url);

            expect(result).toBe('');
        });

        it('I request a value without passing url', () => {
            delete global.window;
            global.window = { location: { href: url } };
            expect(Browser.getParameterByName('size')).toBe('10');
        });

        it("I ask for a value without having a 'window'", () => {
            delete global.window;
            let error = null;
            try {
                Browser.getParameterByName('size');
            } catch (e) {
                error = e;
            }

            expect(error.message).toBe(infoErrorUrl);
        });
    });

    describe('getParamFrom', () => {
        it('should extract the parameter correctly when the URL has the expected format', () => {
            const url = '/section;param1:value1;param2:value2/';
            expect(Browser.getParamFrom('section', 'param1', url)).toBe(
                'value1'
            );
            expect(Browser.getParamFrom('section', 'param2', url)).toBe(
                'value2'
            );
        });

        it('should return null if the parameter does not exist', () => {
            const url = '/section;param1:value1/';
            expect(Browser.getParamFrom('section', 'param3', url)).toBeNull();
        });

        it('should return null if the URL section does not match', () => {
            const url = '/otherSection;param1:value1/';
            expect(Browser.getParamFrom('section', 'param1', url)).toBeNull();
        });

        it('should handle URLs without parameters and return null', () => {
            const url = '/section/';
            expect(Browser.getParamFrom('section', 'param1', url)).toBeNull();
        });

        it('should extract parameters with alphanumeric values', () => {
            const url = '/section;param1:abc123XYZ/';
            expect(Browser.getParamFrom('section', 'param1', url)).toBe(
                'abc123XYZ'
            );
        });

        it('should return null if the parameter value is empty', () => {
            const url = '/section;param1:/';
            expect(Browser.getParamFrom('section', 'param1', url)).toBeNull();
        });

        it('should work with the "=" format instead of ";"', () => {
            const url = '/section=param1:valor123/';
            expect(Browser.getParamFrom('section', 'param1', url)).toBe(
                'valor123'
            );
        });

        it('should return null if the requestUri is undefined or null', () => {
            expect(
                Browser.getParamFrom('section', 'param1', undefined)
            ).toBeNull();
            expect(Browser.getParamFrom('section', 'param1', null)).toBeNull();
        });
    });

    describe('getSizesFrom', () => {
        it('should return the value directly if isAdmin is true', () => {
            expect(
                Browser.getSizesFrom(
                    true,
                    100,
                    'section',
                    'size',
                    '/section;size:50/'
                )
            ).toBe(100);
            expect(
                Browser.getSizesFrom(
                    true,
                    250,
                    'section',
                    'size',
                    '/section;size:150/'
                )
            ).toBe(250);
        });

        it('should parse and return the size from the URL if isAdmin is false', () => {
            expect(
                Browser.getSizesFrom(
                    false,
                    0,
                    'section',
                    'size',
                    '/section;size:75/'
                )
            ).toBe(75);
            expect(
                Browser.getSizesFrom(
                    false,
                    0,
                    'products',
                    'limit',
                    '/products=limit:200/'
                )
            ).toBe(200);
        });

        it('should return NaN if the parameter does not exist in the URL', () => {
            expect(
                Browser.getSizesFrom(
                    false,
                    0,
                    'section',
                    'missingParam',
                    '/section;size:50/'
                )
            ).toBeNaN();
        });

        it('should return NaN if the parameter value is not a number', () => {
            expect(
                Browser.getSizesFrom(
                    false,
                    0,
                    'section',
                    'size',
                    '/section;size:abc/'
                )
            ).toBeNaN();
        });

        it('should return NaN if the URL section does not match', () => {
            expect(
                Browser.getSizesFrom(
                    false,
                    0,
                    'wrongSection',
                    'size',
                    '/section;size:100/'
                )
            ).toBeNaN();
        });

        it('should return NaN if the URL does not contain any parameters', () => {
            expect(
                Browser.getSizesFrom(false, 0, 'section', 'size', '/section/')
            ).toBeNaN();
        });

        it('should return NaN if requestUri is undefined or null', () => {
            expect(
                Browser.getSizesFrom(false, 0, 'section', 'size', undefined)
            ).toBeNaN();
            expect(
                Browser.getSizesFrom(false, 0, 'section', 'size', null)
            ).toBeNaN();
        });

        it('should correctly parse numbers with leading zeros', () => {
            expect(
                Browser.getSizesFrom(
                    false,
                    0,
                    'section',
                    'size',
                    '/section;size:007/'
                )
            ).toBe(7);
        });
    });

    describe('isApiMobileRequest', () => {
        it('should return true if the URL contains "api/mobile"', () => {
            expect(Browser.isApiMobileRequest('/api/mobile/')).toBe(true);
            expect(Browser.isApiMobileRequest('/v1/api/mobile/endpoint')).toBe(
                true
            );
            expect(
                Browser.isApiMobileRequest('/user/data/api/mobile/info')
            ).toBe(true);
        });

        it('should return false if the URL does not contain "api/mobile"', () => {
            expect(Browser.isApiMobileRequest('/api/web')).toBe(false);
            expect(Browser.isApiMobileRequest('/mobile/api')).toBe(false);
            expect(Browser.isApiMobileRequest('/api/mobiles')).toBe(false);
            expect(Browser.isApiMobileRequest('/apimobile')).toBe(false);
        });

        it('should return false for empty strings or null/undefined URLs', () => {
            expect(Browser.isApiMobileRequest('')).toBe(false);
            expect(Browser.isApiMobileRequest(null)).toBe(false);
            expect(Browser.isApiMobileRequest(undefined)).toBe(false);
        });

        it('should be case-sensitive and return false if the case does not match', () => {
            expect(Browser.isApiMobileRequest('/API/MOBILE')).toBe(false);
            expect(Browser.isApiMobileRequest('/Api/Mobile')).toBe(false);
        });

        it('should return true even if "api/mobile" is part of a longer URL', () => {
            expect(
                Browser.isApiMobileRequest('/products/api/mobile/v2/data')
            ).toBe(true);
        });
    });

    describe('isApiRequest', () => {
        it('should return true if the URL contains "/api/"', () => {
            expect(Browser.isApiRequest('/api/')).toBe(true);
            expect(Browser.isApiRequest('/v1/api/endpoint')).toBe(true);
            expect(Browser.isApiRequest('/user/data/api/info')).toBe(true);
        });

        it('should return false if the URL does not contain "/api"', () => {
            expect(Browser.isApiRequest('/api')).toBe(false);
            expect(Browser.isApiRequest('/application')).toBe(false);
            expect(Browser.isApiRequest('/mobile/endpoint')).toBe(false);
            expect(Browser.isApiRequest('/apiexample')).toBe(false);
        });

        it('should return false for empty strings or null/undefined URLs', () => {
            expect(Browser.isApiRequest('')).toBe(false);
            expect(Browser.isApiRequest(null)).toBe(false);
            expect(Browser.isApiRequest(undefined)).toBe(false);
        });

        it('should be case-sensitive and return false if "api" case does not match', () => {
            expect(Browser.isApiRequest('/API')).toBe(false);
            expect(Browser.isApiRequest('/Api/endpoint')).toBe(false);
        });

        it('should return true if "/api" appears at the end of the URL', () => {
            expect(Browser.isApiRequest('/v1/resource/api/')).toBe(true);
        });

        it('should return false if "/api" is part of a larger word', () => {
            expect(Browser.isApiRequest('/apiary')).toBe(false);
            expect(Browser.isApiRequest('/application/apiary')).toBe(false);
        });
    });

    describe('getApiVersion', () => {
        it('should extract the version from a URL with /api/v', () => {
            expect(Browser.getApiVersion('/api/v3/')).toBe('3');
        });

        it('should extract the version from a URL with /api/mobile/v', () => {
            expect(Browser.getApiVersion('/api/mobile/v12/')).toBe('12');
        });

        it('should return null if the URL does not match the expected pattern', () => {
            expect(Browser.getApiVersion('/api/desktop/v5/')).toBeNull();
        });

        it('should return null if there is no version in the URL', () => {
            expect(Browser.getApiVersion('/api/mobile/')).toBeNull();
        });

        it('should throw an error if no URL is provided and window is undefined', () => {
            const originalWindow = global.window;
            delete global.window;

            expect(() => Browser.getApiVersion()).toThrow(infoErrorUrl);

            global.window = originalWindow;
        });

        it('should use window.location.href if no URL is provided (browser simulation)', () => {
            global.window = { location: { href: '/api/v9/' } };

            expect(Browser.getApiVersion()).toBe('9');
        });

        it('should return null if window.location.href does not contain a valid version', () => {
            global.window = { location: { href: '/home/dashboard' } };

            expect(Browser.getApiVersion()).toBeNull();
        });
    });

    describe('getApiType', () => {
        it('should return "mobile" when the URL contains /api/mobile/v', () => {
            expect(Browser.getApiType('/api/mobile/v3/')).toBe('mobile');
        });

        it('should return "global" when the URL contains /api/v without "mobile"', () => {
            expect(Browser.getApiType('/api/v5/')).toBe('global');
        });

        it('should return "global" if the URL does not match the expected pattern', () => {
            expect(Browser.getApiType('/api/desktop/v5/')).toBe('global');
        });

        it('should return "global" if there is no version in the URL', () => {
            expect(Browser.getApiType('/api/mobile/')).toBe('global');
        });

        it('should throw an error if no URL is provided and window is undefined', () => {
            const originalWindow = global.window;
            delete global.window;

            expect(() => Browser.getApiType()).toThrow(infoErrorUrl);

            global.window = originalWindow;
        });

        it('should use window.location.href if no URL is provided (browser simulation)', () => {
            global.window = { location: { href: '/api/mobile/v12/' } };

            expect(Browser.getApiType()).toBe('mobile');
        });

        it('should return "global" if window.location.href does not contain a valid API pattern', () => {
            global.window = { location: { href: '/dashboard/home' } };

            expect(Browser.getApiType()).toBe('global');
        });
    });
});
