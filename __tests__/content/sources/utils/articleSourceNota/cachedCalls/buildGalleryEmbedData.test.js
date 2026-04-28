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
                    resized_urls: [{ resizedUrl: 'https://img-1-resized' }],
                    caption: 'Caption of image 1'
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
                resized_urls: [{ resizedUrl: 'https://img-1-resized' }],
                alt: 'Caption of image 1'
            },
            {
                mp4: 'https://video.mp4',
                title: 'video-title',
                type: 'video'
            }
        ]);
    });

    it('should map image caption to alt and fallback to empty string when no image signal is available', async () => {
        const cachedCall = jest.fn().mockResolvedValue({
            content_elements: [
                {
                    url: 'https://img-a',
                    height: 100,
                    width: 200,
                    resized_urls: [],
                    caption: 'Foto de la galería'
                },
                {
                    url: 'https://img-b',
                    height: 100,
                    width: 200,
                    resized_urls: []
                    // no caption, no alt_text, no subtitle
                }
            ]
        });
        const gallerySource = { fetch: jest.fn() };
        const element = {
            subtype: 'gallery-embed',
            embed: {
                config: {
                    galleryId: 'gallery-alt-test',
                    diagram: 'horizontal',
                    count: 2,
                    isFotoAl100: false,
                    startPosition: 1
                }
            }
        };

        const result = await buildGalleryEmbedData({
            element,
            cachedCall,
            gallerySource,
            arcSite: 'la-nacion-ar'
        });

        expect(result.embed.config.galleryImages[0].alt).toBe(
            'Foto de la galería'
        );
        expect(result.embed.config.galleryImages[1].alt).toBe('');
    });

    it('should prefer alt_text over caption and caption over subtitle for alt field', async () => {
        const cachedCall = jest.fn().mockResolvedValue({
            content_elements: [
                {
                    url: 'https://img-alt-text',
                    height: 100,
                    width: 200,
                    resized_urls: [],
                    alt_text: 'Alt text has priority',
                    caption: 'Caption is secondary',
                    subtitle: 'Subtitle is last'
                },
                {
                    url: 'https://img-no-alt-text',
                    height: 100,
                    width: 200,
                    resized_urls: [],
                    caption: 'Caption fallback',
                    subtitle: 'Subtitle fallback'
                },
                {
                    url: 'https://img-subtitle-only',
                    height: 100,
                    width: 200,
                    resized_urls: [],
                    subtitle: 'Subtitle only'
                }
            ]
        });
        const gallerySource = { fetch: jest.fn() };
        const element = {
            subtype: 'gallery-embed',
            embed: {
                config: {
                    galleryId: 'gallery-priority-test',
                    diagram: 'horizontal',
                    count: 3,
                    isFotoAl100: false,
                    startPosition: 1
                }
            }
        };

        const result = await buildGalleryEmbedData({
            element,
            cachedCall,
            gallerySource,
            arcSite: 'la-nacion-ar'
        });

        expect(result.embed.config.galleryImages[0].alt).toBe(
            'Alt text has priority'
        );
        expect(result.embed.config.galleryImages[1].alt).toBe(
            'Caption fallback'
        );
        expect(result.embed.config.galleryImages[2].alt).toBe('Subtitle only');
    });

    it('should resolve alt to empty string when all candidates are URL-like values', async () => {
        const cachedCall = jest.fn().mockResolvedValue({
            content_elements: [
                {
                    url: 'https://img-bbc',
                    height: 100,
                    width: 200,
                    resized_urls: [],
                    alt_text:
                        'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/image.jpg',
                    caption:
                        'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/other.jpg'
                },
                {
                    url: 'https://img-mixed',
                    height: 100,
                    width: 200,
                    resized_urls: [],
                    alt_text:
                        'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/image.jpg',
                    caption: 'Texto válido de caption'
                }
            ]
        });
        const gallerySource = { fetch: jest.fn() };
        const element = {
            subtype: 'gallery-embed',
            embed: {
                config: {
                    galleryId: 'gallery-url-filter-test',
                    diagram: 'horizontal',
                    count: 2,
                    isFotoAl100: false,
                    startPosition: 1
                }
            }
        };

        const result = await buildGalleryEmbedData({
            element,
            cachedCall,
            gallerySource,
            arcSite: 'la-nacion-ar'
        });

        expect(result.embed.config.galleryImages[0].alt).toBe('');
        expect(result.embed.config.galleryImages[1].alt).toBe(
            'Texto válido de caption'
        );
    });

    it('should fallback to other meaningful image metadata when explicit alt fields are empty', async () => {
        const cachedCall = jest.fn().mockResolvedValue({
            content_elements: [
                {
                    url: 'https://img-title',
                    height: 100,
                    width: 200,
                    resized_urls: [],
                    alt_text: '   ',
                    caption: '',
                    subtitle: '  ',
                    title: 'Title fallback'
                },
                {
                    url: 'https://img-byline',
                    height: 100,
                    width: 200,
                    resized_urls: [],
                    alt_text: '',
                    caption: ' ',
                    subtitle: '',
                    credits: {
                        by: [
                            {
                                byline: 'Photo byline fallback',
                                name: 'Ignored name'
                            }
                        ]
                    }
                },
                {
                    url: 'https://img-owner',
                    height: 100,
                    width: 200,
                    resized_urls: [],
                    owner: {
                        name: 'Owner fallback'
                    }
                },
                {
                    url: 'https://img-original-name',
                    height: 100,
                    width: 200,
                    resized_urls: [],
                    additional_properties: {
                        originalName: 'Original name fallback'
                    }
                }
            ]
        });
        const gallerySource = { fetch: jest.fn() };
        const element = {
            subtype: 'gallery-embed',
            embed: {
                config: {
                    galleryId: 'gallery-defensive-fallback-test',
                    diagram: 'horizontal',
                    count: 4,
                    isFotoAl100: false,
                    startPosition: 1
                }
            }
        };

        const result = await buildGalleryEmbedData({
            element,
            cachedCall,
            gallerySource,
            arcSite: 'la-nacion-ar'
        });

        expect(result.embed.config.galleryImages[0].alt).toBe('Title fallback');
        expect(result.embed.config.galleryImages[1].alt).toBe(
            'Photo byline fallback'
        );
        expect(result.embed.config.galleryImages[2].alt).toBe('Owner fallback');
        expect(result.embed.config.galleryImages[3].alt).toBe(
            'Original name fallback'
        );
    });
});
