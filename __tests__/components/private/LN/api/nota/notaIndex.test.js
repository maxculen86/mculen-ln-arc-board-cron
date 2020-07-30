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
import articleHtml from '../../../../../../__mocks__/data/nota/cuerpo/notaHtml.json';
import article from '../../../../../../__mocks__/data/nota/notaRoot.json';
import dateAndTimeUtil from '../../../../../../components/private/common/utils/dateAndTimeUtil';

describe('Test de index en JSON de nota', () => {
    it('Render de atributos meta para template Html', () => {
        const resp = NotaIndex(articleHtml);
        expect(resp.id).toBe(articleHtml._id);
        expect(resp.template).toBe(articleHtml.subtype);
        expect(resp.url).toBe(articleHtml.website_url);
        expect(resp.mostrarBanners).toBe(true);
        expect(resp.paywallStatus).toBe(articleHtml.content_restrictions.content_code);
        expect(resp.fechaActualizacion).toBeUndefined();
        expect(resp.fecha).toBeUndefined();
        expect(resp.enviarApps).toBe(true);
        expect(resp.apertura).toBeUndefined();
    });

    it('Render de atributos meta', () => {
        const resp = NotaIndex(article);
        const { date, time } = dateAndTimeUtil(article.first_publish_date);
        const { date: publishDate, time: updateTime } = dateAndTimeUtil(
            article.publish_date
        );
        const impresa =
            typeof edicion !== 'undefined' &&
            edicion.toLowerCase() === 'impresa'
                ? true
                : false;

        expect(resp.id).toBe(article._id);
        expect(resp.template).toBe(article.subtype);
        expect(resp.url).toBe(article.website_url);
        expect(resp.mostrarBanners).toBe(true);
        expect(resp.paywallStatus).toBe(
            article.content_restrictions.content_code
        );
        expect(resp.abiertoComentarios).toBe(false);
        expect(resp.comentariosId).toBe(article.label.livefyre_entrada_id.text);
        expect(resp.fechaActualizacion).toBe(
            `${date}${!impresa ? ` • ${time}` : ''}`
        );
        expect(resp.fecha).toBe(
            `${publishDate}${!impresa ? ` • ${updateTime}` : ''}`
        );
        expect(resp.enviarApps).toBe(true);
        expect(resp.categoria).toBe('primarySection-mock');
        expect(resp.apertura).toBe('apertura-mock');
        expect(resp.relacionados).toBe('relacionados-mock');
    });
});
