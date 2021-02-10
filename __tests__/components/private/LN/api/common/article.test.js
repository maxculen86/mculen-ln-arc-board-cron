import env from '../../../../../../__mocks__/fusion:environment';
import articlesRanking from '../../../../../../__mocks__/data/articleRankingCollections/recetas.json';
import articlesAcumulado from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import articlesTPInteresar from '../../../../../../__mocks__/data/articles/tePuedeInteresar.json';
import AcuList from '../../../../../../components/private/LN/api/v1/common/articles/list';
import Article from '../../../../../../components/private/LN/api/v1/common/articles/index';
import { dateAndTimeForAppsUtil } from '../../../../../../components/private/common/utils/dateAndTimeUtil';

describe('Test de index en Json', () => {
    const respRanking = AcuList(Article, articlesRanking.content_elements);
    const respAcumulado = AcuList(Article, articlesAcumulado.content_elements);
    const respTPInteresar = AcuList(Article, articlesTPInteresar);

    test('Test render data de articulo', () => {
        expect(respTPInteresar[0].id).toBe(articlesTPInteresar[0]._id);
        expect(respTPInteresar[0].templateId).toBe(
            articlesTPInteresar[0].subtype
        );
        expect(respTPInteresar[0].titulo).toBe(
            articlesTPInteresar[0].headlines.basic
        );
        expect(respTPInteresar[0].url).toBe(articlesTPInteresar[0].website_url);
    });

    test('Test Fecha del articulo', () => {
        expect(respTPInteresar[0].fecha).toBe(
            dateAndTimeForAppsUtil(articlesTPInteresar[0].display_date)
        );
    });

    test('Test Articulo sin Autor', () => {
        expect(respTPInteresar[3].autores).toBeUndefined();
    });

    test('Test Articulo con Autor vacio', () => {
        expect(respTPInteresar[8].autores).toBeUndefined();
    });

    test('Test Articulo con Autor sin type author', () => {
        expect(respTPInteresar[9].autores).toBeUndefined();
    });

    test('Imagenes del articulo', () => {
        expect(respTPInteresar[0].imagen['_t']).toBe('img');
        expect(respTPInteresar[0].imagen.baseUrl).toBe(
            '/resizer/{{param}}/bucket2.glanacion.com/anexos/fotos/94/3446794.jpg'
        );
        expect(respTPInteresar[0].imagen.parametros[0].ancho).toBe(768);
        expect(respTPInteresar[0].imagen.parametros[0].firma).toBe(
            'Ovvdkcs13HUJ7VQysRS-3JO1NIo=/768x513/smart/filters:quality(70)'
        );
        expect(respTPInteresar[0].imagen.parametros[1].ancho).toBe(360);
        expect(respTPInteresar[0].imagen.parametros[1].firma).toBe(
            '2Rifu6S-2jyVOQlG4gkWJPDFkxQ=/360x240/filters:quality(70)'
        );
        expect(respTPInteresar[0].imagen.parametros[2].ancho).toBe(360);
        expect(respTPInteresar[0].imagen.parametros[2].firma).toBe(
            'foWiBsfin59DMdAtjiMek7UTDTE=/360x234/smart/filters:quality(70)'
        );
        expect(respTPInteresar[0].imagen.parametros[3].ancho).toBe(350);
        expect(respTPInteresar[0].imagen.parametros[3].firma).toBe(
            'Ryh_P4HUvecHEPdFYHIh8EqdDM4=/350x234/smart/filters:quality(70)'
        );
    });

    test('Test render data de articulo', () => {
        expect(respAcumulado[0].id).toBe(
            articlesAcumulado.content_elements[0]._id
        );
        expect(respAcumulado[0].templateId).toBe(
            articlesAcumulado.content_elements[0].subtype
        );
        expect(respAcumulado[0].titulo).toBe(
            articlesAcumulado.content_elements[0].headlines.basic
        );
        expect(respAcumulado[0].url).toBe(
            articlesAcumulado.content_elements[0].website_url
        );
        expect(respAcumulado[0].bajada).toBe(
            articlesAcumulado.content_elements[0].subheadlines.basic
        );
    });

    test('Test Fecha del articulo', () => {
        expect(respAcumulado[0].fecha).toBe(
            dateAndTimeForAppsUtil(
                articlesAcumulado.content_elements[0].display_date
            )
        );
    });

    test('Test Articulo sin Autor', () => {
        expect(respAcumulado[3].autores).toBeUndefined();
    });

    test('Test Articulo con Autor vacio', () => {
        expect(respAcumulado[8].autores).toBeUndefined();
    });

    test('Test Articulo con Autor sin type author', () => {
        expect(respAcumulado[9].autores).toBeUndefined();
    });

    test('Autores del articulo', () => {
        expect(respAcumulado[1].autores[0].id).toBe('Ignacio Madrid');
        expect(respAcumulado[1].autores[0].slug).toBe('Ignacio Madrid');
        expect(respAcumulado[1].autores[0].valor).toBe('Ignacio  Madrid');
        expect(respAcumulado[1].autores[0].tipo).toBe(1);
        expect(respAcumulado[1].autores[1].id).toBe(4189);
        expect(respAcumulado[1].autores[1].slug).toBe('max-fisher-4189');
        expect(respAcumulado[1].autores[1].valor).toBe('Max Fisher');
        expect(respAcumulado[1].autores[1].tipo).toBe(1);
    });

    test('Test imagen de Autores de articulo', () => {
        expect(respAcumulado[2].autores[0].image['_t']).toBe('img');
        expect(respAcumulado[2].autores[0].image.baseUrl).toBe(
            '/resizer/{{param}}/bucket.glanacion.com/anexos/fotos/33/3121633.png'
        );
        expect(respAcumulado[2].autores[0].image.parametros[0].ancho).toBe(768);
        expect(respAcumulado[2].autores[0].image.parametros[0].firma).toBe(
            '1A2IA1EhLsE2VJ1rysww_o0qLYc=/768x513/smart'
        );
    });

    test('Imagenes del articulo', () => {
        expect(respAcumulado[9].imagen.id).toBe('LGFOVH6SFFGZVP5V3V7NOW2KFY');
        expect(respAcumulado[9].imagen['_t']).toBe('img');
        expect(respAcumulado[9].imagen.baseUrl).toBe(
            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/LGFOVH6SFFGZVP5V3V7NOW2KFY.jpg'
        );
        expect(respAcumulado[9].imagen.parametros[0].ancho).toBe(768);
        expect(respAcumulado[9].imagen.parametros[0].firma).toBe(
            'RsqppSDbxLIgBko6JrbcfGp8QUA=/768x513/smart'
        );
        expect(respAcumulado[9].imagen.parametros[1].ancho).toBe(360);
        expect(respAcumulado[9].imagen.parametros[1].firma).toBe(
            'Tu91squMfjTVK8l7oVOdLYs_GHw=/360x234/smart'
        );
        expect(respAcumulado[9].imagen.parametros[2].ancho).toBe(350);
        expect(respAcumulado[9].imagen.parametros[2].firma).toBe(
            'Xcn5wLWNR-Jzz6cOGmNUu806tWc=/350x234/smart'
        );
        expect(respAcumulado[9].imagen.parametros[3].ancho).toBe(344);
        expect(respAcumulado[9].imagen.parametros[3].firma).toBe(
            'HU7HHdAlJjMA1Wo_zPVxdiJEJg8=/344x230/smart'
        );
        expect(respAcumulado[9].imagen.parametros[4].ancho).toBe(278);
        expect(respAcumulado[9].imagen.parametros[4].firma).toBe(
            'xXjJBfZwE6c26vxfxgfHerlzovg=/278x186/smart'
        );
    });

    test('Test render data de articulo', () => {
        expect(respRanking[0].id).toBe(articlesRanking.content_elements[0]._id);
        expect(respRanking[0].templateId).toBe(
            articlesRanking.content_elements[0].subtype
        );
        expect(respRanking[0].titulo).toBe(
            articlesRanking.content_elements[0].headlines.basic
        );
        expect(respRanking[0].url).toBe(
            articlesRanking.content_elements[0].website_url
        );
        expect(respRanking[0].bajada).toBe(
            articlesRanking.content_elements[0].subheadlines.basic
        );
    });

    test('Test render data de articulo Ranking titulo', () => {
        expect(respRanking[0].titulo).not.toBe(
            articlesRanking.content_elements[0].headlines.mobile
        );
        expect(respRanking[0].titulo).toBe(
            articlesRanking.content_elements[0].headlines.basic
        );
    });

    test('Test render data de articulo Ranking titulo Mobile', () => {
        expect(respRanking[2].titulo).toBe(
            articlesRanking.content_elements[2].headlines.mobile
        );
    });

    test('Test render data de articulo sin imagen', () => {
        expect(respRanking[1].imagen).toBeUndefined();
    });

    test('Imagenes del articulo', () => {
        expect(respRanking[0].imagen['_t']).toBe('img');
        expect(respRanking[0].imagen.baseUrl).toBe(
            '/resizer/{{param}}/www.lanacion.com.ar/resizer/YcJ0gmw6h3B4fXhg5pbuZ8H1uzg=/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/AZ6A7LN5SFDKHG7KHRRJ43FOEE.jpg'
        );
        expect(respRanking[0].imagen.parametros[0].ancho).toBe(768);
        expect(respRanking[0].imagen.parametros[0].firma).toBe(
            '3rTgc9lUK5alrZXDhSplwsoCIKY=/768x513/smart'
        );
        expect(respRanking[0].imagen.parametros[1].ancho).toBe(360);
        expect(respRanking[0].imagen.parametros[1].firma).toBe(
            'rOip72RROban7m1g3eTptCLHu2A=/360x234/smart'
        );
        expect(respRanking[0].imagen.parametros[2].ancho).toBe(350);
        expect(respRanking[0].imagen.parametros[2].firma).toBe(
            '-DltLyGogW8thkDsacSPwDsL5Vg=/350x234/smart'
        );
        expect(respRanking[0].imagen.parametros[3].ancho).toBe(344);
        expect(respRanking[0].imagen.parametros[3].firma).toBe(
            'u7prcuGJ9u3mTD7wHR1Bsfghsds=/344x230/smart'
        );
        expect(respRanking[0].imagen.parametros[4].ancho).toBe(278);
        expect(respRanking[0].imagen.parametros[4].firma).toBe(
            'LQ03Y-iOcWjwQct4YQRLT0jJrT8=/278x186/smart'
        );
    });

    test('Test Fecha del articulo', () => {
        expect(respRanking[0].fechaActualizacion).toBe(
            dateAndTimeForAppsUtil(
                articlesRanking.content_elements[0].last_updated_date
            )
        );
    });

    test('Test Fecha del articulo', () => {
        expect(respRanking[0].fecha).toBe(
            dateAndTimeForAppsUtil(
                articlesRanking.content_elements[0].display_date
            )
        );
    });

    test('Test Articulo con Autor vacio', () => {
        expect(respRanking[2].autores).toBeUndefined();
    });

    test('Test Articulo sin Autor', () => {
        expect(respRanking[3].autores).toBeUndefined();
    });

    test('Test Articulo con Autor sin type author', () => {
        expect(respRanking[7].autores).toBeUndefined();
    });

    test('Autores del articulo', () => {
        expect(respRanking[0].autores[0].valor).toBe('Vinciane Smeets');
        expect(respRanking[0].autores[0].tipo).toBe(1);
    });

    test('Sin Categoria principal', () => {
        expect(respRanking[1].categoria).toBeUndefined();
    });

    test('Categoria principal', () => {
        expect(respRanking[0].categoria.id).toBe(43);
        expect(respRanking[0].categoria.valor).toBe('Recetas');
    });

    test('Sin Tags', () => {
        expect(respRanking[1].tags).toBeUndefined();
    });

    test('Tags Vacios', () => {
        expect(respRanking[2].tags).toBeUndefined();
    });

    test('Tags', () => {
        expect(respRanking[0].tags[0].id).toBe(48378);
        expect(respRanking[0].tags[0].slug).toBe('harina-integral-tid48378');
        expect(respRanking[0].tags[0].valor).toBe('harina integral');
        expect(respRanking[0].tags[0].tipoId).toBe(1);
        expect(respRanking[0].tags[0].formatoId).toBe(1);
        expect(respRanking[0].tags[0].tipoDescripcion).toBe('Topico');
        expect(respRanking[0].tags[1].id).toBe(47216);
        expect(respRanking[0].tags[1].slug).toBe('espinaca-tid47216');
        expect(respRanking[0].tags[1].valor).toBe('espinaca');
        expect(respRanking[0].tags[1].tipoId).toBe(1);
        expect(respRanking[0].tags[1].formatoId).toBe(1);
        expect(respRanking[0].tags[1].tipoDescripcion).toBe('Topico');
    });
});
