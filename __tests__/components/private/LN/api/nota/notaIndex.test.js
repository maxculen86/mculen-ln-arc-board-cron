jest.mock(
    '../../../../../../components/private/LN/api/nota/sectionArticle',
    () => {
        return () => {
            return 'primarySection-mock';
        };
    }
);

jest.mock(
    '../../../../../../components/private/LN/api/nota/aperturaArticle',
    () => {
        return () => {
            return 'apertura-mock';
        };
    }
);

import NotaIndex from '../../../../../../components/private/LN/api/nota';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';

describe('Test de index en JSON de nota', () => {
    const resp = NotaIndex(article.globalContent);
    it('Render de atributos meta', () => {
        expect(resp.id).toBe(article.globalContent._id);
        expect(resp.subtype).toBe(article.globalContent.subtype);
        expect(resp.url).toBe(article.globalContent.website_url);
        expect(resp.comments).toBe(true);
        expect(resp.entradaId).toBe(
            article.globalContent.label.livefyre_entrada_id.text
        );
        expect(resp.publishDate).toBe(article.globalContent.publish_date);
        expect(resp.firstPublishDate).toBe(
            article.globalContent.first_publish_date
        );
        expect(resp.primarySection).toBe('primarySection-mock');
        expect(resp.apertura).toBe('apertura-mock');
    });
});
