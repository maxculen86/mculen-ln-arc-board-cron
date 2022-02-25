import getProperties from 'fusion:properties';
import removeInvalidUrlTagA from '../../../../../components/private/common/utils/removeInvalidUrlTagA';
import powerUp from '../../../../../content/sources/utils/powerUp';
import contentElementRecipe from '../../../../../__mocks__/data/articles/contentElementsRecipe.json';
import articleSourceNota from '../../../../../content/sources/articleSourceNota';
import responseArticleSource from '../../../../../__mocks__/data/articles/responseArticleSource';
import validateExclusiveAccess from '../../../../../content/sources/utils/validateExclusiveAccess';

const mockData = responseArticleSource;
jest.mock('request-promise-native', () => {
    const mock = {
        __esModule: true,
        default: (method, url, body, headers) => Promise.resolve(mockData),
        defaults: () => mock.default
    };

    return mock;
});

jest.mock(
    '../../../../../content/sources/utils/validateExclusiveAccess',
    () => {
        return jest.fn();
    }
);

jest.mock('../../../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({
        imageConfig: {
            resize: {
                m: {
                    promo_items: {
                        sizes: [
                            {
                                width: 360,
                                height: 240,
                                media: '1024',
                                proportion: '3:2'
                            },
                            {
                                width: 768,
                                height: 512,
                                media: '1024',
                                proportion: '3:2'
                            },
                            {
                                width: 351,
                                height: 234,
                                media: '1024',
                                proportion: '3:2'
                            },
                            {
                                width: 360,
                                height: 240,
                                media: '1024',
                                proportion: '3:2'
                            }
                        ]
                    },
                    content_elements: {
                        sizes: [
                            {
                                width: 278,
                                height: 186,
                                media: '1024'
                            },
                            {
                                width: 344,
                                height: 230,
                                media: '1024'
                            },
                            {
                                width: 768,
                                height: 513,
                                media: '(max-width: 375px)'
                            },
                            {
                                width: 350,
                                height: 234,
                                media: '(max-width: 375px)'
                            },
                            {
                                width: 360,
                                height: 234,
                                media: '(max-width: 375px)'
                            }
                        ]
                    },
                    credits: {
                        sizes: [
                            {
                                width: 80,
                                height: 80,
                                media: '1024'
                            }
                        ]
                    }
                },
                default: [
                    {
                        width: 1033,
                        height: 768,
                        media: '1024',
                        class: 'img-desktop',
                        media_preload: '1024'
                    }
                ]
            }
        }
    })
}));
describe('Article source nota - validateExclusiveAccess', () => {
    const { fetch: articleSourceFetch } = articleSourceNota;
    const query = {
        uri: '/comunidad/nota-prueba-caja-cerrada-nid17022022/',
        url: '/comunidad/nota-prueba-caja-cerrada-nid17022022/',
        meteringVariant: 'A',
        'arc-site': 'la-nacion-ar',
        checkExclusiveAccess: false,
        imageConfig: 'm'
    };
    it('validateExclusive access must NOT be called when checkExclusiveAccess false', done => {
        articleSourceFetch(query)
            .then(response => {
                expect(validateExclusiveAccess).toBeCalledTimes(0);
            })
            .then(done);
    });
    const queryTrue = {
        ...query,
        checkExclusiveAccess: true
    };
    it('validateExclusive access must be called when checkExclusiveAccess true', done => {
        articleSourceFetch(queryTrue)
            .then(response => {
                expect(validateExclusiveAccess).toBeCalledTimes(1);
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

describe('Content - sources - powerUp (recipes w/ ingredients and preparation)', () => {
    describe('Original Content Element', () => {
        test('Should return content_element with correct format and array for recipes PowerUps be first on top.', () => {
            const wrapper = powerUp(contentElementRecipe.unformatted);
            expect(wrapper).toStrictEqual(contentElementRecipe.formatted);
        });
    });
    describe('Should return correct content_element format', () => {
        test('When content_element is empty array, returns empty array', () => {
            const contentElementEmpty = [];
            const expectedResult = [];

            const wrapper = powerUp(contentElementEmpty);
            expect(wrapper).toStrictEqual(expectedResult);
        });
        test('When content_element does not have power ups, returns content_element unmodified', () => {
            const expectedResult = contentElementRecipe.noPowerUps;

            const wrapper = powerUp(contentElementRecipe.noPowerUps);
            expect(wrapper).toStrictEqual(expectedResult);
        });
    });
});
