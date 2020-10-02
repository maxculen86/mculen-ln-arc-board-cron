import env from '../../../../../../__mocks__/fusion:environment';
import articles from '../../../../../../__mocks__/data/articleRankingCollections/recetas.json';
import AcuList from '../../../../../../components/private/LN/api/v1/common/articles/list';
import RankingArticle from '../../../../../../components/private/LN/api/v1/ranking/article';
import { dateAndTimeForAppsUtil } from '../../../../../../components/private/common/utils/dateAndTimeUtil';

describe('Test de index en Json ranking', () => {
    const resp = AcuList(RankingArticle, articles.content_elements);

    test('Test render data de articulo', () => {
        expect(resp[0].id).toBe(articles.content_elements[0]._id);
        expect(resp[0].template).toBe(articles.content_elements[0].subtype);
        expect(resp[0].titulo).toBe(articles.content_elements[0].headlines.basic);
        expect(resp[0].tituloMobile).toBe(articles.content_elements[0].headlines.mobile);
        expect(resp[0].url).toBe(articles.content_elements[0].website_url);
        expect(resp[0].bajada).toBe(articles.content_elements[0].subheadlines.basic);
    });

    test('Test render data de articulo sin imagen', () => {
        expect(resp[1].imagen).toBeUndefined();
    });

    test('Imagenes del articulo', () => {
        expect(resp[0].imagen['_t']).toBe("img");
        expect(resp[0].imagen.baseUrl).toBe("https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/{{param}}/smart/www.lanacion.com.ar/resizer/YcJ0gmw6h3B4fXhg5pbuZ8H1uzg=/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/AZ6A7LN5SFDKHG7KHRRJ43FOEE.jpg");
        expect(resp[0].imagen.parametros[0].ancho).toBe(278);
        expect(resp[0].imagen.parametros[0].firma).toBe("LQ03Y-iOcWjwQct4YQRLT0jJrT8=/278x186");
        expect(resp[0].imagen.parametros[1].ancho).toBe(344);
        expect(resp[0].imagen.parametros[1].firma).toBe("u7prcuGJ9u3mTD7wHR1Bsfghsds=/344x230");
        expect(resp[0].imagen.parametros[2].ancho).toBe(768);
        expect(resp[0].imagen.parametros[2].firma).toBe("3rTgc9lUK5alrZXDhSplwsoCIKY=/768x513");
        expect(resp[0].imagen.parametros[3].ancho).toBe(350);
        expect(resp[0].imagen.parametros[3].firma).toBe("-DltLyGogW8thkDsacSPwDsL5Vg=/350x234");
        expect(resp[0].imagen.parametros[4].ancho).toBe(360);
        expect(resp[0].imagen.parametros[4].firma).toBe("rOip72RROban7m1g3eTptCLHu2A=/360x234");
    });

    test('Test Fecha del articulo', () => {
        expect(resp[0].fechaActualizacion).toBe(dateAndTimeForAppsUtil(articles.content_elements[0].last_updated_date))
    });

    test('Test Articulo con Autor vacio', () => {
        expect(resp[2].autores).toBeUndefined()
    });

    test('Test Articulo sin Autor', () => {
        expect(resp[3].autores).toBeUndefined()
    });

    test('Test Articulo con Autor sin type author', () => {
        expect(resp[7].autores).toBeUndefined()
    });

    test('Autores del articulo', () => {
        expect(resp[0].autor.valor).toBe("Vinciane Smeets");
        expect(resp[0].autor.tipo).toBe(1);
    });

    test('Sin Categoria principal', () => {
        expect(resp[1].categoria).toBeUndefined()
    });

    test('Categoria principal', () => {
        expect(resp[0].categoria.id).toBe(43);
        expect(resp[0].categoria.valor).toBe('Recetas');
    });

    test('Sin Tags', () => {
        expect(resp[1].tags).toBeUndefined()
    });

    test('Tags Vacios', () => {
        expect(resp[2].tags).toBeUndefined()
    });

    test('Tags', () => {
        expect(resp[0].tags[0].id).toBe(48378);
        expect(resp[0].tags[0].slug).toBe('harina-integral-tid48378');
        expect(resp[0].tags[0].valor).toBe('harina integral');
        expect(resp[0].tags[0].tipoId).toBe(1);
        expect(resp[0].tags[0].formatoId).toBe(1);
        expect(resp[0].tags[0].tipoDescripcion).toBe('Topico');

        expect(resp[0].tags[1].id).toBe(47216);
        expect(resp[0].tags[1].slug).toBe('espinaca-tid47216');
        expect(resp[0].tags[1].valor).toBe('espinaca');
        expect(resp[0].tags[1].tipoId).toBe(1);
        expect(resp[0].tags[1].formatoId).toBe(1);
        expect(resp[0].tags[1].tipoDescripcion).toBe('Topico');
    });

});