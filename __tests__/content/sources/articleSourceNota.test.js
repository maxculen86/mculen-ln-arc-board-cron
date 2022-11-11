import 'regenerator-runtime/runtime';
import env from '../../../__mocks__/fusion:environment';
import properties from '../../../__mocks__/fusion:properties';
import Redirect from '../../../content/sources/utils/redirect';
import NotFoundError from '../../../content/sources/utils/notFoundError';
import removeInvalidUrlTagA from '../../../components/private/common/utils/removeInvalidUrlTagA';
import {
    recipePowerUps,
    removeParallaxPowerUp
} from '../../../content/sources/utils/powerUp';
import contentElementRecipe from '../../../__mocks__/data/articles/contentElementsRecipe.json';
import articleSourceNota, {
    resolve
} from '../../../content/sources/articleSourceNota';
import validateExclusiveAccess from '../../../content/sources/utils/validateExclusiveAccess';
import responseNotaNoticia from '../../../__mocks__/data/articles/3SHTRO3NKBCN7L3JITCDQYSJLM.json';
import responseHtmlLibreArticle from '../../../__mocks__/data/nota/cuerpo/notaHtml.json';

const mockResponseNotaNoticia = Promise.resolve(responseNotaNoticia);
const mockRequestResponse = jest.fn();

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: () => mockRequestResponse()
    };
});

jest.mock('../../../content/sources/utils/validateExclusiveAccess', () =>
    jest.fn()
);

jest.mock('../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

jest.mock('../../../content/sources/utils/redirect', () => jest.fn());
jest.mock('../../../content/sources/utils/notFoundError', () => jest.fn());

const { fetch: articleSourceFetch } = articleSourceNota;

const query = {
    uri: '/comunidad/nota-prueba-caja-cerrada-nid17022022/',
    url: '/comunidad/nota-prueba-caja-cerrada-nid17022022/',
    meteringVariant: 'A',
    'arc-site': 'la-nacion-ar',
    checkExclusiveAccess: false,
    imageConfig: 'm',
    outputType: 'default'
};

describe('Article source nota - validateExclusiveAccess', () => {
    beforeEach(() => {
        mockRequestResponse.mockReturnValue(mockResponseNotaNoticia);
    });
    afterEach(() => {
        validateExclusiveAccess.mockClear();
    });

    it('validateExclusive access must NOT be called when checkExclusiveAccess false & match snapshot', done => {
        articleSourceFetch(query, {
            cachedCall: jest.fn()
        })
            .then(response => {
                expect(validateExclusiveAccess).toBeCalledTimes(0);
                expect(response).toMatchSnapshot();
            })
            .then(done);
    });

    it('validateExclusive access must be called when checkExclusiveAccess true', done => {
        articleSourceFetch(
            {
                ...query,
                checkExclusiveAccess: true
            },
            {
                cachedCall: jest.fn()
            }
        )
            .then(response => {
                expect(validateExclusiveAccess).toBeCalledTimes(1);
            })
            .then(done);
    });
});

describe('Article source nota - htmlLibre AMP 404', () => {
    const mockResponseHtmlLibre = Promise.resolve(responseHtmlLibreArticle);
    beforeEach(() => {
        Redirect.mockClear();
        NotFoundError.mockClear();
    });
    describe('When is htmlLibre subtype 9 and outputType AMP', () => {
        it('Should throw notFound error 404', done => {
            mockRequestResponse.mockReturnValueOnce(mockResponseHtmlLibre);
            query.outputType = 'amp';

            articleSourceFetch(query, {
                cachedCall: jest.fn()
            })
                .then(() => {
                    expect(Redirect).not.toBeCalled();
                    expect(NotFoundError).toBeCalledWith(
                        'Pagina en Amp no encontrada'
                    );
                })
                .then(done);
        });
    });
    describe('When is NOT htmlLibre subtype and outputType AMP', () => {
        it('Should NOT throw notFound error 404', done => {
            mockRequestResponse.mockReturnValueOnce(mockResponseNotaNoticia);
            query.outputType = 'amp';

            articleSourceFetch(query, {
                cachedCall: jest.fn()
            })
                .then(() => {
                    expect(Redirect).not.toBeCalled();
                    expect(NotFoundError).not.toBeCalled();
                })
                .then(done);
        });
    });
    describe('When is htmlLibre subtype 9 and outputType default', () => {
        it('Should NOT throw notFound error 404', done => {
            mockRequestResponse.mockReturnValueOnce(mockResponseHtmlLibre);
            query.outputType = 'default';

            articleSourceFetch(query, {
                cachedCall: jest.fn()
            })
                .then(() => {
                    expect(Redirect).not.toBeCalled();
                    expect(NotFoundError).not.toBeCalled();
                })
                .then(done);
        });
    });
});

describe('Article source nota - redirect', () => {
    beforeEach(() => {
        mockRequestResponse.mockReturnValue(
            Promise.resolve({
                ...responseNotaNoticia,
                type: 'redirect',
                redirect_url: 'https://www.lanacion.com.ar/'
            })
        );
    });

    it('Must redirect to provided redirect_url with status code 301', done => {
        articleSourceFetch(query, {
            cachedCall: jest.fn()
        })
            .then(() => {
                expect(Redirect).toBeCalledTimes(1);
                expect(Redirect).toBeCalledWith(
                    'https://www.lanacion.com.ar/',
                    301
                );
            })
            .then(done);
    });
});

describe('Article source nota - defensive cachedCall', () => {
    beforeEach(() => {
        mockRequestResponse.mockReturnValue(mockResponseNotaNoticia);
    });
    it('Return test when cachedcall is not defined', done => {
        articleSourceFetch(query)
            .then(response => {
                expect(response).toStrictEqual({
                    ...responseNotaNoticia,
                    taxonomy: { ...responseNotaNoticia.taxonomy, sections: [] },
                    paywallEnabled: '',
                    subscription: 'A',
                    isListenable: false,
                    withFirmaDistributor: true,
                    withSponsoredLink: false
                });
            })
            .then(done);
    });
});

describe('Common - utils - removeInvalidUrlTagA.js', () => {
    describe('Content Element with url valid in <a> tag', () => {
        const contentElementValid = [
            {
                type: 'text',
                content: `texto texto <b>prueba</b>, texto texto.`
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="www.test.com">prueba</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="http://www.test.com">prueba</a> texto <a href="http://www.other.com"> texto.'
            },
            {
                type: 'text',
                content: 'texto texto <a href="test.com">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="http://test.com/asdasd/dasd">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="http://test.com/?q=dasdsad">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="www.4354test.com">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="/test/hola/bye/">algo</a> texto texto.'
            }
        ];

        test('Should return content_element without modifications', () => {
            const wrapper = removeInvalidUrlTagA(contentElementValid);
            expect(wrapper).toStrictEqual(contentElementValid);
        });
    });

    describe('Should return with <!-- URL INVALIDA REMOVIDA --> ', () => {
        test('When url has space', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="http://en www.sushiclub.com.ar/nuestros_espacios">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url begin with number', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="435345www.test.com">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url with http and begin with number', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="http://435345www.dsad.com">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url is just a word', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="hello">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url has space', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="https://cas as.com">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url begin with hyphen', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="-casas.com">texto dentro del tag a</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto texto dentro del tag a, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When is 2 url and one is invalid', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="casas.com">algo</a>, texto texto <a href="casas s.com">texto dentro del tag a</a>.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="casas.com">algo</a>, texto texto texto dentro del tag a.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });
    });
});

describe('Content - sources - utils - powerUp (recipes w/ ingredients and preparation)', () => {
    describe('Original Content Element', () => {
        const wrapper = recipePowerUps(contentElementRecipe.unformatted);
        const stringWrapper = JSON.stringify(wrapper);
        test('Should return content_element with correct format and array for recipes PowerUps be first on top.', () => {
            expect(wrapper).toStrictEqual(contentElementRecipe.formatted);
            expect(stringWrapper).toContain('custom-ingrediente');
            expect(stringWrapper).toContain('custom-preparacion');
        });
    });
    describe('Should return correct content_element format', () => {
        test('When content_element is empty array, returns empty array', () => {
            const contentElementEmpty = [];
            const expectedResult = [];

            const wrapper = recipePowerUps(contentElementEmpty);
            expect(wrapper).toStrictEqual(expectedResult);
        });
        test('When content_element does not have power ups, returns content_element unmodified', () => {
            const expectedResult = contentElementRecipe.noPowerUps;

            const wrapper = recipePowerUps(contentElementRecipe.noPowerUps);
            expect(wrapper).toStrictEqual(expectedResult);
        });
    });
});
describe('Content - sources - utils - removeParallaxPowerUp', () => {
    const parallaxContentElement = {
        _id: '256RFM63BBANFMJ4QZJEYZV3UE',
        type: 'custom_embed',
        subtype: 'custom-parallax',
        additional_properties: {
            _id: 'DLUV2Q4SJBHMLIXP4WXFBZ46AM',
            comments: []
        },
        embed: {
            config: {
                imageId: 'JNVTFZAOFRE5TLQ7CVAOIB4UKY',
                title: 'Titulo parallax prueba',
                paragraph:
                    'Esta es una prueba de parallax, con un parrafo de ejemplo.'
            },
            id: '15fe194324c0a9',
            url: 'https://www.lanacion.com.ar/'
        }
    };
    test('Should remove parallax from non-fotoAl100 note, for example recipe', () => {
        const expectedResult = contentElementRecipe.unformatted;
        const contentElementsRecipeParallax = [
            ...expectedResult,
            parallaxContentElement
        ];
        const wrapper = removeParallaxPowerUp(contentElementsRecipeParallax);
        expect(wrapper).toStrictEqual(expectedResult);
    });
});

describe('ByUrl regex', () => {
    const key = {
        'arc-site': 'la-nacion-ar',
        url:
            '/api/v1/notas/byUrl/deportes/futbol/river-campeon-como-quedo-la-tabla-historica-del-futbol-argentino-y-asi-esta-la-pelea-con-boca-nid25112021/'
    };
    it('Return url ok when url is not clear', () => {
        expect(resolve(key)).toEqual(
            '/content/v4/stories/?website=la-nacion-ar&website_url=/deportes/futbol/river-campeon-como-quedo-la-tabla-historica-del-futbol-argentino-y-asi-esta-la-pelea-con-boca-nid25112021/'
        );
    });
    const key_ = {
        'arc-site': 'la-nacion-ar',
        url:
            '/deportes/futbol/river-campeon-como-quedo-la-tabla-historica-del-futbol-argentino-y-asi-esta-la-pelea-con-boca-nid25112021/'
    };
    it('Return url ok when url is clear', () => {
        expect(resolve(key_)).toEqual(
            '/content/v4/stories/?website=la-nacion-ar&website_url=/deportes/futbol/river-campeon-como-quedo-la-tabla-historica-del-futbol-argentino-y-asi-esta-la-pelea-con-boca-nid25112021/'
        );
    });
});

describe('Author role', () => {
    it('should get author role', done => {
        articleSourceFetch(query)
            .then(response => {
                expect(response).toStrictEqual({
                    ...responseNotaNoticia,
                    taxonomy: { ...responseNotaNoticia.taxonomy, sections: [] },
                    paywallEnabled: '',
                    subscription: 'A',
                    isListenable: false,
                    withFirmaDistributor: true,
                    withSponsoredLink: false
                });
            })
            .then(done);
    });

    it('should not get author role', done => {
        mockRequestResponse.mockReturnValue(mockResponseNotaNoticia);

        articleSourceFetch(query)
            .then(response => {
                expect(response).toStrictEqual({
                    ...responseNotaNoticia,
                    taxonomy: { ...responseNotaNoticia.taxonomy, sections: [] },
                    paywallEnabled: '',
                    subscription: 'A',
                    isListenable: false,
                    withFirmaDistributor: true,
                    withSponsoredLink: false
                });
            })
            .then(done);
    });
});
