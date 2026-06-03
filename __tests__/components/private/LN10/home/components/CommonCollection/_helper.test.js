import getCardConfig from '../../../../../../../components/private/LN10/home/components/CommonCollection/_helper';
import getAuthorsPhoto from '../../../../../../../components/private/common/utils/getAuthorsPhoto';
import articles from '../../../../../../../__mocks__/data/CommonCollection/articles.json';

describe('private - LN10 - home - components - CommonCollection - _helper', () => {
    describe('getCardConfig function', () => {
        const baseConfig = {
            withMarquee: true,
            withMarqueeImg: true,
            withSubhead: false,
            withMedia: true,
            withSection: false
        };

        test('single author with photo: shows name and photo', () => {
            const articleWithPhoto = articles[0];
            const result = getCardConfig(baseConfig, articleWithPhoto, true);
            const expectedPhotoUrl =
                (getAuthorsPhoto(articleWithPhoto) || {}).url || '';

            expect(result.marquee).toBe('Carlos Pagni');
            expect(result.marqueeImg).toBe(expectedPhotoUrl);
        });

        test('multiple authors: lists names in order and never shows photo', () => {
            const articleTwoAuthors = {
                credits: {
                    by: [
                        { type: 'author', name: 'Autor Uno' },
                        {
                            type: 'author',
                            name: 'Autor Dos',
                            image: {
                                resized_urls: [
                                    {
                                        option: {
                                            height: 80,
                                            width: 80,
                                            media: '(min-width: 320px)'
                                        },
                                        resizedUrl:
                                            'https://resizer.glanacion.com/resizer/test=/80x0/filters:format(webp):quality(80)/s3.amazonaws.com/arc-authors/lanacionar/test.png'
                                    }
                                ],
                                url: 'https://s3.amazonaws.com/arc-authors/lanacionar/test.png'
                            }
                        }
                    ]
                },
                promo_items: { basic: { type: 'image' } }
            };

            const result = getCardConfig(baseConfig, articleTwoAuthors, true);

            expect(result.marquee).toBe('Autor Uno y Autor Dos');
            expect(result.marqueeImg).toBeFalsy();
        });
    });
});
