jest.mock(
    '../../../../../../components/private/LN/api/v1/acumulado/articleList',
    () => {
        return () => {
            return 'list-mock';
        };
    }
);

import AcuIndex from '../../../../../../components/private/LN/api/v1/acumulado';

describe('Test de index en Json acumulado', () => {
    const dataMock = {
        name: 'Acu Test',
        articles: [],
        paginator:5,
        total:100,
        configuration:{}
    };

    test('Test render', () => {
        const resp = AcuIndex(dataMock);

        expect(resp.paginar).toBe(true);
        expect(resp.titulo).toBe(dataMock.name);
        expect(resp.notas).toBe('list-mock');
    });
});
