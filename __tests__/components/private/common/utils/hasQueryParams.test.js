import hasQueryParams from '../../../../../components/private/common/utils/hasQueryParams';

describe('Common - utils - hasQueryParams', () => {
    const siteUrl =
        'https://www.lanacion.com.ar/buscador/?query=cristina&_website=la-nacion-ar';
    const nameQueryParam = 'query';

    test('Test del return de hasQueryParams', () => {
        const query = hasQueryParams(siteUrl, nameQueryParam);
        expect(query).toStrictEqual('cristina');
    });
});
