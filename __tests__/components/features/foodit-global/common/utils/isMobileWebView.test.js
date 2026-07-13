import { isMobileWebView } from '../../../../../../components/features/foodit-global/common/utils/isMobileWebView';

describe('isMobileWebView', () => {
    afterEach(() => {
        delete window.mobileWebView;
    });

    it('returns true when window.mobileWebView is defined', () => {
        window.mobileWebView = { logEvent: jest.fn() };
        expect(isMobileWebView()).toBe(true);
    });

    it('returns false when window.mobileWebView is not defined', () => {
        expect(isMobileWebView()).toBe(false);
    });

    it('returns false in SSR context (window undefined)', () => {
        const original = global.window;
        delete global.window;
        expect(isMobileWebView()).toBe(false);
        global.window = original;
    });
});
