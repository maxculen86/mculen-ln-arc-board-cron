import getViewport, {
    getDevice,
    isTabletOrMobile
} from '../../../../../components/private/LN/common/utils/screenHelper';

describe('Test function getDevice', () => {
    it('Test return function getDevice in mobile', () => {
        expect(getDevice(true, false)).toStrictEqual('mobile');
    });

    it('Test return function getDevice in tablet', () => {
        expect(getDevice(false, true)).toStrictEqual('tablet');
    });

    it('Test return function getDevice in desktop', () => {
        expect(getDevice(false, false)).toStrictEqual('desktop');
    });
});

describe('Test return function isTabletOrMobile', () => {
    it('Test return when userAgent is string empty', () => {
        expect(isTabletOrMobile('')).toStrictEqual(false);
    });
});

describe('Test return function getViewport', () => {
    it('Test return getViewport', () => {
        delete global.screen;
        delete global.navigator;
        global.screen = {
            width: 1100
        };
        global.navigator = {
            vendor: 'Google Inc.'
        };
        expect(getViewport()).toStrictEqual({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
            device: 'desktop'
        });
    });

    it('Test return getViewport for navigator in undefined', () => {
        delete global.screen;
        delete global.navigator;
        global.screen = {
            width: 1100
        };
        global.navigator = undefined;

        global.window.opera = 'opera';
        expect(getViewport()).toStrictEqual({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
            device: 'desktop'
        });
    });

    it('Test return getViewport for window in undefined', () => {
        delete global.window;
        global.window = undefined;
        expect(getViewport()).toStrictEqual({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
            device: 'desktop'
        });
    });
});
