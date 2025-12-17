import { extractGalleryEmbedData } from '../../../../../../../components/features/LN-nota/private/body/imageGalleryEmbed/_helper';

describe('Components - features - LN-nota - private - body - imageGalleryEmbed - _helper)', () => {
    describe('extractGalleryEmbedData', () => {
        it('should extract values from embed.config correctly', () => {
            const elements = {
                embed: {
                    config: {
                        galleryId: 'abc123',
                        caption: 'Una galería',
                        diagram: '1_2',
                        galleryImages: [{ url: 'image.png' }],
                        isFotoAl100: false
                    }
                }
            };

            const result = extractGalleryEmbedData(elements);
            expect(result).toEqual({
                galleryId: 'abc123',
                caption: 'Una galería',
                diagram: '1_2',
                galleryImages: [{ url: 'image.png' }],
                isFotoAl100: false,
                count: 0,
                startPosition: 1
            });
        });

        it('should return {} when input is empty or invalid', () => {
            expect(extractGalleryEmbedData({})).toEqual({
                caption: '',
                diagram: '',
                galleryId: '',
                galleryImages: [],
                isFotoAl100: false,
                count: 0,
                startPosition: 1
            });
            expect(extractGalleryEmbedData(null)).toEqual({});
        });

        it('should handle missing config safely', () => {
            const elements = { embed: {} };
            const result = extractGalleryEmbedData(elements);
            expect(result).toEqual({
                galleryId: '',
                caption: '',
                diagram: '',
                galleryImages: [],
                isFotoAl100: false,
                count: 0,
                startPosition: 1
            });
        });
    });
});
