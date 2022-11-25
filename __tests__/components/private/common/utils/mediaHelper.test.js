import {
    replaceAllUrlsResizerObject,
    replaceAllUrlsResizerArray,
    getMediaData
} from '../../../../../components/private/LN/common/utils/mediaHelper.js';
import wikiSourceData from '../../../../../__mocks__/data/wikiTag/wikiSourceData.json';
import wikiSourceDataResizerReplaced from '../../../../../__mocks__/data/wikiTag/wikiSourceDataResizerReplaced.json';
import wikiTagData from '../../../../../__mocks__/data/wikiTag/wikiTagData.json';

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

describe('mediaHelper util replaceUrlsResizedToWWW', () => {
    describe('replaceUrls in object', () => {
        const cases = [
            [
                'replace correctly',
                wikiSourceData,
                wikiSourceDataResizerReplaced
            ],
            ['return same object', wikiTagData, wikiTagData],
            ['return object empty (send empty)', {}, {}],
            ['return object empty (send undefined)', undefined, {}],
            ['return null', null, null],
            ['return array empty', [], []]
        ];
        test.each(cases)('%s', (message, first, resultExpected) => {
            const result = replaceAllUrlsResizerObject(first);
            expect(result).toEqual(resultExpected);
        });
    });

    describe('replaceUrls in Array', () => {
        const cases = [
            [
                'replace correctly',
                [wikiSourceData, { ...wikiSourceData, type: 2 }],
                [
                    wikiSourceDataResizerReplaced,
                    { ...wikiSourceDataResizerReplaced, type: 2 }
                ]
            ],
            ['return same array', [wikiTagData], [wikiTagData]],
            [
                'return array with object empty (send array with object empty)',
                [{}],
                [{}]
            ],
            [
                'return array with object empty (send array with undefined)',
                [undefined],
                [{}]
            ],
            ['return array with null', [null], [null]],
            ['return array empty', [], []]
        ];
        test.each(cases)('%s', (message, first, resultExpected) => {
            const result = replaceAllUrlsResizerArray(first);
            expect(result).toEqual(resultExpected);
        });
    });

    describe('Tests function getMediaData', () => {
        const aperturaMultimedia = {
            _id: '2adb18dc-46d9-4159-ba59-8636349ab0e3',
            promo_items: {
                basic: {
                    caption: 'Conflicto del neumático',
                    credits: {},
                    height: 513,
                    resized_urls: [
                        {
                            option: {
                                height: 206,
                                media_preload: '(max-width: 375px)',
                                width: 309
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/iKoiykA7bhIBeHjWs5egHtauIOM=/309x206/smart/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg'
                        },
                        {
                            option: {
                                height: 234,
                                media_preload:
                                    '(min-width: 375.1px and max-width: 768px)',
                                width: 351
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/j7JBsidQ3nrCtsqn2xoK2NqUbL4=/351x234/smart/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg'
                        }
                    ],
                    type: 'image',
                    url:
                        'https://resizer.glanacion.com/resizer/3IibxbS9Q7-2PL73hRaFQrk5XCA=/768x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg',
                    width: 768
                }
            },
            streams: [
                {
                    height: 360,
                    stream_type: 'mp4',
                    url:
                        'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/Juan_Cruz_Andrada/20220930/6337417356289817029a90ff/t_4b976608f9a3479591bb935bb39c257e_name_lv_0_20220929224858/file_640x360-600.mp4',
                    width: 640
                },
                {
                    height: 720,
                    stream_type: 'mp4',
                    url:
                        'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/Juan_Cruz_Andrada/20220930/6337417356289817029a90ff/t_4b976608f9a3479591bb935bb39c257e_name_lv_0_20220929224858/file_1280x720-2000-v3_1.mp4',
                    width: 1280
                }
            ],
            type: 'video'
        };

        const aperturaImage = {
            _id: 'EP4MVVKHJFARBA6Q273S655TMQ',
            height: 513,
            resized_urls: [
                {
                    option: {
                        height: 206,
                        media_preload: '(max-width: 375px)',
                        width: 309
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/TDFZYvddG7P4p8LrPAuWmlwvddI=/309x206/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/EP4MVVKHJFARBA6Q273S655TMQ.jpg'
                },
                {
                    option: {
                        height: 234,
                        media_preload:
                            '(min-width: 375.1px and max-width: 768px)',
                        width: 351
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/5cgnX52cF07G6vJsBMTP1jh5ifg=/351x234/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/EP4MVVKHJFARBA6Q273S655TMQ.jpg'
                }
            ],
            type: 'image',
            url:
                'https://resizer.glanacion.com/resizer/-xDflM1Ic1RxJc06uhR2rL-gr8U=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/EP4MVVKHJFARBA6Q273S655TMQ.jpg',
            width: 768
        };

        test('should replace the host of all urls to the nation - case type video ', () => {
            const promoItems = {
                apertura_multimedia: aperturaMultimedia
            };

            const { promo_items } = getMediaData(promoItems);

            expect(promo_items.basic.url).toStrictEqual(
                'https://www.lanacion.com.ar/resizer/3IibxbS9Q7-2PL73hRaFQrk5XCA=/768x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg'
            );

            promo_items.basic.resized_urls.forEach(({ resizedUrl }) => {
                expect(
                    resizedUrl.includes('https://www.lanacion.com.ar')
                ).toBeTruthy();
            });
        });

        test('should replace the host of all urls to the nation - case type image ', () => {
            const promoItems = {
                basic: aperturaImage
            };

            const { url, resized_urls } = getMediaData(promoItems);

            expect(url).toStrictEqual(
                'https://www.lanacion.com.ar/resizer/-xDflM1Ic1RxJc06uhR2rL-gr8U=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/EP4MVVKHJFARBA6Q273S655TMQ.jpg'
            );

            resized_urls.forEach(({ resizedUrl }) => {
                expect(
                    resizedUrl.includes('https://www.lanacion.com.ar')
                ).toBeTruthy();
            });
        });
    });
});
