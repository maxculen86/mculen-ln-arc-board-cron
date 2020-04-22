jest.mock(
    '../../../../../../components/private/LN/api/v1/nota/sectionArticle',
    () => {
        return () => {
            return 'primarySection-mock';
        };
    }
);

jest.mock(
    '../../../../../../components/private/LN/api/v1/nota/aperturaArticle',
    () => {
        return () => {
            return 'apertura-mock';
        };
    }
);

import NotaIndex from '../../../../../../components/private/LN/api/v1/nota';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import { dateAndTimeForAppsUtil } from '../../../../../../components/private/common/utils/dateAndTimeUtil';

describe('Test de index en JSON de nota', () => {
    const resp = NotaIndex(article.globalContent);

    it('Render de atributos meta', () => {
        expect(resp.id).toBe(article.globalContent._id);
        expect(resp.template).toBe(article.globalContent.subtype);
        expect(resp.url).toBe(article.globalContent.website_url);
        expect(resp.abiertoComentarios).toBe(true);
        expect(resp.entradaId).toBe(
            article.globalContent.label.livefyre_entrada_id.text
        );
        expect(resp.fechaActualizacion).toBe(
            dateAndTimeForAppsUtil(article.globalContent.publish_date)
        );
        expect(resp.fecha).toBe(
            dateAndTimeForAppsUtil(article.globalContent.first_publish_date)
        );
        expect(resp.categoria).toBe('primarySection-mock');
        expect(resp.apertura).toBe('apertura-mock');
    });
});
