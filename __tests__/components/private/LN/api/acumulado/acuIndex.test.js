jest.mock(
    '../../../../../../components/private/LN/api/v1/acumulado/articleList',
    () => {
        return () => {
            return 'list-mock';
        };
    }
);

import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import AcuIndex from '../../../../../../components/private/LN/api/v1/acumulado';

describe('Test de index en Json acumulado', () => {
    const dataMock = { name: 'Acu Test', next: true, articles: [] };
    test('Test render', () => {
        const resp = AcuIndex(dataMock.name, dataMock.articles, dataMock.next);

        expect(resp.paginar).toBe(dataMock.next);
        expect(resp.titulo).toBe(dataMock.name);
        expect(resp.notas).toBe('list-mock');
    });
});
