jest.mock(
    '../../../../../../components/private/LN/api/v1/nota/sectionArticle',
    () => {
        return () => {
            return 'primarySection-mock';
        };
    }
);

jest.mock(
    '../../../../../../components/private/LN/api/v1/nota/apertura/aperturaArticle',
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
import dateAndTimeUtil from '../../../../../../components/private/common/utils/dateAndTimeUtil';

describe('Test de index en JSON de nota', () => {
    const resp = NotaIndex(article);
    const { date, time } = dateAndTimeUtil(article.first_publish_date);
    const { date:publishDate, time:updateTime } = dateAndTimeUtil(article.publish_date);
    const impresa = typeof edicion !== 'undefined' && edicion.toLowerCase() === 'impresa' ? true: false;

    it('Render de atributos meta', () => { 
        expect(resp.id).toBe(article._id);
        expect(resp.template).toBe(article.subtype);
        expect(resp.url).toBe(article.website_url);
        expect(resp.mostrarBanners).toBe(true);
        expect(resp.paywallStatus).toBe(
            article.content_restrictions.content_code
        );
        expect(resp.abiertoComentarios).toBe(false);
        expect(resp.comentariosId).toBe(article.label.livefyre_entrada_id.text);
        expect(resp.fechaActualizacion).toBe(`${date}${!impresa ? ` • ${time}` : ''}`);
        expect(resp.fecha).toBe(`${publishDate}${!impresa ? ` • ${updateTime}` : ''}`
        );
        expect(resp.categoria).toBe('primarySection-mock');
        expect(resp.apertura).toBe('apertura-mock');
        expect(resp.relacionados).toBe('relacionados-mock');
    });
});