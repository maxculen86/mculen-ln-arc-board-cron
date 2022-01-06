import getQueryParamValue from '../../../../../components/private/common/utils/getQueryParamValue';

describe('Common - utils - getQueryParamValue', () => {
    const siteUrl =
        'https://www.lanacion.com.ar/buscador/?query=cristina&_website=la-nacion-ar';
    const nameQueryParam = 'query';

    test('Test del return de getQueryParamValue', () => {
        const query = getQueryParamValue(siteUrl, nameQueryParam);
        expect(query).toStrictEqual('cristina');
    });
});
