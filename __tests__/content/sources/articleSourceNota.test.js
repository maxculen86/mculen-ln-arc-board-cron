import 'regenerator-runtime/runtime';
import env from '../../../__mocks__/fusion:environment';
import properties from '../../../__mocks__/fusion:properties';
import Redirect from '../../../content/sources/utils/redirect';
import NotFoundError from '../../../content/sources/utils/notFoundError';
import {
    recipePowerUps,
    removeParallaxPowerUp
} from '../../../content/sources/utils/powerUp';
import contentElementRecipe from '../../../__mocks__/data/articles/contentElementsRecipe.json';
import articleSourceNota from '../../../content/sources/articleSourceNota';
import validateExclusiveAccess from '../../../content/sources/utils/validateExclusiveAccess';
import responseNotaNoticia from '../../../__mocks__/data/articles/3SHTRO3NKBCN7L3JITCDQYSJLM.json';
import responseSinCategoria from '../../../__mocks__/data/articles/3SHTRO3NKBCN7L3JITCDQYSJLM.json';
import responseHtmlLibreArticle from '../../../__mocks__/data/nota/cuerpo/notaHtml.json';
import responseSoloAperturaMultimedia from '../../../__mocks__/data/articles/JLMPIDPYXFH3JPLFTZNJGONPNA.json';
import responseAperturaBasic from '../../../__mocks__/data/articles/X7HUAP25GFAGDOZ3AHOXLQVL4Q.json';
import responseBasic from '../../../__mocks__/data/articles/YJJ7JHAWNJFTDH2RLJ4QHUTA5A.json';

const buildFetchResponse = data =>
    Promise.resolve({
        json: () => Promise.resolve(data)
    });

const mockResponseNotaNoticia = buildFetchResponse(responseNotaNoticia);
const mockResponseSinCategoria = buildFetchResponse(responseSinCategoria);
const mockResponseAperturaMultimedia = buildFetchResponse(
    responseSoloAperturaMultimedia
);
const mockResponseAperturaBasic = buildFetchResponse(responseAperturaBasic);
const mockResponseBasic = buildFetchResponse(responseBasic);
const mockRequestResponse = jest.fn();
const originalFetch = global.fetch;
const mockFetch = jest.fn(() => mockRequestResponse());

beforeAll(() => {
    global.fetch = mockFetch;
});

afterEach(() => {
    mockFetch.mockClear();
    mockRequestResponse.mockReset();
});

afterAll(() => {
    global.fetch = originalFetch;
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

//TODO: SE DEBE MOCKER EL FETCH
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

    /**
     * TODO: Se agrega la linea 92 por hotfix de validateExclusiveAccess
     */
    it('validateExclusive access must be called when checkExclusiveAccess true', done => {
        articleSourceFetch(
            {
                ...query,
                paywallEnabled: '1',
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
    const mockResponseHtmlLibre = buildFetchResponse(responseHtmlLibreArticle);
    beforeEach(() => {
        Redirect.mockClear();
        NotFoundError.mockClear();
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
            buildFetchResponse({
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

describe('Content - sources - utils - powerUp (recipes w/ ingredients and preparation)', () => {
    describe('Original Content Element', () => {
        const wrapper = recipePowerUps(contentElementRecipe.unformatted);
        const stringWrapper = JSON.stringify(wrapper);
        test('Should return content_element with correct format and array for recipes PowerUps be first on top.', () => {
            expect(wrapper).toStrictEqual(contentElementRecipe.formatted);
            expect(stringWrapper).toMatch('custom-ingrediente');
            expect(stringWrapper).toMatch('custom-preparacion');
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

describe('Category test', () => {
    it('should get categoria', done => {
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

    it('no categoria value', done => {
        mockRequestResponse.mockReturnValue(mockResponseSinCategoria);

        articleSourceFetch(query)
            .then(response => {
                expect(response).toStrictEqual({
                    ...responseSinCategoria,
                    taxonomy: {
                        ...responseSinCategoria.taxonomy,
                        sections: []
                    },
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

describe('Html apertura', () => {
    it('should get html, config only apertura_multimedia', done => {
        mockRequestResponse.mockReturnValue(mockResponseAperturaMultimedia);

        articleSourceFetch(query)
            .then(response => {
                expect(response).toStrictEqual({
                    ...responseSoloAperturaMultimedia,
                    category: 'Agencias',
                    paywallEnabled: '',
                    subscription: 'A',
                    isListenable: false,
                    withFirmaDistributor: true,
                    withSponsoredLink: false
                });
            })
            .then(done);
    });

    it('should get html config both html', done => {
        mockRequestResponse.mockReturnValue(mockResponseAperturaBasic);

        articleSourceFetch(query)
            .then(response => {
                expect(response).toStrictEqual({
                    ...responseAperturaBasic,
                    category: 'Arquitectura',
                    paywallEnabled: '',
                    subscription: 'A',
                    isListenable: false,
                    withFirmaDistributor: true,
                    withSponsoredLink: false
                });
            })
            .then(done);
    });

    it('should get html, config only basic raw_html', done => {
        mockRequestResponse.mockReturnValue(mockResponseBasic);

        articleSourceFetch(query)
            .then(response => {
                expect(response).toStrictEqual({
                    ...responseBasic,
                    category: 'Tendencias',
                    paywallEnabled: '',
                    subscription: 'A',
                    isListenable: false,
                    withFirmaDistributor: false,
                    withSponsoredLink: false
                });
            })
            .then(done);
    });
});

describe('Author Voice Data', () => {
    it('should get voice value, when exist', () => {
        mockRequestResponse.mockReturnValue(mockResponseBasic);

        articleSourceFetch(query, {
            cachedCall: jest.fn()
        }).then(response => {
            expect(
                response.credits.by[0].additional_properties.original.voice
            ).toBe('1');
        });
    });

    it('should get empty author data, when not exists', () => {
        mockRequestResponse.mockReturnValue(mockResponseAperturaBasic);

        articleSourceFetch(query, {
            cachedCall: jest.fn()
        }).then(response => {
            expect(response.credits.by).toHaveLength(0);
        });
    });
});
