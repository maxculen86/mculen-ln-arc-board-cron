jest.mock('fusion:consumer', () => {
    return Comp => Comp; // devuelve la clase tal cual
});

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://mock-lanacion.com.ar'
}));

jest.mock(
    '../../../../../components/private/common/utils/handleHttpError',
    () => ({
        handleHttpError: jest.fn()
    })
);

import HomeUpdate from '../../../../../components/features/LN-Api/HomeUpdate/json.js';
import { handleHttpError } from '../../../../../components/private/common/utils/handleHttpError';

describe('HomeUpdate', () => {
    const originalFetch = global.fetch;
    const originalWarn = console.warn;

    beforeEach(() => {
        jest.clearAllMocks();
        console.warn = jest.fn();
        global.fetch = jest.fn();
    });

    afterAll(() => {
        global.fetch = originalFetch;
        console.warn = originalWarn;
    });

    const buildProps = (query = {}) => ({
        globalContentConfig: { query }
    });

    const mockFetchJson = payload => {
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(payload)
        });
    };

    it('should build url and call fetch with Cookie header when useCookie is provided', async () => {
        mockFetchJson({
            information: {
                layoutPage: 'LN10-Home_Main',
                layoutDate: '2026-02-24T11:34:57.079Z'
            },
            content_elements: []
        });
        handleHttpError.mockImplementation(() => undefined);

        const feature = new HomeUpdate(
            buildProps({
                website: 'la-nacion-ar',
                useCookie: 'foo=bar',
                ticks: '123',
                versionDeploy: '456',
                contentVersion: 'old',
                information: {}
            })
        );

        const res = await feature.render();

        const [url, opt] = global.fetch.mock.calls[0];
        expect(url).toBe(
            'https://mock-lanacion.com.ar/?_website=la-nacion-ar&outputType=json&ticks=123&d=456'
        );
        expect(opt).toEqual({
            method: 'GET',
            headers: { Cookie: 'foo=bar' }
        });

        expect(res.homeUpdated).toBe(true);
        expect(res.contentVersion).not.toBe('old');
    });

    it('should return homeUpdated false when contentVersion matches the returned hash', async () => {
        mockFetchJson({
            information: {
                layoutPage: 'LN10-Home_Main',
                layoutDate: '2026-02-24T11:34:57.079Z'
            },
            content_elements: []
        });
        handleHttpError.mockImplementation(() => undefined);

        const feature = new HomeUpdate(
            buildProps({
                contentVersion:
                    '413f822a1305ad4ae0cfd62e079a8207d863d5e228f9fc5e872c9ea01cce3536'
            })
        );

        const res = await feature.render();

        expect(res).toEqual({
            homeUpdated: false,
            contentVersion:
                '413f822a1305ad4ae0cfd62e079a8207d863d5e228f9fc5e872c9ea01cce3536'
        });
    });

    it('should catch errors and return homeUpdated false when an exception happens', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
            statusText: 'Not Found',
            json: jest.fn()
        });

        handleHttpError.mockImplementation(() => {});

        const feature = new HomeUpdate(buildProps({}));

        const res = await feature.render();

        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(res).toEqual({ homeUpdated: false });
    });

    it('should catch 403 http error thrown by handleHttpError and return homeUpdated false', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 403,
            statusText: 'Forbidden',
            json: jest.fn()
        });

        const feature = new HomeUpdate(
            buildProps({
                website: 'la-nacion-ar',
                useCookie: 'foo=bar',
                ticks: '123',
                versionDeploy: '456',
                contentVersion: 'old',
                information: {}
            })
        );

        const res = await feature.render();

        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(res).toEqual({ homeUpdated: false });
    });
});
