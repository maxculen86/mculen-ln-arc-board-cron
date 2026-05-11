import { detectIncognitoMode } from '../../../../../components/private/LN/common/utils/incognitoDetector';

const BYTES_PER_MEBIBYTE = 1024 * 1024;

const setChromiumQuota = quota => {
    Object.defineProperty(window.performance, 'memory', {
        configurable: true,
        value: {
            jsHeapSizeLimit: 100 * BYTES_PER_MEBIBYTE
        }
    });

    Object.defineProperty(navigator, 'webkitTemporaryStorage', {
        configurable: true,
        value: {
            queryUsageAndQuota: jest.fn(success => success(0, quota))
        }
    });
};

describe('incognitoDetector', () => {
    beforeEach(() => {
        delete window.__LNIncognitoModePromise;
    });

    afterEach(() => {
        delete window.__LNIncognitoModePromise;
        delete navigator.webkitTemporaryStorage;
        delete window.performance.memory;
        jest.clearAllMocks();
    });

    it('detects private Chromium windows when reported quota is below the limit', async () => {
        setChromiumQuota(10 * BYTES_PER_MEBIBYTE);

        await expect(detectIncognitoMode()).resolves.toBe(true);
    });

    it('detects standard Chromium windows when reported quota is above the limit', async () => {
        setChromiumQuota(500 * BYTES_PER_MEBIBYTE);

        await expect(detectIncognitoMode()).resolves.toBe(false);
    });

    it('caches the detection promise for the page lifecycle', async () => {
        setChromiumQuota(10 * BYTES_PER_MEBIBYTE);

        await detectIncognitoMode();
        await detectIncognitoMode();

        expect(
            navigator.webkitTemporaryStorage.queryUsageAndQuota
        ).toHaveBeenCalledTimes(1);
    });
});
