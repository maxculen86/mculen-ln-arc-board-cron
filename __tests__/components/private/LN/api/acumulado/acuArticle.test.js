jest.mock('../../../../../../components/private/LN/api/acumulado/acuImage');
jest.mock('../../../../../../components/private/LN/api/acumulado/acuAuthor');

import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import AcuArticle from '../../../../../../components/private/LN/api/acumulado/article';

describe('Test de articulo en Json acumulado', () => {
    test('Test render data de articulo', () => {
        const resp = AcuArticle(article.globalContent);

        expect(resp.id).toBe(article.globalContent._id);
        expect(resp.subtype).toBe(article.globalContent.subtype);
        expect(resp.title).toBe(article.globalContent.headlines.basic);
    });
});
