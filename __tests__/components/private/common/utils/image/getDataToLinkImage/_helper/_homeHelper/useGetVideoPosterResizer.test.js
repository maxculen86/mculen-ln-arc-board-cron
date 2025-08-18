import { useContent } from 'fusion:content';
import useGetVideoPosterResized from '../../../../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/useGetVideoPosterResizer';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

describe('Tests hook useGetVideoPosterResized', () => {
    const props = {
        videoID: 'videoID',
        imageConfig: 'videoImages',
        isInApertura: true,
        isAdmin: false
    };

    it('It should return the video data with the auth on the images when is home ln10', () => {
        const respVideoWithResizedV2 = {
            resizedImages: {
                promo_items: {
                    basic: {
                        auth: {
                            1: '7303a63428f24dc05cb8edeab4212330c63fe92f430e6058b346fa1bd0b80056'
                        },
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fd3us6z9haan6vf.cloudfront.net%2F02-22-2023%2Ft_265c0bc25659424ebb3bd1471f7a6eb1_name_file_1280x720_2000_v3_1_.jpg?auth=7303a63428f24dc05cb8edeab4212330c63fe92f430e6058b346fa1bd0b80056&width=768&quality=80&smart=false',
                                option: {
                                    width: 768,
                                    height: 513,
                                    media: '(min-width: 768px)'
                                }
                            }
                        ]
                    }
                }
            }
        };

        useContent.mockReturnValueOnce(respVideoWithResizedV2);
        expect(useGetVideoPosterResized({ ...props })).toStrictEqual({
            promo_items: {
                basic: {
                    auth: {
                        1: '7303a63428f24dc05cb8edeab4212330c63fe92f430e6058b346fa1bd0b80056'
                    },
                    resized_urls: [
                        {
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fd3us6z9haan6vf.cloudfront.net%2F02-22-2023%2Ft_265c0bc25659424ebb3bd1471f7a6eb1_name_file_1280x720_2000_v3_1_.jpg?auth=7303a63428f24dc05cb8edeab4212330c63fe92f430e6058b346fa1bd0b80056&width=768&quality=80&smart=false',
                            width: 768
                        }
                    ]
                }
            }
        });
    });

    it('should return null when the video data is not defined and is home ln10', () => {
        useContent.mockReturnValueOnce(null);
        expect(useGetVideoPosterResized({ ...props })).toBeNull();
    });

    it('should pick MOBILE poster when diagramacion is center-focal', () => {
        const MOBILE = '(max-width: 767px)';
        const TABLET = '(min-width: 768px)';

        useContent.mockReturnValueOnce({
            resizedImages: {
                promo_items: {
                    basic: {
                        auth: { 1: 'auth-token' },
                        resized_urls: [
                            {
                                option: {
                                    height: 280,
                                    media_preload: MOBILE,
                                    proportion: '3:2',
                                    width: 420
                                },
                                resizedUrl:
                                    'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FzFvrSWaI%2Fposter.jpg%3Fwidth%3D720?auth=xxx&width=420&height=280&quality=70&smart=false'
                            },
                            {
                                option: {
                                    height: 201,
                                    media_preload: TABLET,
                                    proportion: '3:2',
                                    width: 302
                                },
                                resizedUrl:
                                    'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FzFvrSWaI%2Fposter.jpg%3Fwidth%3D720?auth=xxx&width=302&height=201&quality=70&smart=false'
                            }
                        ]
                    }
                }
            }
        });

        const result = useGetVideoPosterResized({
            ...props,
            diagramacion: 'center-focal'
        });

        const urls = result.promo_items.basic.resized_urls;
        expect(urls).toHaveLength(1);

        const poster = urls[0];
        expect(poster.option.media_preload).toBe(MOBILE);
        expect(poster.option.width).toBe(420);
        expect(poster.option.height).toBe(280);
        expect(poster.resizedUrl).toContain('www.lanacion.com.ar/resizer/v2/');
        expect(poster.resizedUrl).toContain('width=420');
        expect(poster.resizedUrl).toContain('height=280');
    });
});
