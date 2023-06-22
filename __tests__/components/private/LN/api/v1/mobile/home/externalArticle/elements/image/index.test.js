import getExternalArticleImage from '../../../../../../../../../../../components/private/LN/api/v1/mobile/home/externalArticle/elements/image';
import Image from '../../../../../../../../../../../components/private/LN/api/common/elements/image';
import LNApiErrorArticles from '../../../../../../../../../../../components/private/LN/api/common/article/models/exceptions/lnApiErrorArticles';

describe('components - private - LN - api - v1 - mobile - home - externalArticle - elements - image', () => {
    const testData = [
        [
            {
                additionalProperties: {
                    imagen: {
                        promo_items: {
                            basic: {
                                type: 'image',
                                url: 'https://example.com/image.jpg'
                            }
                        }
                    }
                }
            },
            Image({
                type: 'image',
                url: 'https://example.com/image.jpg'
            })
        ],
        [
            {
                promo_items: {
                    basic: {
                        type: 'image',
                        url: 'https://example.com/image.jpg'
                    }
                }
            },
            Image({
                type: 'image',
                url: 'https://example.com/image.jpg'
            })
        ],
        [{}, LNApiErrorArticles],
        [
            {
                additionalProperties: {
                    imagen: {
                        promo_items: {
                            basic: {
                                type: 'video',
                                url: 'https://example.com/video.mp4'
                            }
                        }
                    }
                }
            },
            null
        ],
        [undefined, LNApiErrorArticles],
        [null, LNApiErrorArticles]
    ];

    test.each(testData)(
        'getExternalArticleImage should return %j when article is %j',
        (article, expectedResult) => {
            if (expectedResult === LNApiErrorArticles) {
                expect(() => getExternalArticleImage(article)).toThrow(
                    LNApiErrorArticles
                );
            } else {
                expect(getExternalArticleImage(article)).toBe(expectedResult);
            }
        }
    );
});
