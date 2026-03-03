import { storyBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/boxes/storyBox';
import * as element from '../../../../../../../../../../__mocks__/data/LN10_storyTypes/storyBox.json';
import { cardRegular } from '../../../../../../../../../../components/private/LN/api/common/article/cardRegular/index';

describe('storyBox LN9', () => {
    it('test ok', () => {
        const paramsFromPage = {
            rootPath:
                'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=json'
        };
        const boxInfo = {
            tituloCaja: 'tituloCaja',
            url: 'url'
        };
        const result = storyBox(element, boxInfo, cardRegular, paramsFromPage);
        expect(result).toEqual({
            tituloCaja: 'tituloCaja',
            url: 'url',
            notas: [
                {
                    id: 'K642LPFKHBDKLFIU5KNYC6FBBY',
                    templateId: '1',
                    isListenable: false,
                    sitioId: null,
                    url: '/sociedad/el-holocausto-olvidado-perpetrado-por-los-nazis-durante-la-segunda-guerra-mundial-nid27012023/',
                    titulo: 'Messi finalmente levanta la copa mas esperada por todos los argentinos.',
                    volanta: 'ARGENTINA CAMPEON. ',
                    autores: [
                        {
                            id: 330,
                            slug: 'alfredo-leuco-330',
                            valor: 'Alfredo Leuco',
                            intereses: undefined,
                            rol: '',
                            tipo: 1,
                            imagen: 'https://resizer.glanacion.com/resizer/HL0DujbSSDIRYf-nZCfi0gausOM=/80x0/filters:format(webp):quality(80)/bucket.glanacion.com/anexos/fotos/53/1413553.jpg',
                            absoluteUrl:
                                'https://resizer.glanacion.com/resizer/HL0DujbSSDIRYf-nZCfi0gausOM=/80x0/filters:format(webp):quality(80)/bucket.glanacion.com/anexos/fotos/53/1413553.jpg',
                            mail: undefined,
                            twitter: undefined
                        }
                    ],
                    authors: [
                        {
                            id: 330,
                            slug: 'alfredo-leuco-330',
                            valor: 'Alfredo Leuco',
                            intereses: undefined,
                            rol: '',
                            tipo: 1,
                            imagen: 'https://resizer.glanacion.com/resizer/HL0DujbSSDIRYf-nZCfi0gausOM=/80x0/filters:format(webp):quality(80)/bucket.glanacion.com/anexos/fotos/53/1413553.jpg',
                            absoluteUrl:
                                'https://resizer.glanacion.com/resizer/HL0DujbSSDIRYf-nZCfi0gausOM=/80x0/filters:format(webp):quality(80)/bucket.glanacion.com/anexos/fotos/53/1413553.jpg',
                            mail: undefined,
                            twitter: undefined
                        }
                    ],
                    marquesina: 'Por Alfredo Leuco',
                    openingMode: 'Native',
                    seccionPadre: null,
                    opinion: false,
                    rating: null,
                    enviarApps: true,
                    fechaPublicacion: '2023-01-27 09:16:07',
                    bajada: '\n                Los nazis mataron a más de 11 millones de personas durante el Holocausto, incluidos seis millones de judíos. Un grupo de nómadas marginados, los romaníes, fueron también víctimas de la masacre.\n            ',
                    chapita: 'VIDEO',
                    imagen: {
                        id: 'TR5C3TK6F5BWRCYRR3AUO4RMQ4',
                        _t: 'img',
                        baseUrl:
                            'https://resizer.glanacion.com/resizer/YUOnmEFPRR24kgOY_cF3pZN5fPA=/1920x1280/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/TR5C3TK6F5BWRCYRR3AUO4RMQ4.jpeg',
                        absoluteUrl:
                            'https://resizer.glanacion.com/resizer/YUOnmEFPRR24kgOY_cF3pZN5fPA=/1920x1280/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/TR5C3TK6F5BWRCYRR3AUO4RMQ4.jpeg'
                    },
                    video: null,
                    videos: null,
                    videoYouTube: null
                }
            ],
            video: null
        });
    });
});
