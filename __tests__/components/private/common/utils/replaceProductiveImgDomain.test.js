import replaceProductiveImgDomain, {
    replaceUrlsByEnvironment
} from '../../../../../components/private/common/utils/replaceProductiveImgDomain';
import * as env from 'fusion:environment';
import get from '../../../../../components/private/common/utils/get';

jest.mock('fusion:environment', () => ({
    __esModule: true,
    RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
    API_ENV: 'prod'
}));

const responseRankingArticleSource = [
    {
        _id: 'QFJSYPTLAFHC3EGCKSIWY4LU4I',
        canonical_url:
            '/sociedad/tragico-choque-frontal-se-accidento-en-la-ruta-5-un-hijo-de-ramon-diaz-y-por-el-impacto-murio-la-nid14032023/',
        headlines: {
            basic:
                'Tragedia en 9 de Julio. El hijo del DT Ramón Díaz chocó de frente en la ruta: murieron su esposa y el otro conductor',
            mobile:
                'El hijo de Ramón Díaz quedó detenido tras protagonizar un choque en la ruta 5'
        },
        label: {
            volanta: {
                text: 'Murió la nuera del entrenador.'
            }
        },
        promo_items: {
            basic: {
                height: 513,
                resized_urls: [
                    {
                        option: {
                            height: 250,
                            width: 375
                        },
                        resizedUrl:
                            'https://sandbox.lanacion.com.ar/resizer/v2/el-accidente-ocurrio-en-la-ruta-7C2ZRM4ZVJFMJIIQLVPCL5MGJM.jpg?auth=2e41fd3fdf0c0226e9846c7825689cc6f88b162b6261e8a1b46d162d67414121&width=375&height=250&quality=80&smart=false'
                    },
                    {
                        option: {
                            height: 200,
                            width: 300
                        },
                        resizedUrl:
                            'https://sandbox.lanacion.com.ar/resizer/v2/el-accidente-ocurrio-en-la-ruta-7C2ZRM4ZVJFMJIIQLVPCL5MGJM.jpg?auth=2e41fd3fdf0c0226e9846c7825689cc6f88b162b6261e8a1b46d162d67414121&width=300&height=200&quality=80&smart=false'
                    }
                ],
                type: 'image',
                url:
                    'https://sandbox.lanacion.com.ar/resizer/v2/el-accidente-ocurrio-en-la-ruta-7C2ZRM4ZVJFMJIIQLVPCL5MGJM.jpg?auth=2e41fd3fdf0c0226e9846c7825689cc6f88b162b6261e8a1b46d162d67414121&width=768&quality=80&smart=false',
                width: 768
            }
        },
        subtype: '1',
        website_url:
            '/sociedad/tragico-choque-frontal-se-accidento-en-la-ruta-5-un-hijo-de-ramon-diaz-y-por-el-impacto-murio-la-nid14032023/'
    },
    {
        _id: 'JHEQM4EGFFD4HKLONBC4OE6Z6M',
        canonical_url:
            '/politica/al-sanatorio-otamendi-trasladan-al-presidente-alberto-fernandez-por-un-fuerte-dolor-en-la-espalda-nid14032023/',
        headlines: {
            basic:
                'Alberto Fernández fue atendido en el Sanatorio Otamendi por una hernia de disco lumbar',
            mobile:
                'Alberto Fernández fue atendido en el Sanatorio Otamendi por una hernia de disco lumbar'
        },
        label: {
            volanta: {
                text: 'La salud del Presidente.'
            }
        },
        promo_items: {
            basic: {
                height: 513,
                resized_urls: [
                    {
                        option: {
                            height: 250,
                            width: 375
                        },
                        resizedUrl:
                            'https://sandbox.lanacion.com.ar/resizer/v2/el-presidente-alberto-fernandez-saliendo-de-la-BVXX766TJFDWFMNBD373TEHY44.JPG?auth=d61f349c543a03126749375f73abd5a35cb8f738e5af5e8273d145974ac1bac1&width=375&height=250&quality=80&smart=false'
                    },
                    {
                        option: {
                            height: 200,
                            width: 300
                        },
                        resizedUrl:
                            'https://sandbox.lanacion.com.ar/resizer/v2/el-presidente-alberto-fernandez-saliendo-de-la-BVXX766TJFDWFMNBD373TEHY44.JPG?auth=d61f349c543a03126749375f73abd5a35cb8f738e5af5e8273d145974ac1bac1&width=300&height=200&quality=80&smart=false'
                    }
                ],
                type: 'image',
                url:
                    'https://sandbox.lanacion.com.ar/resizer/v2/el-presidente-alberto-fernandez-saliendo-de-la-BVXX766TJFDWFMNBD373TEHY44.JPG?auth=d61f349c543a03126749375f73abd5a35cb8f738e5af5e8273d145974ac1bac1&width=768&quality=80&smart=false',
                width: 768
            }
        },
        subtype: '1',
        website_url:
            '/politica/al-sanatorio-otamendi-trasladan-al-presidente-alberto-fernandez-por-un-fuerte-dolor-en-la-espalda-nid14032023/'
    }
];

describe('Tests - function - replaceProductiveImgDomain', () => {
    test('should return the url of the image with the domain "https://resizer.glanacion.com" in dev', () => {
        const urlImage =
            'https://dev.lanacion.com.ar/resizer/v2/gano-6-millones-en-los-8-escalones-pero-por-su-4763AQCDDVCFPKTENIWKVMKEYM.jpg?auth=8e24e0b03f44949ab748837016d225cc433131dbc0df11944a88d084335799fe&width=300&height=200&quality=80&smart=false';

        expect(replaceProductiveImgDomain(urlImage)).toStrictEqual(
            'https://resizer.glanacion.com/resizer/v2/gano-6-millones-en-los-8-escalones-pero-por-su-4763AQCDDVCFPKTENIWKVMKEYM.jpg?auth=8e24e0b03f44949ab748837016d225cc433131dbc0df11944a88d084335799fe&width=300&height=200&quality=80&smart=false'
        );
    });

    test('should return the url of the image with the domain "https://resizer.glanacion.com" when the environment in sandbox', () => {
        const urlImage =
            'https://sandbox.lanacion.com.ar/resizer/v2/gano-6-millones-en-los-8-escalones-pero-por-su-4763AQCDDVCFPKTENIWKVMKEYM.jpg?auth=8e24e0b03f44949ab748837016d225cc433131dbc0df11944a88d084335799fe&width=300&height=200&quality=80&smart=false';

        expect(replaceProductiveImgDomain(urlImage)).toStrictEqual(
            'https://resizer.glanacion.com/resizer/v2/gano-6-millones-en-los-8-escalones-pero-por-su-4763AQCDDVCFPKTENIWKVMKEYM.jpg?auth=8e24e0b03f44949ab748837016d225cc433131dbc0df11944a88d084335799fe&width=300&height=200&quality=80&smart=false'
        );
    });

    test('should return a empty string when the url is not defined', () => {
        expect(replaceProductiveImgDomain(undefined)).toStrictEqual('');
    });

    test('should return the parameter it receives when it receives something other than a string.', () => {
        expect(replaceProductiveImgDomain(null)).toStrictEqual('');
    });

    test('should return the parameter it receives when it receives something other than a string.', () => {
        expect(replaceProductiveImgDomain({})).toStrictEqual('');
    });
});

describe('Tests - function - replaceProductiveImgDomain', () => {
    test('should return articles with the domain "RESIZER_URL_PUBLIC" in url and resized urls when the enviroment is sandbox', () => {
        env.API_ENV = 'sandbox';

        replaceUrlsByEnvironment(responseRankingArticleSource).forEach(
            article => {
                const resizedUrls = get(
                    article,
                    'promo_items.basic.resized_urls'
                );

                resizedUrls.forEach(({ resizedUrl } = {}) => {
                    expect(
                        resizedUrl.includes(env.RESIZER_URL_PUBLIC)
                    ).toBeTruthy();
                });

                expect(
                    get(article, 'promo_items.basic.url').includes(
                        env.RESIZER_URL_PUBLIC
                    )
                ).toBeTruthy();
            }
        );
    });

    test('should return a empty array when is sandbox and articles is not defined', () => {
        expect(replaceUrlsByEnvironment()).toStrictEqual([]);
    });
    test('should return the items the same as you receive them when the environment is production.', () => {
        env.API_ENV = 'prod';

        expect(
            replaceUrlsByEnvironment(responseRankingArticleSource)
        ).toStrictEqual(responseRankingArticleSource);
    });
});
