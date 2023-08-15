import { useContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/acumulado/articlePreload';
import useGetArticlesToPreload from '../../../../../components/private/LN/common/hooks/useGetArticlesToPreload';

describe('Private - Common - Hooks - useGetArticlesFromAcumSource', () => {
    it('should return an article', () => {
        const article = {
            promo_items: {
                basic: {
                    height: 513,
                    resized_urls: [
                        {
                            option: {
                                height: 587,
                                media_preload: '(min-width: 768px)',
                                minScreenWidth: 768,
                                proportion: '3:2',
                                width: 880
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/3omttFEIB5WUgXnGDq-2KXeZuVA=/880x586/smart/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/HNSRVP73FBA37LQCCLQ5ZAQMXU.jpg'
                        },
                        {
                            option: {
                                height: 280,
                                media_preload: '(max-width: 767px)',
                                proportion: '3:2',
                                width: 420
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/HbGSk1t4P2CutjqtL94dmWai45I=/420x280/smart/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/HNSRVP73FBA37LQCCLQ5ZAQMXU.jpg'
                        }
                    ],
                    type: 'image',
                    url:
                        'https://resizer.glanacion.com/resizer/OMJnhwkq0tXzFF8kJ0wBP6OgrHw=/768x0/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/HNSRVP73FBA37LQCCLQ5ZAQMXU.jpg',
                    width: 768
                }
            },
            type: 'story',
            _id: 'HSPZIST4PJC2VHU3KCSFV7LHFA'
        };

        useContent.mockReturnValueOnce(article);

        const articleQueryArguments = {
            filter,
            size: 1,
            articleId: 'HSPZIST4PJC2VHU3KCSFV7LHFA',
            imageId: '',
            imageConfig: '',
            website: 'la-nacion-ar',
            staticMode: true
        };

        expect(useGetArticlesToPreload(articleQueryArguments)).toEqual([
            article
        ]);
    });
});
