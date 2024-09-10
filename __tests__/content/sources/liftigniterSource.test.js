import 'regenerator-runtime/runtime';
import liftigniterSource from '../../../content/sources/liftigniterSource';

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

jest.mock('../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

jest.mock(
    '../../../components/private/common/utils/image/resizer/addResizerUrls',
    () => {
        return {
            __esModule: true,
            addResizedUrls: (x, y) => {
                return {};
            }
        };
    }
);

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL: 'https://resizer.glanacion.com/resizer',
        RESIZER_KEY: 'Fmkgru2rZ2uPZ5wXs7B2HbVDJHDkdoi5',
        WIDGETS: 'li-nacion-recommended-item-template-1',
        LIFTIGNITER_X_API_KEY: '66666-6086-6666-6666-66666',
        JSK_ID: '456456546456mm',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});

const resultOkArticlesSourceIds = {
    type: 'results',
    version: '0.6.0',
    content_elements: [
        {
            website: 'la-nacion-ar',
            website_url:
                '/espectaculos/churrisimo-juana-viale-piropeo-a-uno-de-los-jefes-de-estado-que-presencio-la-jura-de-milei-e-hizo-nid10122023/',
            canonical_url:
                '/espectaculos/churrisimo-juana-viale-piropeo-a-uno-de-los-jefes-de-estado-que-presencio-la-jura-de-milei-e-hizo-nid10122023/',
            _id: 'PYPKUNCNC5BJJI6E24L6KAQYRU',
            content_elements: [Array]
        },
        {
            website: 'la-nacion-ar',
            website_url:
                '/politica/fuerte-apoyo-de-juan-grabois-a-una-de-las-ultimas-medidas-de-milei-nid12122023/',
            canonical_url:
                '/politica/fuerte-apoyo-de-juan-grabois-a-una-de-las-ultimas-medidas-de-milei-nid12122023/',
            _id: '7VYTYGF7NZF2JMAHTTSRYM5GOY',
            content_elements: [Array]
        },
        {
            website: 'la-nacion-ar',
            website_url:
                '/politica/las-primeras-medidas-del-gobierno-de-javier-milei-en-vivo-nid12122023/',
            canonical_url:
                '/politica/las-primeras-medidas-del-gobierno-de-javier-milei-en-vivo-nid12122023/',
            _id: '6WOCH47E2ND6RFNZBPRM24TVZU',
            content_elements: [Array]
        }
    ],
    count: 3,
    next: null,
    _id: '92af8c4813bd44976056c1600ad2d7656a31b39495c53bf14ed9ea97a5ecd881'
};

jest.mock('../../../content/sources/acuArticlesSourcebyIds', () => {
    return {
        __esModule: true,
        default: (x, y) => {
            return {};
        }
    };
});

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: method => {
            const path = method.uri;
            if (path.match(/model/g) && !!path.match(/model/g)) {
                return Promise.resolve(
                    JSON.stringify({
                        items: [
                            {
                                titleShort:
                                    'Milei pidió por carta a Xi Xinping que interceda por el swap con China',
                                leadText: 'Giro diplomático.',
                                url:
                                    'https://www.lanacion.com.ar/autos/electricos/javier-milei-pidio-por-carta-a-xi-xinping-que-interceda-por-el-swap-con-china-nid12122023/',
                                image:
                                    'https://resizer.glanacion.com/resizer/v2/javier-milei-y-xi-PX756RL4XVCZBD5HXH3BXROG44.jpg?auth=3c8ee103d553578f4f3431cdcfac63ea28a57f9cf6f59cd5d6871906d2c624e5&width=768&quality=70&smart=false',
                                published_time: '2023-12-12T14:22:02.689Z',
                                id: '63RWWTERHBDLRARXAZ6XEFCWHE',
                                title:
                                    'Javier Milei pidió por carta a Xi Xinping que interceda por el swap con China'
                            },
                            {
                                titleShort:
                                    'Un experto en comunicación no verbal analizó el cara a cara entre Milei y Cristina',
                                leadText: 'Lo que no se vio.',
                                url:
                                    'https://www.lanacion.com.ar/politica/lucha-un-experto-en-comunicacion-no-verbal-analizo-el-cara-a-cara-entre-javier-milei-y-cristina-nid10122023/',
                                image:
                                    'https://resizer.glanacion.com/resizer/v2/javier-milei-junto-a-cristina-fernandez-de-5IWTOPYFCFCQNFKFR74XNS7VGU.JPG?auth=8dfcee4625b779088847615dbf0c43673f843a88f848c879956bfbd83d5f1623&width=768&quality=70&smart=false',
                                published_time: '2023-12-12T15:14:46.767Z',
                                id: 'EUGUWQZ6IJGY7M26ECFYLD3DDU',
                                title:
                                    '“Lucha”: un experto en comunicación no verbal analizó el cara a cara entre Javier Milei y Cristina Kirchner durante la asunción'
                            },
                            {
                                titleShort:
                                    'Qué pasará con la TV Pública y Radio Nacional',
                                leadText:
                                    'Renuncias masivas, nervios y muchos interrogantes.',
                                url:
                                    'https://www.lanacion.com.ar/espectaculos/television/renuncias-masivas-nervios-y-muchos-interrogantes-que-pasara-con-la-tv-publica-y-radio-nacional-nid12122023/',
                                image:
                                    'https://resizer.glanacion.com/resizer/v2/el-destino-de-la-tv-publica-con-muchas-5PEAJPAJBVGZVDDSHNSOJO5524.jpg?auth=96febce165892b5b398a5b2bcdb7b59d8322e792908bd6878c048f1c2e9b0711&width=768&quality=70&smart=false',
                                published_time: '2023-12-12T16:53:07.246Z',
                                id: 'FG4VTVBOENDW7A35NRI2BOOWVA',
                                title:
                                    'Renuncias masivas, nervios y muchos interrogantes: qué pasará con la TV Pública y Radio Nacional'
                            },
                            {
                                titleShort:
                                    'Las dos grandes apuestas "de segunda generación" del intendente que ganó por solo un voto',
                                leadText: 'El futuro de Pinamar.',
                                url:
                                    'https://www.lanacion.com.ar/sociedad/el-futuro-de-pinamar-las-dos-grandes-apuestas-de-segunda-generacion-del-intendente-que-gano-por-solo-nid12122023/',
                                image:
                                    'https://resizer.glanacion.com/resizer/v2/YAQW3HBO5ZFB3JKCLTJPK2A2JM.JPG?auth=676641c590763993540d79739ab3d119a85bde04f73e7a110f7a4e5de21bd407&width=768&quality=70&smart=false',
                                published_time: '2023-12-12T15:30:48.285Z',
                                id: 'YEW6UFHRJZEMZDWUO2NXX7FVGA',
                                title:
                                    'El futuro de Pinamar: las dos grandes apuestas “de segunda generación” del intendente que ganó por solo un voto'
                            },
                            {
                                titleShort:
                                    'Los libertarios están cerca de tener los votos para derrotar al kirchnerismo',
                                leadText: 'La pelea por el control del Senado.',
                                url:
                                    'https://www.lanacion.com.ar/politica/la-pelea-por-el-control-del-senado-los-libertarios-estan-cerca-de-tener-los-votos-para-derrotar-al-nid12122023/',
                                image:
                                    'https://resizer.glanacion.com/resizer/v2/victoria-villarruel-firmo-el-decreto-que-habilita-52KCZO23ANGH7M2JJ6FFHAN6CA.jpg?auth=a32d92a2764dda47614802f737963f1a388b550c67af2227a1b83fb98db9d377&width=768&quality=70&smart=false',
                                published_time: '2023-12-12T17:04:51.339Z',
                                id: 'DX2E6VAZYBEHLCJFV2VV6HBBPY',
                                title:
                                    'La pelea por el control del Senado: los libertarios están cerca de tener los votos para derrotar al kirchnerismo'
                            },
                            {
                                titleShort:
                                    'Un conflicto por la carga impositiva, en el laberinto de la herencia recibida por Milei',
                                leadText: 'Pago de jubilaciones.',
                                url:
                                    'https://www.lanacion.com.ar/economia/un-conflicto-por-la-carga-impositiva-en-el-laberinto-de-la-herencia-recibida-por-milei-nid12122023/',
                                image:
                                    'https://resizer.glanacion.com/resizer/v2/sesin-pblica-especial-del-senado-de-la-nacin-NWVYV3W35JADBG7JYHX5SX7RFM.JPG?auth=2538f1e528c7b4477452e2a4c832b0e340557833756259d3816d99e28d37b378&width=768&quality=70&smart=false',
                                published_time: '2023-12-12T13:51:11.845Z',
                                id: 'PDL2QTQCPJD5BPPLOQR4FH6EPY',
                                title:
                                    'Un conflicto por la carga impositiva, en el laberinto de la herencia recibida por Milei'
                            },
                            {
                                titleShort:
                                    'Revelan una presunta infidelidad de la reina Letizia con su excuñado',
                                leadText: 'Escándalo en la corona española.',
                                url:
                                    'https://www.lanacion.com.ar/el-mundo/escandalo-en-la-corona-espanola-revelan-una-presunta-infidelidad-de-la-reina-letizia-con-su-excunado-nid12122023/',
                                image:
                                    'https://resizer.glanacion.com/resizer/v2/rey-felipe-vi-leonor-princesa-de-asturias-jura-de-E4KHQZXUUNEWXGFIW76YPK4Y4M.JPG?auth=c06bd0d834a2808cc9bb655567fe3598d4aaa88ddbe8a5961964a1c6c4b892ea&width=768&quality=70&smart=false',
                                published_time: '2023-12-12T16:05:58.332Z',
                                id: 'ABMWFFEJTJFXVESBFAP3TG5GW4',
                                title:
                                    'Escándalo en la corona española: revelan una presunta infidelidad de la reina Letizia con su excuñado '
                            },
                            {
                                titleShort:
                                    'Wolff dio detalles de la detención del agresor de Milei y se refirió a la queja de Bullrich',
                                leadText: 'Botellazo.',
                                url:
                                    'https://www.lanacion.com.ar/seguridad/wolff-dio-detalles-de-la-detencion-del-agresor-de-milei-y-se-refirio-a-la-queja-de-bullrich-nid12122023/',
                                image:
                                    'https://resizer.glanacion.com/resizer/v2/patricia-bullrich-y-waldo-wolff-quien-fue-UO2BXYQEWBF3ZK7BQYY5UBXPFE.jpg?auth=077684bab5781cc21cf72087937cfa0e64e938851b587df0e103a7f632055d76&width=768&quality=70&smart=false',
                                published_time: '2023-12-12T16:24:36.397Z',
                                id: 'JAGXKMC7FFBSLBRWXRG7YW6IRI',
                                title:
                                    'Wolff dio detalles de la detención del agresor de Milei y se refirió a la queja de Bullrich'
                            },
                            {
                                titleShort:
                                    'Quiénes son los cinco hombres elegidos para acompañar a Bausili en el Banco Central',
                                leadText: 'Uno por uno.',
                                url:
                                    'https://www.lanacion.com.ar/economia/banco-central-quienes-son-los-cinco-hombres-elegidos-para-acompanar-a-santiago-bausili-en-el-nid12122023/',
                                image:
                                    'https://resizer.glanacion.com/resizer/v2/vladimiro-werning-sera-director-del-banco-MBKIT6VWHBF2LKLILOBO6RNOQQ.jpg?auth=9adbbf6f1b9476b3c1b330690c6f0dd1ab9b1dd4610e9330f797bbae5885524a&width=768&quality=70&smart=false',
                                published_time: '2023-12-12T14:31:06.998Z',
                                id: 'I3HBK7UHABHD5DYSEG4YS7WPH4',
                                title:
                                    'Banco Central: quiénes son los cinco hombres elegidos para acompañar a Santiago Bausili en el organismo'
                            },
                            {
                                titleShort:
                                    'Una mujer murió en el incendio al lado de la Secretaría de Trabajo',
                                leadText: 'Evacuaron la zona.',
                                url:
                                    'https://www.lanacion.com.ar/sociedad/incendio-al-lado-del-ministerio-de-trabajo-investigan-si-fue-una-explosion-nid12122023/',
                                image:
                                    'https://resizer.glanacion.com/resizer/v2/se-incendia-un-edificio-al-lado-de-la-secretaria-2MSBKLK2JZEZ3JAZP6PMBZL7QA.JPG?auth=17c894cf84e38b03bb52c4d95fba72854c88b6a178c99a4286978a3de0deee96&width=768&quality=70&smart=false',
                                published_time: '2023-12-12T18:04:52.850Z',
                                id: 'KKXEMNZNABDGFGUW5UTXE5TX6Y',
                                title:
                                    'Una mujer murió en el incendio al lado de la Secretaría de Trabajo '
                            }
                        ]
                    })
                );
            }
            if (path.match(/activity/g) && !!path.match(/activity/g)) {
                return Promise.resolve(JSON.stringify({}));
            }

            throw new Error('Error al obtener el listado de notas');
        }
    };
});

describe('liftigniter content sources Unit Tests', () => {
    const { fetch: fetchContent } = liftigniterSource;
    const query = {
        uri:
            '/api/v1/notas/mayInterest/model/4720003/90a7009c-7cca-46dc-b16e-1a213852e0e1/10/PYPKUNCNC5BJJI6E24L6KAQYRU/[7VYTYGF7NZF2JMAHTTSRYM5GOY,6WOCH47E2ND6RFNZBPRM24TVZU]/',
        cantidadNotas: '5',
        imageConfig: 'm',
        action: 'model',
        sessionId: '90a7009c-7cca-46dc-b16e-1a213852e0e1',
        idArticle: '/PYPKUNCNC5BJJI6E24L6KAQYRU',
        userId: '4720003',
        maxAgeInSeconds: '21600',
        excludeUrl: '/[7VYTYGF7NZF2JMAHTTSRYM5GOY,6WOCH47E2ND6RFNZBPRM24TVZU]',
        excludeNotas:
            '/[7VYTYGF7NZF2JMAHTTSRYM5GOY,6WOCH47E2ND6RFNZBPRM24TVZU]',
        sizeMax: '20',
        api: 'true',
        widgetName: 'li-ma-u',
        'arc-site': 'la-nacion-ar'
    };

    it('Should return a response OK', async () => {
        const mockResponse = [
            '63RWWTERHBDLRARXAZ6XEFCWHE',
            'EUGUWQZ6IJGY7M26ECFYLD3DDU',
            'FG4VTVBOENDW7A35NRI2BOOWVA',
            'YEW6UFHRJZEMZDWUO2NXX7FVGA',
            'DX2E6VAZYBEHLCJFV2VV6HBBPY'
        ];

        const resp = await fetchContent(query, {
            cachedCall: jest
                .fn()
                .mockReturnValue(Promise.resolve(resultOkArticlesSourceIds))
        });
        expect(resp.map(r => r._id)).toMatchObject(mockResponse);
    });

    it('When urlReferer is null', async () => {
        const newQuery = { ...query };
        newQuery.idArticle = '6WOCH47E2ND6RFNZBPRM24TVZU';
        const resultRepetedUrlArticlesSourceIds = JSON.parse(
            JSON.stringify(resultOkArticlesSourceIds)
        );
        resultRepetedUrlArticlesSourceIds.content_elements[2].canonical_url = resultRepetedUrlArticlesSourceIds.content_elements[2].canonical_url.concat(
            resultRepetedUrlArticlesSourceIds.content_elements[2].canonical_url
        );

        const mockResponse = [
            '63RWWTERHBDLRARXAZ6XEFCWHE',
            'EUGUWQZ6IJGY7M26ECFYLD3DDU',
            'FG4VTVBOENDW7A35NRI2BOOWVA',
            'YEW6UFHRJZEMZDWUO2NXX7FVGA',
            'DX2E6VAZYBEHLCJFV2VV6HBBPY'
        ];
        const resp = await fetchContent(newQuery, {
            cachedCall: jest
                .fn()
                .mockReturnValue(
                    Promise.resolve(resultRepetedUrlArticlesSourceIds)
                )
        });
        expect(resp.map(r => r._id)).toMatchObject(mockResponse);
    });
    it('Error Missing Articles', async () => {
        const newQuery = { ...query };

        try {
            await fetchContent(newQuery, {
                cachedCall: jest.fn().mockImplementation(props => {
                    throw new Error('Error');
                })
            });
        } catch (err) {
            expect(err.message).toBe('Error');
        }
    });

    it('When action is  activity is ok', async () => {
        const newQuery = { ...query };
        newQuery.action = 'activity';
        newQuery.listArticles =
            '/[7VYTYGF7NZF2JMAHTTSRYM5GOY,6WOCH47E2ND6RFNZBPRM24TVZU]';

        const mockResponse = {};
        const resp = await fetchContent(newQuery, {
            cachedCall: jest
                .fn()
                .mockReturnValue(Promise.resolve(resultOkArticlesSourceIds))
        });
        expect(resp).toMatchObject(mockResponse);
    });
});
