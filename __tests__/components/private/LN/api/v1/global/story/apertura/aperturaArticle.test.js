import Video from '../../../../../../../../../components/private/LN/api/v1/common/story/video';
import Apertura from '../../../../../../../../../components/private/LN/api/v1/common/story/apertura/aperturaArticle';
import ArticleApertura from '../../../../../../../../../__mocks__/data/nota/apertura/apertura.json';
import HistoryTellingArticle from '../../../../../../../../../__mocks__/data/articles/4HFO7YPZBFEYVB6K5XY6IFV3XY.json';
import HistoryFotoAlCienArticle from '../../../../../../../../../__mocks__/data/articles/PTAOLSGRDBEZLG6A6T43M7A7PU.json';
import AperturaMultimedia from '../../../../../../../../../__mocks__/data/articles/KMD6TFFRHRC7XBPE2DDNKOTALE.json';
import { getAutorId } from '../../../../../../../../../components/private/common/utils/getElementId';

describe('Test de JSON de apertura en article', () => {
    it('Render de atributos de apertura Titulos', () => {
        const respTituloMobile = Apertura(ArticleApertura[0]);
        expect(respTituloMobile.tituloMobile).toBe(
            ArticleApertura[0].headlines.mobile
        );

        const resp = Apertura(ArticleApertura[1]);
        expect(resp.titulo).toBe(ArticleApertura[1].headlines.basic);
        expect(resp.marquesina).toBe('Por Max Fisher');
    });

    it('Render de atributos de apertura Titulo Nulo', () => {
        const mockTituloenApertura = {
            headlines: {
                meta_title: '',
                mobile: ''
            },
            credits: {
                by: [
                    {
                        _id: 'max-fisher-4189',
                        additional_properties: {
                            original: {
                                role: 'The New York Times'
                            }
                        },
                        image: {
                            url: ''
                        },
                        name: 'Max Fisher',
                        slug: 'max-fisher-4189',
                        type: 'author',
                        url: '/autor/max-fisher-4189/'
                    }
                ]
            },
            subheadlines: {
                basic:
                    'Esto es una bajada. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod...'
            },
            label: {
                edicion: {
                    display: true,
                    text: 'Digital'
                },
                volanta: {
                    display: true,
                    text: 'Esto es una volanta.'
                }
            },
            subtype: '1',
            owner: {
                sponsored: false
            }
        };
        try {
            const respTitulo = Apertura(mockTituloenApertura);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe('Titulo de la nota es null o undefined');
        }
    });

    it('Render de atributos de apertura', () => {
        const resp = Apertura(ArticleApertura[0]);
        expect(resp.bajada).toBe(ArticleApertura[0].subheadlines.basic);

        const articleAuthor = ArticleApertura[0].credits.by[0];

        expect(resp.autores[0].id).toBe(getAutorId(articleAuthor._id));
        expect(resp.autores[0].slug).toBe(articleAuthor.slug);
        expect(resp.autores[0].valor).toBe(articleAuthor.name);
        expect(resp.autores[0].imagen).toBe(
            '/resizer/qd_3dkJemiLUloOXwofkHeixPiU=/80x0/filters:quality(100)/bucket.glanacion.com/anexos/fotos/91/2219591.png'
        );
        expect(resp.autores[0].tipo).toBe(1);
    });

    it('Verificación del id numerico del autor de la nota', () => {
        const articleAuthorId = getAutorId(
            ArticleApertura[0].credits.by[0]._id
        );
        expect(articleAuthorId).toBe(4189);
    });

    it('Verificación del id numerico del autor de la nota', () => {
        const articleAuthorId = getAutorId(
            ArticleApertura[0].credits.by[0]._id
        );
        expect(articleAuthorId).toBe(4189);
    });

    it('Verificación del id en caso que no cuente con valor numerico', () => {
        const articleAuthorId = getAutorId(
            ArticleApertura[6].credits.by[0]._id
        );
        expect(articleAuthorId).toBe('max-fisher');
    });

    it('Render de imagenes de apertura', () => {
        const resp = Apertura(ArticleApertura[0]);
        const imageData = ArticleApertura[0].promo_items.basic;
        expect(resp.multimedio).toBeUndefined();
        expect(resp.imagenes[0]['_t']).toBe('img');
        expect(resp.imagenes[0].id).toBe(imageData._id);
        expect(resp.imagenes[0].baseUrl).toBe(
            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QZO4UCHCSJHWJLQBALT2PGR2EY.jpg'
        );
        expect(resp.imagenes[0].parametros[0].ancho).toBe(1260);
        expect(resp.imagenes[0].parametros[0].firma).toBe(
            'll9UIKBF1TEj9aV7Fvgnp39l3KM=/1260x840/smart'
        );
        expect(resp.imagenes[0].parametros[1].firma).toBe('');
        expect(resp.imagenes[0].epigrafe).toBe(imageData.caption);

        console.log(resp.imagenes[0].parametros[1].firma);
    });

    it('Render de imagenes de Story Telling apertura', () => {
        const resp = Apertura(HistoryTellingArticle);
        const imageData = HistoryTellingArticle.promo_items.storytelling_mobile;
        expect(resp.multimedio).toBeUndefined();
        expect(resp.imagenes[0]['_t']).toBe('img');
        expect(resp.imagenes[0].id).toBe(imageData._id);
        expect(resp.imagenes[0].baseUrl).toBe(
            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/SITTWPHGIZHMRNZH3DBQINBEXA.jpg'
        );
        expect(resp.imagenes[0].parametros[1].ancho).toBe(1120);
        expect(resp.imagenes[0].parametros[1].firma).toBe(
            'jyC1dEvJPV9p1vrfUcw79zvPx2A=/0x1120/filters:quality(70)'
        );
        expect(resp.imagenes[0].epigrafe).toBeUndefined();
    });

    it('Render de imagenes de Foto al cien apertura', () => {
        const resp = Apertura(HistoryFotoAlCienArticle);
        const imageData =
            HistoryFotoAlCienArticle.promo_items.storytelling_mobile;
        expect(resp.multimedio).toBeUndefined();
        expect(resp.imagenes[0]['_t']).toBe('img');
        expect(resp.imagenes[0].id).toBe(imageData._id);
        expect(resp.imagenes[0].baseUrl).toBe(
            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ORVQL3YRTFENDJCHJRLAWVD7EM.jpg'
        );
        expect(resp.imagenes[0].parametros[1].ancho).toBe(1200);
        expect(resp.imagenes[0].parametros[1].firma).toBe(
            'P9espymFgLMpoy3MSeSvKvwl8kI=/1200x800/filters:quality(100)'
        );
        expect(resp.imagenes[0].epigrafe).toBe(
            'Esquiadores en el centro de Madrid'
        );
    });

    it('Render de videos de apertura', () => {
        const resp = Apertura(ArticleApertura[1]);
        const videoData = Video(ArticleApertura[1].promo_items.basic);
        expect(resp.multimedio).toMatchObject(videoData);
        expect(resp.imagenes).toBeUndefined();
    });

    it('Render de videos de apertura caso apertura multimedia', () => {
        const resp = Apertura(AperturaMultimedia);
        const videoData = Video(
            AperturaMultimedia.promo_items.apertura_multimedia
        );
        expect(resp.multimedio).toMatchObject(videoData);
        expect(resp.imagenes).toBeUndefined();
    });

    it('Render en caso que promo_items no exista o este vacio', () => {
        const resp = Apertura(ArticleApertura[2]);
        expect(resp.imagenes).toBeUndefined();
        expect(resp.multimedio).toBeUndefined();

        const respEmpty = Apertura(ArticleApertura[3]);
        expect(respEmpty.imagenes).toBeUndefined();
        expect(respEmpty.multimedio).toBeUndefined();
    });

    it('Render en caso que no tenga autores o este vacio', () => {
        const resp = Apertura(ArticleApertura[4]);
        expect(resp.autores).toBeUndefined();

        const respEmpty = Apertura(ArticleApertura[5]);
        expect(respEmpty.autores).toBeUndefined();
    });

    it('Render en caso que no tenga tag destacado o este vacio', () => {
        const resp = Apertura(ArticleApertura[5]);
        expect(resp.tagDestacado).toBeUndefined();

        const respEmpty = Apertura(ArticleApertura[6]);
        expect(respEmpty.tagDestacado).toBeUndefined();
    });

    it('Render apertura espacio patrocinado', () => {
        const resp = Apertura(ArticleApertura[0]);
        expect(resp.tagDestacado.tipoDescripcion).toBe('Patrocinado');
        expect(resp.tagDestacado.valor).toBe('Espacio Patrocinado');
    });

    it('Render apertura content lab', () => {
        const resp = Apertura(ArticleApertura[1]);
        expect(resp.tagDestacado.tipoDescripcion).toBe('contentLab');
        expect(resp.tagDestacado.valor).toBe('Chevrolet');
    });
});
