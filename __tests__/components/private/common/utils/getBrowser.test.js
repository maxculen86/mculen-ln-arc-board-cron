import getBrowser from '../../../../../components/private/common/utils/getBrowser';

describe('Util - getBrowser', () => {
    beforeEach(() => {
        delete global.navigator;
    });

    test('Should return safari', () => {
        global.navigator = {
            userAgent:
                'Mozilla/5.0 (Windows; U; Windows NT 6.1; es-AR) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16'
        };
        expect(getBrowser()).toStrictEqual('Safari');
    });

    test('Should return Firefox', () => {
        global.navigator = {
            userAgent:
                'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:104.0) Gecko/20100101 Firefox/104.0'
        };
        expect(getBrowser()).toStrictEqual('Firefox');
    });

    test('Should return Opera', () => {
        global.navigator = {
            userAgent:
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36 OPR/84.0.4316.14'
        };
        expect(getBrowser()).toStrictEqual('Opera');
    });

    test('Should return Edge', () => {
        global.navigator = {
            userAgent:
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 EDG/84.0.4316.14'
        };
        expect(getBrowser()).toStrictEqual('Edge');
    });

    test('Should return Chrome', () => {
        global.navigator = {
            userAgent:
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
        };
        expect(getBrowser()).toStrictEqual('Chrome');
    });

    test('should return undefined when navigator is not defined', () => {
        expect(getBrowser()).toStrictEqual(undefined);
    });
});
