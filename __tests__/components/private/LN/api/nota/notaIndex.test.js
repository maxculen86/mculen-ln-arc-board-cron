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

jest.mock(
    '../../../../../../components/private/LN/api/v1/nota/relacionados',
    () => {
        return () => {
            return 'relacionados-mock';
        };
    }
);

import NotaIndex from '../../../../../../components/private/LN/api/v1/nota';
import article from '../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';
import { dateAndTimeForAppsUtil } from '../../../../../../components/private/common/utils/dateAndTimeUtil';

describe('Test de index en JSON de nota', () => {
    const resp = NotaIndex(article);

    it('Render de atributos meta', () => {
        expect(resp.id).toBe(article._id);
        expect(resp.template).toBe(article.subtype);
        expect(resp.url).toBe(article.website_url);
        expect(resp.paywallStatus).toBe(
            article.content_restrictions.content_code
        );
        expect(resp.abiertoComentarios).toBe(true);
        expect(resp.entradaId).toBe(article.label.livefyre_entrada_id.text);
        expect(resp.fechaActualizacion).toBe(
            dateAndTimeForAppsUtil(article.publish_date)
        );
        expect(resp.fecha).toBe(
            dateAndTimeForAppsUtil(article.first_publish_date)
        );
        expect(resp.categoria).toBe('primarySection-mock');
        expect(resp.apertura).toBe('apertura-mock');
        expect(resp.relacionados).toBe('relacionados-mock');
    });
});
