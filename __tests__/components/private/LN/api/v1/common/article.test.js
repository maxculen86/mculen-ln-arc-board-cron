import articlesRanking from '../../../../../../../__mocks__/data/articleRankingCollections/recetas.json';
import articlesAcumulado from '../../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import articlesTPInteresar from '../../../../../../../__mocks__/data/articles/tePuedeInteresar.json';
import Article from '../../../../../../../components/private/LN/api/v1/global/accumulated/story';
import dateAndTimeUtil, {
    isOlderThanXHoursAgo,
    hasFutureDisplayDate,
    addHoursAndFormat,
    dateAndTimeForAppsUtil
} from '../../../../../../../components/private/common/utils/dateAndTimeUtil';
import { cardRegular } from '../../../../../../../components/private/LN/api/common/article/cardRegular/index';

const AcuList = (type, articles) => {
    return articles.map(v => {
        return type(v);
    });
};

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
            'https://resizer.glanacion.com/resizer/2Rifu6S-2jyVOQlG4gkWJPDFkxQ=/360x240/filters:quality(70)/bucket2.glanacion.com/anexos/fotos/94/3446794.jpg'
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

        expect(respAcumulado[0].tituloMobile).toBe(
            articlesAcumulado.content_elements[0].headlines.mobile
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

    test('Imagenes del articulo', () => {
        expect(respAcumulado[9].imagen.id).toBe('LGFOVH6SFFGZVP5V3V7NOW2KFY');
        expect(respAcumulado[9].imagen['_t']).toBe('img');
        expect(respAcumulado[9].imagen.baseUrl).toBe(
            'https://resizer.glanacion.com/resizer/xXjJBfZwE6c26vxfxgfHerlzovg=/278x186/smart/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/LGFOVH6SFFGZVP5V3V7NOW2KFY.jpg'
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
            articlesRanking.content_elements[2].headlines.basic
        );
    });

    test('Test render data de articulo sin imagen', () => {
        expect(respRanking[1].imagen).toBeUndefined();
    });

    test('Imagenes del articulo', () => {
        expect(respRanking[0].imagen['_t']).toBe('img');
        expect(respRanking[0].imagen.baseUrl).toBe(
            'https://resizer.glanacion.com/resizer/LQ03Y-iOcWjwQct4YQRLT0jJrT8=/278x186/smart/www.lanacion.com.ar/resizer/YcJ0gmw6h3B4fXhg5pbuZ8H1uzg=/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/AZ6A7LN5SFDKHG7KHRRJ43FOEE.jpg'
        );
    });

    test('Test Fecha del articulo 1', () => {
        expect(respRanking[0].fechaActualizacion).toBe(
            dateAndTimeForAppsUtil(
                articlesRanking.content_elements[0].last_updated_date
            )
        );
    });

    test('Test Fecha del articulo 2', () => {
        expect(respRanking[0].fecha).toBe(
            dateAndTimeForAppsUtil(
                articlesRanking.content_elements[0].display_date
            )
        );
    });

    test('Test Fecha del articulo 3', () => {
        expect(
            dateAndTimeUtil(articlesRanking.content_elements[0].display_date)
        ).toEqual({
            date: '30 de julio de 2020',
            isoDate: '2020-07-30',
            time: '07:17'
        });
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
        expect(respRanking[0].autores[0].tipo).toBe(2);
    });

    test('Sin Categoria principal', () => {
        expect(respRanking[1].categoria).toBeUndefined();
    });

    test('Categoria principal', () => {
        expect(respRanking[0].categoria.slug).toBe(
            '/recetas/faciles-y-rapidas'
        );
        expect(respRanking[0].categoria.valor).toBe('Fáciles y rápidas');
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
    test('deberia sumar 3 horas a una fecha en formato SQL', () => {
        const date1 = '2021-02-05T17:34:00.624Z';
        const result1 = addHoursAndFormat(6, date1);
        expect(result1).toBe('2021-02-05T20:34:00');
    });

    test('deberia filtrar notas con display_date a futuro', () => {
        const date1 = '2021-02-05T17:34:00.624Z';
        const result1 = hasFutureDisplayDate(date1);
        expect(result1).toBeFalsy();
    });

    test('filtrar notas con display_date a futuro parametro vacio', () => {
        const result1 = hasFutureDisplayDate();
        expect(result1).toBeFalsy();
    });

    test('deberia filtrar notas con published_date mayor a 24 hs', () => {
        const date1 = '2021-02-05T17:34:00.624Z';
        const result1 = isOlderThanXHoursAgo(date1, 24);
        expect(result1).toBeTruthy();
    });
});

describe('Home test', () => {
    // Comentario temporal a revisar porque este escenario ya no deberia presentarse, anexo en un metodo que valida articulos.
    /*     test('Debería retornar un info', () => {
        const request = {
            templateId: '2',
            titulo: 'test',
            html: 'prueba'
        };

        try {
            cardRegular(request);
        } catch (err) {
            expect(err.message).toBe(
                'Anexo configurado como parte de seccion en la home'
            );
        }
    }); */
    test('Deberia retornar un warning', () => {
        //CASO 1 - Articulo vacio
        const request = {};
        try {
            cardRegular(request);
        } catch (err) {
            expect(err.message).toBe(
                'Revisar Parametros de Articulo en null o undefined in article with params: {}'
            );
        }

        //CASO 2 - Sin campo _id
        const request2 = {
            id: 'sarasa',
            templateId: '2',
            titulo: 'test'
        };

        try {
            cardRegular(request2);
        } catch (err) {
            expect(err.message).toBe(
                `Revisar Parametros de Articulo en null o undefined in article with params: ${JSON.stringify(
                    request2
                )}`
            );
        }
    });
});
