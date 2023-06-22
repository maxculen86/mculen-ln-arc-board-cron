import LNApiErrorArticles from '../../../../../../../../../../components/private/LN/api/common/article/models/exceptions/lnApiErrorArticles';
import imageCommon from '../../../../../../../../../../components/private/LN/api/common/elements/image';
import CardWebStory from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/externalArticle/cardWebStory';

jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/elements/image',
    () => {
        return jest.fn().mockReturnValue({
            _t: 'img',
            baseUrl:
                '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/B2S2JCMFCRAXTNHLNIPVE52SUE.JPG',
            absoluteUrl:
                'https://resizer.glanacion.com/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/B2S2JCMFCRAXTNHLNIPVE52SUE.JPG',
            parametros: [
                {
                    media: 768,
                    ancho: 768,
                    alto: 513,
                    firma:
                        'nYHpxgHh7-afQq4xO_hSuYtBzbc=/768x0/filters:format(webp):quality(80)'
                }
            ]
        });
    }
);

describe('components - private - LN - api - v1 - mobile - home - externalArticle - cardWebStory', () => {
    const baseArticle = {
        _id: '123',
        additionalProperties: {
            title: 'Test Article',
            link: 'https://test.com',
            lead: 'This is a test article',
            imagen: {
                promo_items: {
                    basic: {
                        type: 'image',
                        url: 'https://test.com/image.jpg'
                    }
                }
            }
        },
        label: {
            volanta: {
                text: 'Test Volanta'
            }
        }
    };

    describe('webstory imagen with incorrect values', () => {
        const linkData = [
            '',
            null,
            undefined,
            {},
            { imagen: { promo_items: {} } },
            { imagen: { promo_items: { basic: {} } } },
            { imagen: { promo_items: { basic: { type: '' } } } },
            { imagen: { promo_items: { basic: { type: undefined } } } },
            { imagen: { promo_items: { basic: { type: null } } } },
            { imagen: { promo_items: { basic: { url: '' } } } },
            { imagen: { promo_items: { basic: { url: undefined } } } },
            { imagen: { promo_items: { basic: { url: null } } } },
            { imagen: { promo_items: { basic: { url: '', type: '' } } } }
        ];

        const testData = linkData.map(imagen => [
            Object.assign({}, baseArticle, {
                additionalProperties: {
                    ...baseArticle.additionalProperties,
                    imagen
                }
            }),
            LNApiErrorArticles,
            imagen
        ]);

        it.each(testData)(
            'CardWebStory with params %j should return %p when imagen is %j',
            (article, expectedResult) => {
                expect(() => CardWebStory(article)).toThrow(LNApiErrorArticles);
            }
        );
    });
    describe('webstory link with incorrect values', () => {
        const linkData = ['', null, undefined];

        const testData = linkData.map(link => [
            Object.assign({}, baseArticle, {
                additionalProperties: {
                    ...baseArticle.additionalProperties,
                    link
                }
            }),
            LNApiErrorArticles,
            link
        ]);

        it.each(testData)(
            'CardWebStory with params %j should trhow "%p" when link is %p',
            (article, expectedResult) => {
                expect(() => CardWebStory(article)).toThrow(LNApiErrorArticles);
            }
        );
    });
    describe('webstory id with incorrect values', () => {
        const idData = ['', null, undefined];

        const testData = idData.map(_id => [
            Object.assign({}, baseArticle, {
                _id
            }),
            LNApiErrorArticles,
            _id
        ]);

        it.each(testData)(
            'CardWebStory with params %j should trhow "%p" when id is %p',
            (article, expectedResult) => {
                expect(() => CardWebStory(article)).toThrow(LNApiErrorArticles);
            }
        );
    });
    describe('webstory title with incorrect values', () => {
        const titleData = ['', null, undefined];

        const testData = titleData.map(title => [
            Object.assign({}, baseArticle, {
                additionalProperties: {
                    ...baseArticle.additionalProperties,
                    title
                }
            }),
            LNApiErrorArticles
        ]);

        it.each(testData)(
            'CardWebStory with params "%j" should not throw "%p" when title is "%p"',
            (article, expectedResult) => {
                expect(() => CardWebStory(article)).not.toThrow(
                    LNApiErrorArticles
                );
            }
        );
    });
    describe('webstory volanta with incorrect values', () => {
        const leadData = ['', null, undefined];

        const testData = leadData.map(lead => [
            Object.assign({}, baseArticle, {
                additionalProperties: {
                    ...baseArticle.additionalProperties,
                    lead
                }
            }),
            LNApiErrorArticles,
            lead
        ]);

        it.each(testData)(
            'CardWebStory with params "%j" should not throw "%p" when lead is "%p"',
            (article, expectedResult) => {
                expect(() => CardWebStory(article)).not.toThrow(
                    LNApiErrorArticles
                );
            }
        );
    });

    it('Card webstory ok', () => {
        const article = {
            _id: '123',
            additionalProperties: {
                title: 'Test Article',
                link: 'https://test.com',
                lead: 'This is a test article',
                imagen: {
                    promo_items: {
                        basic: {
                            type: 'image',
                            url: 'https://test.com/image.jpg'
                        }
                    }
                }
            },
            label: {
                volanta: {
                    text: 'Test Volanta'
                }
            }
        };

        const result = CardWebStory(article);

        expect(result).toEqual({
            titulo: 'Test Article',
            id: '123',
            url: 'https://test.com',
            volanta: 'Test Volanta',
            imagen: {
                _t: 'img',
                baseUrl:
                    '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/B2S2JCMFCRAXTNHLNIPVE52SUE.JPG',
                absoluteUrl:
                    'https://resizer.glanacion.com/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/B2S2JCMFCRAXTNHLNIPVE52SUE.JPG',
                parametros: [
                    {
                        media: 768,
                        ancho: 768,
                        alto: 513,
                        firma:
                            'nYHpxgHh7-afQq4xO_hSuYtBzbc=/768x0/filters:format(webp):quality(80)'
                    }
                ]
            }
        });
    });

    it('should return any error', () => {
        const article = null;

        expect(() => CardWebStory(article)).toThrow();
    });
});
