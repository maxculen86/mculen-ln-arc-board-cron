import { updateVideoUrl } from '../../../../../content/sources/utils/videoSource/_helper';

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

jest.mock('fusion:environment', () => {
    return {
        VIDEO_CDN_URL: 'https://lanacionar-prod.video.arc-cdn.net/'
    };
});

describe('Tests - videoSource - Helper', () => {
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
