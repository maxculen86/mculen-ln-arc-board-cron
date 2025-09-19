import getPresets from '../../../content/sources/utils/presets';
import { signingServiceCachedCall } from '../../../content/sources/utils/signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../components/private/common/utils/image/resizer/addResizerUrls';
import { transform } from '../../../content/sources/videosJwSource';

jest.mock(
    '../../../content/sources/utils/signingServiceSource/getImagesAuth',
    () => ({
        signingServiceCachedCall: jest.fn()
    })
);

jest.mock(
    '../../../components/private/common/utils/image/resizer/addResizerUrls',
    () => ({
        addResizedUrls: jest.fn()
    })
);

jest.mock('../../../content/sources/utils/presets');

describe('Tests transformVideosJW', () => {
    const mockVideoData = {
        playlist: [
            {
                sources: [
                    {
                        file: 'https://cdn.jwplayer.com/manifests/DXpufCFv.m3u8',
                        type: 'application/vnd.apple.mpegurl'
                    }
                ],
                image: 'https://cdn.jwplayer.com/v2/media/DXpufCFv/poster.jpg?width=720',
                images: [
                    {
                        src: 'https://cdn.jwplayer.com/v2/media/DXpufCFv/poster.jpg?width=320',
                        width: 320,
                        type: 'image/jpeg'
                    }
                ],
                mediaid: 'DXpufCFv',
                title: 'Accidente del avión en India: qué pasó con el vuelo ',
                tracks: [
                    {
                        file: 'https://cdn.jwplayer.com/strips/DXpufCFv-120.vtt',
                        kind: 'thumbnails'
                    }
                ]
            }
        ]
    };

    const mockAddResizedUrlsOutput = {
        promo_items: {
            basic: {
                embed: {
                    config: {
                        videoJw: { playlist: [mockVideoData] }
                    }
                },
                url: 'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FDXpufCFv%2Fposter.jpg%3Fwidth%3D720?auth=319089acd32a1ac9aed455a5bbfbf2a1b6e6a625c47ea6845408c4d78170c838&width=768&quality=70&smart=false',
                type: 'image',
                auth: {
                    1: '319089acd32a1ac9aed455a5bbfbf2a1b6e6a625c47ea6845408c4d78170c838'
                },
                width: 768,
                height: 513,
                resized_urls: [
                    {
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FDXpufCFv%2Fposter.jpg%3Fwidth%3D720?auth=319089acd32a1ac9aed455a5bbfbf2a1b6e6a625c47ea6845408c4d78170c838&width=768&quality=70&smart=false',
                        option: {
                            width: 768,
                            height: 513,
                            media: '(min-width: 768px)'
                        }
                    }
                ],
                resized_urls_zoom: []
            },
            subtype: 'video_jw'
        }
    };
    const mockCachedCall = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        getPresets.mockReturnValue({
            presets: { promo_items: ['preset1'] },
            presetsDefault: 'defaultPreset'
        });
        signingServiceCachedCall.mockResolvedValue({ hash: 'mockHash123' });
        addResizedUrls.mockReturnValue(mockAddResizedUrlsOutput);
    });

    it('should transform data correctly with complete data and query ', async () => {
        const result = await transform({
            data: mockVideoData,
            query: { 'arc-site': 'la-nacion-ar', imageConfig: 'T1' },
            cachedCall: mockCachedCall
        });

        expect(result).toMatchSnapshot();
    });

    it('should handle empty data object', async () => {
        const result = await transform({
            data: '{}',
            query: {},
            cachedCall: mockCachedCall
        });

        expect(result).toMatchSnapshot();
    });
});
