import {
    resizeVideoImagesV1,
    updateVideoUrl
} from '../../../../../content/sources/utils/videoSource/_helper';
import getImageResized from '../../../../../components/private/common/utils/getImageResized';
import responseVideoSource from '../../../../../__mocks__/data/videos/responseVideoSource.json';
import getProperties from 'fusion:properties';

jest.mock(
    '../../../../../components/private/common/utils/getImageResized',
    () => jest.fn()
);

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({
        imageConfig: {
            resize: {
                videoImage: {
                    promo_items: {
                        sizes: [
                            {
                                width: 820,
                                height: 410
                            },
                            {
                                width: 768,
                                height: 414
                            },
                            {
                                width: 360,
                                height: 180
                            },
                            {
                                width: 351,
                                height: 175
                            }
                        ]
                    }
                }
            }
        }
    })
}));

const resizedUrls = [
    {
        resizedUrl:
            'https://resizer.glanacion.com/resizer/3MBrMT1syhbdj5a6dMzxqSnBtRY=/820x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/04-18-2023/t_c8149afb046d4db6af1c2299d0c75bce_name_file_1280x720_2000_v3_1_.jpg',
        option: { width: 820, height: 410 }
    },
    {
        resizedUrl:
            'https://resizer.glanacion.com/resizer/QTeP05u7AyaRi2ngFlUHB8oezUk=/768x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/04-18-2023/t_c8149afb046d4db6af1c2299d0c75bce_name_file_1280x720_2000_v3_1_.jpg',
        option: { width: 768, height: 414 }
    },
    {
        resizedUrl:
            'https://resizer.glanacion.com/resizer/qY_jw7O7rKNuMtjasZmTpKLNYXo=/360x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/04-18-2023/t_c8149afb046d4db6af1c2299d0c75bce_name_file_1280x720_2000_v3_1_.jpg',
        option: { width: 360, height: 180 }
    },
    {
        resizedUrl:
            'https://resizer.glanacion.com/resizer/jTSAfnPnQAqpe6gjWO8boYnm9YA=/351x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/04-18-2023/t_c8149afb046d4db6af1c2299d0c75bce_name_file_1280x720_2000_v3_1_.jpg',
        option: { width: 351, height: 175 }
    }
];

const siteProps = {
    uri: '/video/el-noticiero-am-18-de-abril-2023-vidfacb607e/',
    id: '',
    url: '/video/el-noticiero-am-18-de-abril-2023-vidfacb607e',
    website: 'ott',
    'arc-site': 'ott'
};

jest.mock('fusion:environment', () => {
    return {
        VIDEO_CDN_URL: 'https://lanacionar-prod.video.arc-cdn.net/'
    };
});

describe('Tests - videoSource - Helper', () => {
    describe('Tests function resizeVideoImagesV1', () => {
        test('should return a object with data nice in OTT', () => {
            getImageResized.mockImplementation(() => resizedUrls);

            expect(
                resizeVideoImagesV1({
                    data: responseVideoSource,
                    siteProps,
                    arcSite: 'ott'
                })
            ).toStrictEqual({
                ...responseVideoSource,
                promo_items: {
                    basic: {
                        ...responseVideoSource.promo_items.basic,
                        resized_urls: resizedUrls,
                        url:
                            'https://resizer.glanacion.com/resizer/3MBrMT1syhbdj5a6dMzxqSnBtRY=/820x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/04-18-2023/t_c8149afb046d4db6af1c2299d0c75bce_name_file_1280x720_2000_v3_1_.jpg'
                    }
                }
            });
        });

        test('test return when the resizedUrls is undefined in ott', () => {
            getImageResized.mockImplementation(() => undefined);

            expect(
                resizeVideoImagesV1({
                    data: responseVideoSource,
                    siteProps,
                    arcSite: 'ott'
                })
            ).toStrictEqual({
                ...responseVideoSource,
                promo_items: {
                    basic: {
                        ...responseVideoSource.promo_items.basic,
                        resized_urls: [],
                        url: ''
                    }
                }
            });
        });

        test('Should return a empty object when the parameters is not defined', () => {
            getImageResized.mockImplementation(() => undefined);

            expect(resizeVideoImagesV1(undefined)).toStrictEqual({});
        });
    });

    describe('Tests function updateVideoUrl', () => {
        test('should update video URLs with new domain', () => {
            const videoData = {
                type: 'video',
                streams: [
                    {
                        url: 'https://example.com/video1.mp4',
                        stream_type: 'mp4'
                    },
                    {
                        url: 'https://eexxaammppllee22test.test.com/video2.mp4',
                        stream_type: 'mp4'
                    }
                ]
            };

            const updatedData = updateVideoUrl(videoData);

            expect(updatedData.streams[0].url).toBe(
                'https://lanacionar-prod.video.arc-cdn.net/video1.mp4'
            );
            expect(updatedData.streams[1].url).toBe(
                'https://lanacionar-prod.video.arc-cdn.net/video2.mp4'
            );
        });

        test('should handle empty streams array', () => {
            const videoData = {
                streams: []
            };

            const updatedData = updateVideoUrl(videoData);

            expect(updatedData.streams).toHaveLength(0);
        });

        test('should handle missing streams property', () => {
            const videoData = {
                type: 'video'
            };

            const updatedData = updateVideoUrl(videoData);

            expect(updatedData.streams).toEqual([]);
        });
    });
});
