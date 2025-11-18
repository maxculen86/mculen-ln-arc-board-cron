import isSSR from '../../../../../../components/private/LN/common/utils/isSSR';
import { getAccessSource } from '../../../../../../components/features/foodit-global/common/utils/getAccessSource';

jest.mock('../../../../../../components/private/LN/common/utils/isSSR', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('getAccessSource', () => {
    const originalWindow = global.window;

    afterEach(() => {
        global.window = originalWindow;
        jest.clearAllMocks();
    });

    it('returns "web" in SSR without touching window', () => {
        delete global.window;

        isSSR.mockReturnValue(true);

        const result = getAccessSource();

        expect(isSSR).toHaveBeenCalled();
        expect(result).toBe('web');
    });

    it('returns "pwa" when matchMedia indicates standalone', () => {
        isSSR.mockReturnValue(false);

        global.window = {
            matchMedia: jest.fn().mockReturnValue({ matches: true }),
            navigator: {}
        };

        const result = getAccessSource();

        expect(result).toBe('pwa');
    });

    it('returns "web" when not pwa nor ios standalone', () => {
        isSSR.mockReturnValue(false);

        global.window = {
            matchMedia: jest.fn().mockReturnValue({ matches: false }),
            navigator: { standalone: false }
        };

        const result = getAccessSource();

        expect(result).toBe('web');
    });
});
