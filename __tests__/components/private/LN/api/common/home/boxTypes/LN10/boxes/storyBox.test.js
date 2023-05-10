import { storyBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/storyBox';
import * as element from '../../../../../../../../../../__mocks__/data/LN10_storyTypes/storyBox.json';
import { Article } from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/index';

describe('storyBox LN10', () => {
    it('test ok', () => {
        const paramsFromPage = {
            rootPath:
                'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=json'
        };
        const boxInfo = {
            tituloCaja: 'tituloCaja',
            url: 'url'
        };
        const result = storyBox(element, boxInfo, Article, paramsFromPage);
        expect(result).toEqual({
            tituloCaja: 'tituloCaja',
            url: 'url',
            notas: [
                {
                    id: 'K642LPFKHBDKLFIU5KNYC6FBBY',
                    templateId: '1',
                    sitioId: null,
                    url:
                        '/sociedad/el-holocausto-olvidado-perpetrado-por-los-nazis-durante-la-segunda-guerra-mundial-nid27012023/',
                    titulo:
                        'Messi finalmente levanta la copa mas esperada por todos los argentinos.',
                    volanta: 'ARGENTINA CAMPEON. ',
                    autor: {
                        id: 330,
                        slug: 'alfredo-leuco-330',
                        valor: 'Alfredo Leuco',
                        intereses: undefined,
                        rol: '',
                        tipo: 1,
                        imagen:
                            '/resizer/HL0DujbSSDIRYf-nZCfi0gausOM=/80x0/filters:format(webp):quality(80)/bucket.glanacion.com/anexos/fotos/53/1413553.jpg',
                        absoluteUrl:
                            'https://resizer.glanacion.com/resizer/HL0DujbSSDIRYf-nZCfi0gausOM=/80x0/filters:format(webp):quality(80)/bucket.glanacion.com/anexos/fotos/53/1413553.jpg',
                        mail: undefined,
                        twitter: undefined
                    },
                    autores: [
                        {
                            id: 330,
                            slug: 'alfredo-leuco-330',
                            valor: 'Alfredo Leuco',
                            intereses: undefined,
                            rol: '',
                            tipo: 1,
                            imagen:
                                '/resizer/HL0DujbSSDIRYf-nZCfi0gausOM=/80x0/filters:format(webp):quality(80)/bucket.glanacion.com/anexos/fotos/53/1413553.jpg',
                            absoluteUrl:
                                'https://resizer.glanacion.com/resizer/HL0DujbSSDIRYf-nZCfi0gausOM=/80x0/filters:format(webp):quality(80)/bucket.glanacion.com/anexos/fotos/53/1413553.jpg',
                            mail: undefined,
                            twitter: undefined
                        }
                    ],
                    marquesina: 'Por Alfredo Leuco',
                    seccionPadre: null,
                    opinion: false,
                    enviarApps: true,
                    fechaPublicacion: '2023-01-27 09:16:07',
                    bajada:
                        '\n                Los nazis mataron a más de 11 millones de personas durante el Holocausto, incluidos seis millones de judíos. Un grupo de nómadas marginados, los romaníes, fueron también víctimas de la masacre.\n            ',
                    categoria: {
                        slug: '/sociedad',
                        valor: 'Sociedad'
                    },
                    chapita: 'VIDEO',
                    badge: 'VIDEO',
                    badgeStyle: null,
                    design: {
                        imagePosition: 'Top',
                        size: 'XL',
                        typeCard: 'regular'
                    },
                    imagen: {
                        id: 'TR5C3TK6F5BWRCYRR3AUO4RMQ4',
                        _t: 'img',
                        baseUrl:
                            '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/TR5C3TK6F5BWRCYRR3AUO4RMQ4.jpeg',
                        absoluteUrl:
                            'https://resizer.glanacion.com/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/TR5C3TK6F5BWRCYRR3AUO4RMQ4.jpeg',
                        parametros: [
                            {
                                media: 1280,
                                ancho: 1920,
                                alto: 1280,
                                firma:
                                    'YUOnmEFPRR24kgOY_cF3pZN5fPA=/1920x1280/smart/filters:format(webp):quality(80)'
                            },
                            {
                                media: 1200,
                                ancho: 1200,
                                alto: 800,
                                firma:
                                    'LC_AjK6-A7-Q6HFI0uKohSnCWUw=/1200x800/smart/filters:format(webp):quality(80)'
                            },
                            {
                                media: 1023,
                                ancho: 1023,
                                alto: 682,
                                firma:
                                    'hdl5k-EyrHaSqvQEEUoyAK2jIcU=/1023x682/smart/filters:format(webp):quality(80)'
                            },
                            {
                                media: 768,
                                ancho: 768,
                                alto: 512,
                                firma:
                                    'RbVoad92IQhS9y3Sw8TmeT3d9do=/768x512/smart/filters:format(webp):quality(80)'
                            },
                            {
                                media: 360,
                                ancho: 360,
                                alto: 240,
                                firma:
                                    '0CSnmJ249VR0iqxE0TcXbqQORsM=/360x240/smart/filters:format(webp):quality(80)'
                            }
                        ]
                    },
                    videoYouTube: null
                }
            ]
        });
    });
});
