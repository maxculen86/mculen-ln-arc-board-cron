import getGaClientId, {
    getClientIdFromCookie
} from '../../../../../../../components/private/LN/common/utils/segmentation/getGaClientId';

describe('segmentation - getClientIdFromCookie', () => {
    it('returns null for empty/undefined input', () => {
        expect(getClientIdFromCookie(undefined)).toBeNull();
        expect(getClientIdFromCookie('')).toBeNull();
        expect(getClientIdFromCookie(null)).toBeNull();
    });

    it('returns null when cookie has fewer than 4 dot-separated parts', () => {
        expect(getClientIdFromCookie('GA1.2.123')).toBeNull();
        expect(getClientIdFromCookie('foobar')).toBeNull();
    });

    it('extracts the clientId from the standard _ga cookie format', () => {
        expect(getClientIdFromCookie('GA1.2.1234567890.0987654321')).toBe(
            '1234567890.0987654321'
        );
    });
});

describe('segmentation - getGaClientId', () => {
    let cookieValue;

    const setCookie = value => {
        cookieValue = value;
    };

    beforeEach(() => {
        cookieValue = '';
        Object.defineProperty(document, 'cookie', {
            configurable: true,
            get: () => cookieValue
        });
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('resolves clientId on the first attempt when cookie is present', async () => {
        setCookie('_ga=GA1.2.1111111111.2222222222');
        const result = await getGaClientId();
        expect(result).toBe('1111111111.2222222222');
    });

    it('retries until cookie appears within retry budget', async () => {
        setCookie('');
        const promise = getGaClientId({ maxRetries: 3, intervalMs: 200 });

        await Promise.resolve();
        setCookie('_ga=GA1.2.9999999999.8888888888');
        jest.advanceTimersByTime(200);

        const result = await promise;
        expect(result).toBe('9999999999.8888888888');
    });

    it('resolves null when cookie never appears after maxRetries', async () => {
        setCookie('');
        const promise = getGaClientId({ maxRetries: 3, intervalMs: 200 });

        for (let i = 0; i < 3; i += 1) {
            await Promise.resolve();
            jest.advanceTimersByTime(200);
        }

        const result = await promise;
        expect(result).toBeNull();
    });

    it('resolves null in SSR (no window)', async () => {
        const originalWindow = global.window;
        delete global.window;

        const result = await getGaClientId();
        expect(result).toBeNull();

        global.window = originalWindow;
    });
});
