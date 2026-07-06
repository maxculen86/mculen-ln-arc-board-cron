import { getLiveBlogEditorialDataApertura } from '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialApertura';
import { getMediaItem } from '../../../../../components/layouts/_helpers/mediaHelper';
import dateAndTimeUtil, {
    isOlderThanXHoursAgo
} from '../../../../../components/private/common/utils/dateAndTimeUtil';
import { getMediaData } from '../../../../../components/private/LN/common/utils/mediaHelper';
import VideoPlayerJW from '../../../../../components/private/common/videoPlayerJw';
import MediaIframe from '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/apertura/MediaIframe';
import MediaImage from '../../../../../components/features/LN-10-global/common/mediaImage/default';

jest.mock(
    'fusion:context',
    () => ({
        __esModule: true,
        useAppContext: jest.fn(() => ({
            arcSite: 'la-nacion-ar',
            contextPath: '',
            deployment: jest.fn(path => path),
            globalContent: {}
        }))
    }),
    { virtual: true }
);

jest.mock(
    'fusion:static',
    () => ({
        __esModule: true,
        default: ({ children }) => children || null
    }),
    { virtual: true }
);

jest.mock(
    'fusion:environment',
    () => ({
        __esModule: true,
        RESIZER_URL_PUBLIC: 'https://sandbox.lanacion.com.ar',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    }),
    { virtual: true }
);

jest.mock(
    '../../../../../components/private/common/utils/dateAndTimeUtil',
    () => ({
        __esModule: true,
        default: jest.fn(),
        isOlderThanXHoursAgo: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/LN/common/utils/mediaHelper',
    () => ({
        __esModule: true,
        getMediaData: jest.fn(),
        getShortestImage: jest.fn(() => ({
            resizedUrl:
                'https://sandbox.lanacion.com.ar/resizer/v2/YOMDQEB4MBETLKVQYGDYTR53WA.jpg?auth=1f0c40ad1f20c36277197c020ba99070a7178b9a37f8b888a2c00b8233747c45&width=420&height=280&quality=70&smart=true'
        })),
        getImagesToLoadWithPicture: jest.fn(() => ['image1.jpg', 'image2.jpg'])
    })
);

jest.mock(
    '../../../../../components/features/LN-10-global/common/mediaImage/default',
    () => ({
        __esModule: true,
        default: ({ alt, src }) => (
            <div>
                Image: {alt} - {src}
            </div>
        )
    })
);

jest.mock('../../../../../components/private/common/videoPlayerJw', () => ({
    __esModule: true,
    default: ({ data }) => <div>Video: {data.videoJw?.url}</div>
}));

jest.mock(
    '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/apertura/MediaIframe',
    () => ({
        __esModule: true,
        default: ({ html }) => <div>Iframe: {html}</div>
    })
);

jest.mock(
    '../../../../../components/private/common/utils/image/resizer/v2/resizerHelper',
    () => {
        const replaceUrlResizerToWWW = jest.fn(mediaData => ({
            ...mediaData,
            resized_urls: [{ option: 'default', url: 'resized.jpg' }]
        }));

        return {
            __esModule: true,
            replaceUrlResizerToWWW
        };
    }
);

jest.mock(
    '../../../../../components/private/common/utils/epigrafeAndCreditsData',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

describe('components - layouts - LN-Nota-Liveblog_Editorial - _helpers - liveblogEditorialApertura', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getLiveBlogEditorialDataApertura', () => {
        it('should return formatted editorial data correctly', () => {
            const globalContent = {
                headlines: { basic: 'Prueba Liveblog Editorial' },
                label: { volanta: { text: 'Volanta para dolo' } },
                display_date: '2025-05-19T13:51:00Z',
                promo_items: {
                    basic: {
                        _id: 'YOMDQEB4MBETLKVQYGDYTR53WA',
                        additional_properties: {
                            mime_type: 'image/jpeg'
                        },
                        auth: {
                            1: '1f0c40ad1f20c36277197c020ba99070a7178b9a37f8b888a2c00b8233747c45'
                        },
                        created_date: '2025-05-19T14:36:22Z',
                        height: 513,
                        originalSizes: {
                            height: 683,
                            width: 1024
                        },
                        publish_date: '2025-05-19T11:30:07.4294466-03:00',
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
                                    'https://sandbox-resizer.glanacion.com/resizer/v2/YOMDQEB4MBETLKVQYGDYTR53WA.jpg?auth=1f0c40ad1f20c36277197c020ba99070a7178b9a37f8b888a2c00b8233747c45&width=880&height=586&quality=70&smart=true'
                            },
                            {
                                option: {
                                    height: 280,
                                    media_preload: '(max-width: 767px)',
                                    proportion: '3:2',
                                    width: 420
                                },
                                resizedUrl:
                                    'https://sandbox-resizer.glanacion.com/resizer/v2/YOMDQEB4MBETLKVQYGDYTR53WA.jpg?auth=1f0c40ad1f20c36277197c020ba99070a7178b9a37f8b888a2c00b8233747c45&width=420&height=280&quality=70&smart=true'
                            }
                        ],
                        type: 'image',
                        url: 'https://sandbox-resizer.glanacion.com/resizer/v2/YOMDQEB4MBETLKVQYGDYTR53WA.jpg?auth=1f0c40ad1f20c36277197c020ba99070a7178b9a37f8b888a2c00b8233747c45&width=768&quality=70&smart=false',
                        width: 768
                    }
                }
            };

            dateAndTimeUtil.mockReturnValue({
                date: '19 de mayo de 2025',
                time: '10:51'
            });

            isOlderThanXHoursAgo.mockReturnValue(false);

            getMediaData.mockReturnValue({
                url: 'https://sandbox-resizer.glanacion.com/resizer/v2/YOMDQEB4MBETLKVQYGDYTR53WA.jpg?auth=1f0c40ad1f20c36277197c020ba99070a7178b9a37f8b888a2c00b8233747c45&width=768&quality=70&smart=false'
            });

            const result = getLiveBlogEditorialDataApertura(globalContent);

            expect(result).toEqual({
                dataDescripcion: {
                    title: 'Prueba Liveblog Editorial',
                    badge: true,
                    subheadline: ''
                },
                dataMedia: {
                    mediaData: {
                        url: 'https://sandbox-resizer.glanacion.com/resizer/v2/YOMDQEB4MBETLKVQYGDYTR53WA.jpg?auth=1f0c40ad1f20c36277197c020ba99070a7178b9a37f8b888a2c00b8233747c45&width=768&quality=70&smart=false'
                    },
                    caption: null,
                    credit: null
                },
                dataEpigraph: {
                    caption: null,
                    credit: null
                },
                dataDateTime: {
                    date: '19 de mayo de 2025',
                    time: '10:51'
                }
            });
        });
    });

    describe('getMediaItem', () => {
        it('should return MediaImage component for image', () => {
            const mediaData = {
                _id: 'YOMDQEB4MBETLKVQYGDYTR53WA',
                additional_properties: {
                    mime_type: 'image/jpeg'
                },
                auth: {
                    1: '1f0c40ad1f20c36277197c020ba99070a7178b9a37f8b888a2c00b8233747c45'
                },
                created_date: '2025-05-19T14:36:22Z',
                height: 513,
                originalSizes: {
                    height: 683,
                    width: 1024
                },
                publish_date: '2025-05-19T11:30:07.4294466-03:00',
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
                            'https://sandbox.lanacion.com.ar/resizer/v2/YOMDQEB4MBETLKVQYGDYTR53WA.jpg?auth=1f0c40ad1f20c36277197c020ba99070a7178b9a37f8b888a2c00b8233747c45&width=880&height=586&quality=70&smart=true'
                    },
                    {
                        option: {
                            height: 280,
                            media_preload: '(max-width: 767px)',
                            proportion: '3:2',
                            width: 420
                        },
                        resizedUrl:
                            'https://sandbox.lanacion.com.ar/resizer/v2/YOMDQEB4MBETLKVQYGDYTR53WA.jpg?auth=1f0c40ad1f20c36277197c020ba99070a7178b9a37f8b888a2c00b8233747c45&width=420&height=280&quality=70&smart=true'
                    }
                ],
                type: 'image',
                url: 'https://sandbox.lanacion.com.ar/resizer/v2/YOMDQEB4MBETLKVQYGDYTR53WA.jpg?auth=1f0c40ad1f20c36277197c020ba99070a7178b9a37f8b888a2c00b8233747c45&width=768&quality=70&smart=false',
                width: 768
            };

            const result = getMediaItem({ mediaData, hasAutoplay: true });
            expect(result.type).toBe(MediaImage);
        });

        it('should return VideoPlayerJW component for video_jw', () => {
            const mediaData = {
                embed: {
                    config: {
                        idPlayer: 'ih0086X3',
                        idVideo: '82L5uCqQ',
                        videoJw: {
                            title: 'GWM lanzó el Haval H6 HEV, el Jolion Pro HEV y el eléctrico ORA 03',
                            epigraphTitle:
                                'GWM lanzó el Haval H6 HEV, el Jolion Pro HEV y el eléctrico ORA 03',
                            kind: 'Single Item',
                            description: '',
                            playlist: [
                                {
                                    mediaid: '82L5uCqQ',
                                    title: 'GWM lanzó el Haval H6 HEV, el Jolion Pro HEV y el eléctrico ORA 03',
                                    sources: [
                                        {
                                            file: 'https://cdn.jwplayer.com/videos/82L5uCqQ-kTExGaWf.mp4',
                                            type: 'video/mp4'
                                        }
                                    ],
                                    image: 'https://example.com/poster.jpg'
                                }
                            ]
                        }
                    }
                },
                subtype: 'video_jw'
            };

            const result = getMediaItem({ mediaData, hasAutoplay: true });
            expect(result.type).toBe(VideoPlayerJW);
            expect(
                result.props.data.embed.config.videoJw.playlist[0].mediaid
            ).toBe('82L5uCqQ');
            expect(
                result.props.data.embed.config.videoJw.playlist[0].title
            ).toContain('GWM lanzó el Haval');
        });

        it('should return MediaIframe component for raw_html', () => {
            const mediaData = {
                type: 'raw_html',
                content:
                    '<iframe width="560" height="315" src="https://www.youtube.com/embed/QCZZwZQ4qNs?si=Rq33uZRUeu47nZcb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
            };

            const result = getMediaItem({ mediaData, hasAutoplay: true });
            expect(result.type).toBe(MediaIframe);
            expect(result.props.html).toContain(
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/QCZZwZQ4qNs?si=Rq33uZRUeu47nZcb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
            );
        });

        it('should return null if mediaData is falsy', () => {
            const result = getMediaItem({ mediaData: null });
            expect(result).toBeNull();
        });
    });
});
