import getBiggestImage from '../../../../../../components/private/LN/common/utils/getBiggestImage';

describe('Test function getBiggestImage', () => {
    test('Test return getBiggestImage', () => {
        const basic = {
            _id: 'Q6R6LDNENRHUNHYFTJIO4U4RAQ',
            additional_properties: {},
            caption: 'Gentileza: Carat (Belcolade - Puratos)',
            created_date: '2019-10-08T17:00:03Z',
            description: { basic: 'Gentileza: Carat (Belcolade)' },
            distributor: { name: '' },
            height: 721,
            publish_date: '2019-04-15T20:15:00Z',
            resized_urls: [
                {
                    option: {
                        height: 586,
                        media: '(min-width: 1280px)',
                        media_preload: '(min-width: 1280.1px)',
                        width: 879
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/D5T0pT3gy0zcNAMDqfSkK0kmO84=/879x586/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg'
                },
                {
                    option: {
                        height: 746,
                        media_preload:
                            '(min-width: 1024.1px and max-width: 1280px)',
                        width: 1200
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/swXZF8dV4tCLIGiHc7U4VEBYN6g=/1200x746/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg'
                },
                {
                    option: {
                        height: 512,
                        media_preload:
                            '(min-width: 768.1px and max-width: 1024px)',
                        width: 768
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/CJdY_0_w9Gl8JPJzo5AMjPqYSIM=/768x512/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg'
                },
                {
                    option: {
                        height: 234,
                        media_preload:
                            '(min-width: 375.1px and max-width: 768px)',
                        width: 351
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/_EOWkI5RWs8zKZFnRz4IrU8C25I=/351x234/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg'
                },
                {
                    option: {
                        height: 206,
                        media_preload: '(max-width: 375px)',
                        width: 309
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/FpALzRZrfKotDVpJPx2nFWUTMrc=/309x206/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg'
                }
            ],
            subtitle: 'Gentileza: Carat (Belcolade)',
            type: 'image',
            url:
                'https://resizer.glanacion.com/resizer/bHB42cAZV3OwE8ahuR1PL-RL9DM=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg',
            width: 2000
        };

        expect(getBiggestImage(basic)).toStrictEqual({
            bigHeight: 746,
            bigWidth: 1200,
            resizedUrl:
                'https://resizer.glanacion.com/resizer/swXZF8dV4tCLIGiHc7U4VEBYN6g=/1200x746/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Q6R6LDNENRHUNHYFTJIO4U4RAQ.jpg'
        });
    });

    test('Test return when basic is undefined', () => {
        expect(getBiggestImage(undefined)).toStrictEqual({
            bigHeight: undefined,
            bigWidth: undefined,
            resizedUrl: undefined
        });
    });
});
