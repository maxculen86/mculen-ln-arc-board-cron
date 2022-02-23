import parseUrl from '../../../../content/sources/utils/parseUrl';

describe('Test return of parseUrl', () => {
    it('Test return parseUrl, when URL is incorrect', () => {
        const url =
            'https://www.lanacion.com.ar/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551//lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/';

        expect(parseUrl(url)).toStrictEqual(
            'https://www.lanacion.com.ar/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/'
        );
    });

    it('Test return parseUrl when a url is correct ', () => {
        const url =
            'https://www.lanacion.com.ar/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/';

        expect(parseUrl(url)).toStrictEqual(
            'https://www.lanacion.com.ar/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/'
        );
    });

    it('Test return parseUrl when a path is incorrect', () => {
        const url =
            '/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551//lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/';

        expect(parseUrl(url)).toStrictEqual(
            '/lifestyle/ginseng-que-es-como-se-usa-que-nid2248551/'
        );
    });

    it('Test return parseUrl, when URL is incorrect in local', () => {
        const url =
            'https://www.lanacion.com.ar/el-mundo/un-argentino-contrajo-coronavirus-en-el-crucero-en-japon-y-se-convirtio-en-el-primer-paciente-nid07022020/?adstest=true&_website=la-nacion-ar/el-mundo/un-argentino-contrajo-coronavirus-en-el-crucero-en-japon-y-se-convirtio-en-el-primer-paciente-nid07022020/';

        expect(parseUrl(url)).toStrictEqual(
            'https://www.lanacion.com.ar/el-mundo/un-argentino-contrajo-coronavirus-en-el-crucero-en-japon-y-se-convirtio-en-el-primer-paciente-nid07022020/'
        );
    });
    it('Test return parseUrl, when url is undefined', () => {
        expect(parseUrl()).toStrictEqual('https://www.lanacion.com.ar/');
    });
});
