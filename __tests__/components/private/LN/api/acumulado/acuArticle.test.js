jest.mock('../../../../../../components/private/LN/api/v1/common/image', () => {
    return () => {
        return 'image-mock';
    };
});
jest.mock(
    '../../../../../../components/private/LN/api/v1/common/author',
    () => {
        return () => {
            return 'author-mock';
        };
    }
);

import { dateAndTimeForAppsUtil } from '../../../../../../components/private/common/utils/dateAndTimeUtil';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import AcuArticle from '../../../../../../components/private/LN/api/v1/acumulado/article';

describe('Test de articulo en Json acumulado', () => {
    test('Test render data de articulo', () => {
        const resp = AcuArticle(article.globalContent);

        expect(resp.id).toBe(article.globalContent._id);
        expect(resp.subtype).toBe(article.globalContent.subtype);
        expect(resp.titulo).toBe(article.globalContent.headlines.basic);
        expect(resp.fecha).toBe(
            dateAndTimeForAppsUtil(article.globalContent.first_publish_date)
        );
        expect(resp.imagen).toBe('image-mock');
        expect(resp.autor).toBe('author-mock');
    });
});
