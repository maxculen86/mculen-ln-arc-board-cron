import {
    extractGalleryEmbedData,
    filterGalleryEmbeds
} from '../../../../../../../components/features/LN-nota/private/body/imageGalleryEmbed/_helper';

describe('Components - features - LN-nota - private - body - imageGalleryEmbed - _helper)', () => {
    describe('filterGalleryEmbeds', () => {
        it('should filter only gallery-embed elements with custom_embed type', () => {
            const elements = [
                { subtype: 'gallery-embed', type: 'custom_embed' },
                { subtype: 'gallery-embed', type: 'other' },
                { subtype: 'other', type: 'custom_embed' }
            ];
            expect(filterGalleryEmbeds(elements)).toEqual([
                { subtype: 'gallery-embed', type: 'custom_embed' }
            ]);
        });
    });

    describe('extractGalleryEmbedData', () => {
        it('should extract values from embed.config correctly', () => {
            const elements = [
                {
                    embed: {
                        config: {
                            galleryId: 'abc123',
                            caption: 'Una galería',
                            diagram: '1_2',
                            galleryImages: [{ url: 'image.png' }]
                        }
                    }
                }
            ];

            const result = extractGalleryEmbedData(elements);
            expect(result).toEqual([
                {
                    galleryId: 'abc123',
                    caption: 'Una galería',
                    diagram: '1_2',
                    galleryImages: [{ url: 'image.png' }]
                }
            ]);
        });

        it('should return [] when input is empty or invalid', () => {
            expect(extractGalleryEmbedData([])).toEqual([]);
            expect(extractGalleryEmbedData(null)).toEqual([]);
        });

        it('should handle missing config safely', () => {
            const elements = [{ embed: {} }];
            const result = extractGalleryEmbedData(elements);
            expect(result).toEqual([
                { galleryId: '', caption: '', diagram: '', galleryImages: [] }
            ]);
        });
    });
});
