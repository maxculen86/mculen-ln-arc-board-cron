import { useContent } from 'fusion:content';
import useGetVideoPosterResized from '../../../../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/useGetVideoPosterResizer';
import respVideoSourceWithResizedV1 from '../../../../../../../../../__mocks__/data/videos/responseVideoSource.json';
import resultVideoWithResizerV1 from '../../../../../../../../../__mocks__/data/videos/getDataToLinkImage/responseGetVideoPosterResized.json';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

describe('Tests hook useGetVideoPosterResized', () => {
    const props = {
        videoID: 'videoID',
        imageConfig: 'videoImages',
        isInApertura: true,
        isAdmin: false,
        shouldUseV2: false
    };

    test('It should return the video data with the structure "promo_items - basic -  resized_urls"  when  is not homeLN10', () => {
        useContent.mockReturnValueOnce({
            ...respVideoSourceWithResizedV1,
            resizedUrl: resultVideoWithResizerV1.promo_items.basic.resized_urls
        });

        expect(useGetVideoPosterResized(props)).toStrictEqual(
            resultVideoWithResizerV1
        );
    });

    test('Should return resized_urls as an empty array when there is no resizedUrls property in the video data', () => {
        useContent.mockReturnValueOnce({
            ...respVideoSourceWithResizedV1,
            resizedUrl: undefined
        });

        expect(useGetVideoPosterResized(props)).toStrictEqual({
            promo_items: {
                basic: {
                    resized_urls: []
                }
            }
        });
    });

    test('It should return the video data with the auth on the images when is home ln10', () => {
        const respVideoWithResizedV2 = {
            ...respVideoSourceWithResizedV1,
            promo_items: {
                basic: {
                    ...respVideoSourceWithResizedV1.promo_items.basic,
                    auth: {
                        '1':
                            '7303a63428f24dc05cb8edeab4212330c63fe92f430e6058b346fa1bd0b80056'
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
        };

        useContent.mockReturnValueOnce(respVideoWithResizedV2);
        expect(
            useGetVideoPosterResized({ ...props, shouldUseV2: true })
        ).toStrictEqual(respVideoWithResizedV2);
    });

    test('should return undefined when the video data is not defined and is home ln10', () => {
        useContent.mockReturnValueOnce(undefined);
        expect(
            useGetVideoPosterResized({ ...props, shouldUseV2: true })
        ).toBeUndefined();
    });

    test('should return null when the video data is not defined and is the old home', () => {
        useContent.mockReturnValueOnce(undefined);
        expect(useGetVideoPosterResized(props)).toBeNull();
    });
});
