import buildGalleryEmbedData from '../../../../../../content/sources/utils/articleSourceNota/cachedCalls/buildGalleryEmbedData';

describe('buildGalleryEmbedData', () => {
    it('should return null when subtype is not gallery-embed', async () => {
        const result = await buildGalleryEmbedData({
            element: { subtype: 'text' },
            cachedCall: jest.fn(),
            gallerySource: { fetch: jest.fn() },
            arcSite: 'la-nacion-ar'
        });

        expect(result).toBeNull();
    });

    it('should preserve gallery images and replace the expected position with video', async () => {
        const cachedCall = jest.fn().mockResolvedValue({
            content_elements: [
                {
                    url: 'https://img-1',
                    height: 10,
                    width: 20,
                    resized_urls: [{ resizedUrl: 'https://img-1-resized' }]
                },
                {
                    url: 'https://img-2',
                    height: 30,
                    width: 40,
                    resized_urls: [{ resizedUrl: 'https://img-2-resized' }]
                }
            ]
        });
        const gallerySource = { fetch: jest.fn() };
        const element = {
            subtype: 'gallery-embed',
            embed: {
                config: {
                    galleryId: 'gallery-123',
                    diagram: 'horizontal',
                    count: 2,
                    isFotoAl100: true,
                    startPosition: 1,
                    videoPosition: '2',
                    video: {
                        mp4: 'https://video.mp4',
                        title: 'video-title'
                    }
                }
            }
        };

        const result = await buildGalleryEmbedData({
            element,
            cachedCall,
            gallerySource,
            arcSite: 'la-nacion-ar'
        });

        expect(cachedCall).toHaveBeenCalledWith(
            'gallerySource',
            gallerySource.fetch,
            {
                query: {
                    id: 'gallery-123',
                    imageConfig: 'horizontal',
                    count: 2,
                    isFotoAl100: true,
                    arcSite: 'la-nacion-ar',
                    resize: true,
                    startPosition: 1
                }
            }
        );
        expect(result.embed.config.galleryImages).toEqual([
            {
                url: 'https://img-1',
                height: 10,
                width: 20,
                resized_urls: [{ resizedUrl: 'https://img-1-resized' }]
            },
            {
                mp4: 'https://video.mp4',
                title: 'video-title',
                type: 'video'
            }
        ]);
    });
});
