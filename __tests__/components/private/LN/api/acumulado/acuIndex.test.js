jest.mock(
    '../../../../../../components/private/LN/api/acumulado/articleList',
    () => {
        return () => {
            return 'list-mock';
        };
    }
);

import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import AcuIndex from '../../../../../../components/private/LN/api/acumulado';

describe('Test de index en Json acumulado', () => {
    const dataMock = { name: 'Acu Test', next: true, articles: [] };
    test('Test render', () => {
        const resp = AcuIndex(dataMock.name, dataMock.articles, dataMock.next);

        expect(resp.next).toBe(dataMock.next);
        expect(resp.title).toBe(dataMock.name);
        expect(resp.articles).toBe('list-mock');
    });
});
