import env from '../../../../../../__mocks__/fusion:environment';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import AcuArticle from '../../../../../../components/private/LN/api/v1/acumulado/article';
import AcuList from '../../../../../../components/private/LN/api/v1/common/articles/list';
import { dateAndTimeForAppsUtil } from '../../../../../../components/private/common/utils/dateAndTimeUtil';

describe('Test de articulo en Json acumulado', () => {
    test('Test render data de articulo', () => {
        const resp = AcuList(AcuArticle, article.content_elements);

        expect(resp[0].id).toBe(article.content_elements[0]._id);
        expect(resp[0].templateId).toBe(article.content_elements[0].subtype);
        expect(resp[0].titulo).toBe(
            article.content_elements[0].headlines.basic
        );
    });

    test('Test Fecha del articulo', () => {
        const resp = AcuArticle(article.content_elements[0]);
        expect(resp.fecha).toBe(
            dateAndTimeForAppsUtil(
                article.content_elements[0].first_publish_date
            )
        );
    });

    test('Test Articulo sin Autor', () => {
        const resp = AcuArticle(article.content_elements[3]);
        expect(resp.autores).toBeUndefined();
    });

    test('Test Articulo con Autor vacio', () => {
        const resp = AcuArticle(article.content_elements[8]);
        expect(resp.autores).toBeUndefined();
    });

    test('Test Articulo con Autor sin type author', () => {
        const resp = AcuArticle(article.content_elements[9]);
        expect(resp.autores).toBeUndefined();
    });

    test('Autores del articulo', () => {
        const resp = AcuArticle(article.content_elements[1]);
        expect(resp.autores[0].id).toBe('Ignacio Madrid');
        expect(resp.autores[0].slug).toBe('Ignacio Madrid');
        expect(resp.autores[0].valor).toBe('Ignacio  Madrid');
        expect(resp.autores[0].tipo).toBe(1);

        expect(resp.autores[1].id).toBe(4189);
        expect(resp.autores[1].slug).toBe('max-fisher-4189');
        expect(resp.autores[1].valor).toBe('Max Fisher');
        expect(resp.autores[1].tipo).toBe(1);
    });

    test('Test imagen de Autores de articulo', () => {
        const resp = AcuArticle(article.content_elements[2]);
        expect(resp.autores[0].image['_t']).toBe('img');
        expect(resp.autores[0].image.baseUrl).toBe(
            'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/{{param}}/bucket.glanacion.com/anexos/fotos/33/3121633.png'
        );
        expect(resp.autores[0].image.parametros[0].ancho).toBe(768);
        expect(resp.autores[0].image.parametros[0].firma).toBe(
            '1A2IA1EhLsE2VJ1rysww_o0qLYc=/768x513/smart'
        );
    });

    test('Imagenes del articulo', () => {
        const resp = AcuArticle(article.content_elements[9]);
        expect(resp.imagen.id).toBe('LGFOVH6SFFGZVP5V3V7NOW2KFY');
        expect(resp.imagen['_t']).toBe('img');
        expect(resp.imagen.baseUrl).toBe(
            'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/LGFOVH6SFFGZVP5V3V7NOW2KFY.jpg'
        );
        expect(resp.imagen.parametros[0].ancho).toBe(278);
        expect(resp.imagen.parametros[0].firma).toBe(
            'xXjJBfZwE6c26vxfxgfHerlzovg=/278x186/smart'
        );
        expect(resp.imagen.parametros[1].ancho).toBe(344);
        expect(resp.imagen.parametros[1].firma).toBe(
            'HU7HHdAlJjMA1Wo_zPVxdiJEJg8=/344x230/smart'
        );
        expect(resp.imagen.parametros[2].ancho).toBe(768);
        expect(resp.imagen.parametros[2].firma).toBe(
            'RsqppSDbxLIgBko6JrbcfGp8QUA=/768x513/smart'
        );
        expect(resp.imagen.parametros[3].ancho).toBe(350);
        expect(resp.imagen.parametros[3].firma).toBe(
            'Xcn5wLWNR-Jzz6cOGmNUu806tWc=/350x234/smart'
        );
        expect(resp.imagen.parametros[4].ancho).toBe(360);
        expect(resp.imagen.parametros[4].firma).toBe(
            'Tu91squMfjTVK8l7oVOdLYs_GHw=/360x234/smart'
        );
    });
});
