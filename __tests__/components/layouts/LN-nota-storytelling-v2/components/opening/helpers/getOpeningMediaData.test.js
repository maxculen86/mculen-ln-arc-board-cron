import getOpeningMediaData, {
    buildStorytellingOpeningImage
} from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/getOpeningMediaData';
import * as mediaHelpers from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/mediaHelpers';
import getOpeningResizedUrls, {
    getDesktopResizedUrls,
    getMobileResizedUrls
} from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/getOpeningResizedUrls';
import { getVideoData } from '../../../../../../../components/features/private-global/common/utils/getVideoData';

jest.mock(
    'fusion:environment',
    () => ({
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com/resizer',
        SITE_LANACION: 'la-nacion-ar',
        SITE_FOODIT: 'foodit'
    }),
    { virtual: true }
);
jest.mock(
    '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/mediaHelpers'
);
jest.mock(
    '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/getOpeningResizedUrls'
);
jest.mock(
    '../../../../../../../components/features/private-global/common/utils/getVideoData'
);

const storytellingResponsiveEntries = [
    {
        resizedUrl: 'https://example.com/image?width=1920&height=1280',
        option: {
            width: 1920,
            height: 1280,
            media_preload: '(min-width: 1440px)',
            proportion: '3:2'
        }
    },
    {
        resizedUrl: 'https://example.com/image?width=1200&height=800',
        option: {
            width: 1200,
            height: 800,
            media_preload: '(min-width: 1024px) and (max-width: 1439px)',
            proportion: '3:2'
        }
    },
    {
        resizedUrl: 'https://example.com/image?width=770&height=1155',
        option: {
            width: 770,
            height: 1155,
            media_preload: '(min-width: 768px) and (max-width: 1023px)',
            proportion: '2:3'
        }
    },
    {
        resizedUrl: 'https://example.com/image?width=420&height=630',
        option: {
            width: 420,
            height: 630,
            media_preload: '(max-width: 767px)',
            proportion: '2:3'
        }
    }
];

describe('components - layouts - LN-nota-storytelling-v2 - components - opening - helpers - getOpeningMediaData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mediaHelpers.getOpeningMediaItems.mockReturnValue({
            desktopImageItem: {},
            mobileImageItem: {}
        });
        mediaHelpers.getNormalizedImageData.mockReturnValue({
            resizedUrls: [],
            url: '',
            caption: '',
            altText: ''
        });
        getOpeningResizedUrls.mockReturnValue([]);
        getDesktopResizedUrls.mockReturnValue([]);
        getMobileResizedUrls.mockReturnValue([]);
        getVideoData.mockReturnValue({ videoUrl: '', posterUrl: '' });
    });

    it('should return diagram from custom_storytelling_opening if present', () => {
        const promoItems = {
            custom_storytelling_opening: {
                embed: {
                    config: {
                        diagram: 'image-100-title-centered'
                    }
                }
            }
        };
        const result = getOpeningMediaData(promoItems);
        expect(result.diagram).toBe('image-100-title-centered');
    });

    it('should return default diagram if custom_storytelling_opening is missing', () => {
        const promoItems = {};
        const result = getOpeningMediaData(promoItems);
        expect(result.diagram).toBe('image-50-right-title-left');
    });

    it('should keep storytelling responsive variants and sizes from current breakpoints', () => {
        mediaHelpers.getNormalizedImageData
            .mockReturnValueOnce({
                resizedUrls: [],
                url: 'https://example.com/desktop',
                caption: 'desktop caption',
                altText: 'desktop alt'
            })
            .mockReturnValueOnce({
                resizedUrls: [],
                url: 'https://example.com/mobile',
                caption: 'mobile caption',
                altText: 'mobile alt'
            });
        getOpeningResizedUrls.mockReturnValue(storytellingResponsiveEntries);

        const result = buildStorytellingOpeningImage({}, 'headline');

        expect(result).toMatchObject({
            alt: 'mobile caption',
            src: 'https://example.com/image?width=1200&height=800',
            srcset: 'https://example.com/image?width=420&height=630 420w, https://example.com/image?width=770&height=1155 770w, https://example.com/image?width=1200&height=800 1200w, https://example.com/image?width=1920&height=1280 1920w',
            sizes: '(min-width: 1440px) 1920px, (min-width: 1024px) and (max-width: 1439px) 1200px, (min-width: 768px) and (max-width: 1023px) 770px, (max-width: 767px) 420px, 420px',
            width: 1200,
            height: 800
        });
    });

    it('should keep desktop and mobile srcsets separated by dimension metadata when storytelling_mobile exists', () => {
        const desktopImageItem = { id: 'desktop-image' };
        const mobileImageItem = { id: 'mobile-image' };
        const desktopEntries = [
            {
                resizedUrl: 'https://example.com/desktop?width=1920&height=830',
                option: {
                    width: 1920,
                    height: 830,
                    proportion: '21:9'
                }
            },
            {
                resizedUrl: 'https://example.com/desktop?width=1280&height=580',
                option: { width: 1280, height: 580, proportion: '21:9' }
            }
        ];
        const mobileEntries = [
            {
                resizedUrl: 'https://example.com/mobile?width=770&height=770',
                option: {
                    width: 770,
                    height: 770,
                    proportion: '1:1',
                    isMobileDimension: true
                }
            },
            {
                resizedUrl: 'https://example.com/mobile?width=512&height=512',
                option: {
                    width: 512,
                    height: 512,
                    proportion: '1:1',
                    isMobileDimension: true
                }
            }
        ];

        mediaHelpers.getOpeningMediaItems.mockReturnValue({
            desktopImageItem,
            mobileImageItem
        });
        mediaHelpers.getNormalizedImageData
            .mockReturnValueOnce({
                resizedUrls: [],
                url: 'https://example.com/desktop',
                caption: 'desktop caption',
                altText: 'desktop alt'
            })
            .mockReturnValueOnce({
                resizedUrls: [],
                url: 'https://example.com/mobile',
                caption: 'mobile caption',
                altText: 'mobile alt'
            });
        getDesktopResizedUrls.mockReturnValue(desktopEntries);
        getMobileResizedUrls.mockReturnValue(mobileEntries);

        const result = buildStorytellingOpeningImage(
            { storytelling_mobile: mobileImageItem },
            'headline'
        );

        expect(getOpeningResizedUrls).not.toHaveBeenCalled();
        expect(getDesktopResizedUrls).toHaveBeenCalledWith(
            desktopImageItem,
            mobileImageItem
        );
        expect(result.srcset).toContain(
            'https://example.com/desktop?width=1280&height=580 1280w'
        );
        expect(result.srcset).toContain(
            'https://example.com/desktop?width=1920&height=830 1920w'
        );
        expect(result.srcset).not.toContain('mobile?width=512');
        expect(result.srcset).not.toContain('mobile?width=770');
        expect(result.sizes).not.toContain('(max-width: 767px) 512px');
    });

    describe('video_jw', () => {
        it('should return videoUrl and posterUrl when video_jw is present', () => {
            getVideoData.mockReturnValue({
                videoUrl: 'https://cdn.jwplayer.com/video.mp4',
                posterUrl: 'https://cdn.jwplayer.com/poster.jpg'
            });

            const result = getOpeningMediaData({ video_jw: {} });

            expect(result.videoUrl).toBe('https://cdn.jwplayer.com/video.mp4');
            expect(result.posterUrl).toBe(
                'https://cdn.jwplayer.com/poster.jpg'
            );
        });

        it('should return diagram when video_jw is present', () => {
            getVideoData.mockReturnValue({
                videoUrl: 'video.mp4',
                posterUrl: ''
            });

            const promoItems = {
                video_jw: {},
                custom_storytelling_opening: {
                    embed: { config: { diagram: 'image-100-title-centered' } }
                }
            };

            const result = getOpeningMediaData(promoItems);

            expect(result.diagram).toBe('image-100-title-centered');
        });

        it('should not return src or srcset when video_jw is present', () => {
            getVideoData.mockReturnValue({
                videoUrl: 'video.mp4',
                posterUrl: ''
            });

            const result = getOpeningMediaData({ video_jw: {} });

            expect(result.src).toBeUndefined();
            expect(result.srcset).toBeUndefined();
        });

        it('should prioritize video over image when both video_jw and image are present', () => {
            getVideoData.mockReturnValue({
                videoUrl: 'https://cdn.jwplayer.com/video.mp4',
                posterUrl: ''
            });
            mediaHelpers.getNormalizedImageData.mockReturnValue({
                url: 'https://example.com/image.jpg',
                caption: '',
                altText: ''
            });

            const result = getOpeningMediaData({
                video_jw: {},
                basic: { url: 'https://example.com/image.jpg' }
            });

            expect(result.videoUrl).toBe('https://cdn.jwplayer.com/video.mp4');
            expect(result.src).toBeUndefined();
        });

        it('should not return videoUrl when video_jw is absent', () => {
            const result = getOpeningMediaData({});

            expect(result.videoUrl).toBeUndefined();
        });

        it('should call getVideoData with the video_jw object', () => {
            const videoJw = { embed: { config: { idVideo: 'abc123' } } };
            getVideoData.mockReturnValue({
                videoUrl: 'video.mp4',
                posterUrl: ''
            });

            getOpeningMediaData({ video_jw: videoJw });

            expect(getVideoData).toHaveBeenCalledWith(videoJw);
        });
    });

    it('should use the largest available entry as fallback when no 1200 entry exists', () => {
        mediaHelpers.getNormalizedImageData
            .mockReturnValueOnce({
                resizedUrls: [],
                url: 'https://example.com/desktop',
                caption: 'desktop caption',
                altText: 'desktop alt'
            })
            .mockReturnValueOnce({
                resizedUrls: [],
                url: 'https://example.com/mobile',
                caption: 'mobile caption',
                altText: 'mobile alt'
            });
        getOpeningResizedUrls.mockReturnValue(
            storytellingResponsiveEntries.filter(
                ({ option: { width } = {} }) => width !== 1200
            )
        );

        const result = buildStorytellingOpeningImage({}, 'headline');

        expect(result.src).toBe(
            'https://example.com/image?width=1920&height=1280'
        );
        expect(result.srcset).not.toContain('1200w');
        expect(result.width).toBe(1920);
        expect(result.height).toBe(1280);
    });
});
