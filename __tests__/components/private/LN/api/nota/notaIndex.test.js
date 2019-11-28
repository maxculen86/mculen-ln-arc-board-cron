import NotaIndex from '../../../../../../components/private/LN/api/nota';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';

//   id,
//         subtype,
//         url,
//         comments: dataNota.comments ? dataNota.comments.allow_comments : true,
//         entradaId,
//         publishDate,
//         firstPublishDate,
//         pimarySection: primarySection ? Section(primarySection) : undefined,
//         apertura: Apertura(dataNota)

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
    });
});
