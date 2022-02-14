import parseUrl from '../../../../content/sources/utils/parseUrl';
import logger from '../../../../components/private/common/utils/logger';

jest.mock('../../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

describe('Test return of parseUrl', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const loggerPush = jest.spyOn(logger, 'push');
    const infoError = 'URL duplicada: Te puede interesar';
    const arcSite = 'la-nacion-ar';
    it('Test return parseUrl, when URL is incorrect', () => {
        const url =
            'https://www.lanacion.com.ar/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551//lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/';

        expect(parseUrl(url, infoError, arcSite)).toStrictEqual(
            'https://www.lanacion.com.ar/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/'
        );

        expect(loggerPush).toBeCalledTimes(1);
    });

    it('Test return parseUrl when a url is correct ', () => {
        const url =
            'https://www.lanacion.com.ar/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/';

        expect(parseUrl(url, infoError, arcSite)).toStrictEqual(
            'https://www.lanacion.com.ar/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/'
        );
    });

    it('Test return parseUrl when a path is incorrect', () => {
        const url =
            '/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551//lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/';

        expect(parseUrl(url, infoError, arcSite)).toStrictEqual(
            '/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/'
        );

        expect(loggerPush).toBeCalledTimes(1);
    });

    it('Test return parseUrl, when URL is incorrect in local', () => {
        const url =
            'https://www.lanacion.com.ar/el-mundo/un-argentino-contrajo-coronavirus-en-el-crucero-en-japon-y-se-convirtio-en-el-primer-paciente-nid07022020/?adstest=true&_website=la-nacion-ar/el-mundo/un-argentino-contrajo-coronavirus-en-el-crucero-en-japon-y-se-convirtio-en-el-primer-paciente-nid07022020/';

        const loggerPush = jest.spyOn(logger, 'push');

        expect(parseUrl(url, infoError, arcSite)).toStrictEqual(
            'https://www.lanacion.com.ar/el-mundo/un-argentino-contrajo-coronavirus-en-el-crucero-en-japon-y-se-convirtio-en-el-primer-paciente-nid07022020/'
        );

        expect(loggerPush).toBeCalledTimes(1);
    });
    it('Test return parseUrl, when url is undefined', () => {
        expect(parseUrl()).toStrictEqual('https://www.lanacion.com.ar/');
    });
});
