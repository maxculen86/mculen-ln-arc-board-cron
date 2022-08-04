import getMediaData from '../../../../../components/private/LN/common/utils/modArticleHelper';
import responseRelatedImageSource from '../../../../../__mocks__/data/images/getDataToLinkImage/responseRelatedImageSource.json';
import videoBackground from '../../../../../__mocks__/data/videos/responseVideoSource';
import articleData from '../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';

describe('Test - getMediaData', () => {
    const mobileImage = {
        ...responseRelatedImageSource,
        promo_items: {
            basic: {
                ...responseRelatedImageSource.promo_items.basic,
                resized_urls: [
                    {
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/kh_7da3HKk78pMgnaBJsJyaSUko=/736x1104/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QGCBTSZEINF2HHBDIDXKJ6G7VE.jpg',
                        option: {
                            width: 736,
                            height: 1104,
                            useFullSize: true,
                            proportion: '2:3'
                        }
                    },
                    {
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/_S81zE8bKpgfAd_OnaAkCaaj50g=/375x563/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QGCBTSZEINF2HHBDIDXKJ6G7VE.jpg',
                        option: {
                            width: 375,
                            height: 563,
                            useFullSize: true,
                            proportion: '2:3'
                        }
                    },
                    {
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/NG54neKln0DoJ8Bj6_SOiz_D6sc=/320x520/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/QGCBTSZEINF2HHBDIDXKJ6G7VE.jpg',
                        option: {
                            width: 320,
                            height: 480,
                            useFullSize: true,
                            proportion: '2:3'
                        }
                    }
                ]
            }
        }
    };
    const layout = 'grilla1';
    const isRenderAuthor = false;
    const isRenderAuthorOpinion = false;
    const device = 'mobile';

    test('Should return the vertical image data', () => {
        expect(
            getMediaData(
                videoBackground,
                device,
                mobileImage,
                layout,
                isRenderAuthor,
                isRenderAuthorOpinion,
                articleData
            )
        ).toStrictEqual(mobileImage.promo_items.basic);
    });

    test('Should return the mobile image data when videoBackground is not defined in multimedia box', () => {
        expect(
            getMediaData(
                undefined,
                device,
                mobileImage,
                layout,
                isRenderAuthor,
                isRenderAuthorOpinion,
                articleData
            )
        ).toStrictEqual(mobileImage.promo_items.basic);
    });

    test('Should return the data of the featured image when mobileImage is not defined', () => {
        expect(
            getMediaData(
                videoBackground,
                device,
                undefined,
                layout,
                isRenderAuthor,
                isRenderAuthorOpinion,
                articleData
            )
        ).toStrictEqual(articleData.promo_items.basic);
    });

    test('Should return the data of the featured image when layout is different from Grilla 1', () => {
        const layout = 'featureFocalDerecho';
        expect(
            getMediaData(
                undefined,
                device,
                undefined,
                layout,
                isRenderAuthor,
                isRenderAuthorOpinion,
                articleData
            )
        ).toStrictEqual(articleData.promo_items.basic);
    });

    test('Should return the data of the featured image when videoBackground and mobileImage is not defined', () => {
        expect(
            getMediaData(
                undefined,
                device,
                undefined,
                layout,
                isRenderAuthor,
                isRenderAuthorOpinion,
                articleData
            )
        ).toStrictEqual(articleData.promo_items.basic);
    });

    test('should return null when there is no data', () => {
        expect(
            getMediaData(
                undefined,
                device,
                undefined,
                layout,
                isRenderAuthor,
                isRenderAuthorOpinion,
                undefined
            )
        ).toBeNull();
    });

    test('should return video data when device is desktop', () => {
        const device = 'desktop';
        expect(
            getMediaData(
                videoBackground,
                device,
                mobileImage,
                layout,
                isRenderAuthor,
                isRenderAuthorOpinion,
                articleData
            )
        ).toStrictEqual(videoBackground);
    });

    test('Should return the data of the featured image when device is desktop and videoBackground is not defined', () => {
        const device = 'desktop';
        expect(
            getMediaData(
                undefined,
                device,
                mobileImage,
                layout,
                isRenderAuthor,
                isRenderAuthorOpinion,
                articleData
            )
        ).toStrictEqual(articleData.promo_items.basic);
    });

    test('Should return the photo of the author', () => {
        const dataAuthors = {
            credits: {
                by: [
                    {
                        author: 'Jorge Fernández Díaz',
                        type: 'author',
                        image: {
                            resized_urls: [
                                {
                                    resizedUrl:
                                        'https://resizer.glanacion.com/resizer/sAWtYLpCf60HZM-pSOuv4VDCNWs=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/55/2089255.png'
                                },
                                {
                                    resizedUrl:
                                        'https://resizer.glanacion.com/resizer/PNjDoOm_Gkxjqpjax5_jKzkLX6k=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/91/2219591.png'
                                }
                            ]
                        },
                        alt_text: 'Foto de Jorge Fernández Díaz'
                    },
                    {
                        author: 'Carlos Pagni',
                        type: 'author',
                        image: {
                            url:
                                'https://resizer.glanacion.com/resizer/PNjDoOm_Gkxjqpjax5_jKzkLX6k=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/91/2219591.png'
                        },
                        alt_text: 'Foto de Jorge Fernández Díaz'
                    }
                ]
            }
        };
        expect(
            getMediaData(
                undefined,
                device,
                undefined,
                layout,
                true,
                isRenderAuthorOpinion,
                dataAuthors
            )
        ).toStrictEqual({
            altText: 'Foto de Jorge Fernández Díaz',
            height: 80,
            resized_urls: [
                {
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/sAWtYLpCf60HZM-pSOuv4VDCNWs=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/55/2089255.png'
                },
                {
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/PNjDoOm_Gkxjqpjax5_jKzkLX6k=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/91/2219591.png'
                }
            ],
            type: 'image',
            url:
                'https://resizer.glanacion.com/resizer/sAWtYLpCf60HZM-pSOuv4VDCNWs=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/55/2089255.png',
            width: 80
        });
    });
});
