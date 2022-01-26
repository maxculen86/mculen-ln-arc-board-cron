import getQueryParamValue from '../../../../../components/private/common/utils/getQueryParamValue';

describe('Common - utils - getQueryParamValue', () => {
    const siteUrl =
        'https://www.lanacion.com.ar/buscador/?query=cristina&_website=la-nacion-ar';
    const nameQueryParam = 'query';

    const siteUrl2 =
        'https://www.lanacion.com.ar/politica/?adstest=true&_website=la-nacion-ar';
    const siteUrl3 =
        'https://www.lanacion.com.ar/politica/?adstest=null&_website=la-nacion-ar';
    const nameQueryParam2 = 'adstest';

    test('Test del return de getQueryParamValue', () => {
        const query = getQueryParamValue(nameQueryParam, siteUrl);
        expect(query).toStrictEqual('cristina');
    });

    test('Test para el caso del query param: adstest', () => {
        const query = getQueryParamValue(nameQueryParam2, siteUrl2);
        expect(query).toStrictEqual('true');
    });

    test('Test para el caso de que el query param adstest sea null', () => {
        const query = getQueryParamValue(nameQueryParam2, siteUrl3);
        expect(query).toStrictEqual('false');
    });
});
