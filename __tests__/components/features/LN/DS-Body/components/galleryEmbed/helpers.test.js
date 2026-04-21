import {
    extractGalleryEmbedData,
    getAspectRatioClass
} from '../../../../../../../components/features/LN/common/galleryEmbed/helpers';

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) =>
        args
            .map(arg => {
                if (typeof arg === 'string') return arg;
                if (typeof arg === 'object' && arg !== null) {
                    return Object.entries(arg)
                        .filter(([, v]) => v)
                        .map(([k]) => k)
                        .join(' ');
                }
                return '';
            })
            .filter(Boolean)
            .join(' ')
}));

describe('Components - features - LN - common - galleryEmbed - helpers', () => {
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

        it('should return {} when input is null', () => {
            expect(extractGalleryEmbedData(null)).toEqual({});
        });

        it('should return defaults when input is empty object', () => {
            expect(extractGalleryEmbedData({})).toEqual({
                galleryId: '',
                caption: '',
                diagram: '',
                galleryImages: [],
                isFotoAl100: false,
                count: 0,
                startPosition: 1
            });
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

    describe('getAspectRatioClass', () => {
        it('should return vertical aspect ratio for vertical-two', () => {
            expect(getAspectRatioClass('vertical-two')).toBe('aspect-[2/3]');
        });

        it('should return vertical aspect ratio for vertical-three', () => {
            expect(getAspectRatioClass('vertical-three')).toBe('aspect-[2/3]');
        });

        it('should return vertical aspect ratio for vertical-single-centered', () => {
            expect(getAspectRatioClass('vertical-single-centered')).toBe(
                'aspect-[2/3]'
            );
        });

        it('should return horizontal aspect ratio for non-vertical diagrams', () => {
            expect(getAspectRatioClass('wide-single')).toBe('aspect-[3/2]');
            expect(getAspectRatioClass('two-side-by-side')).toBe(
                'aspect-[3/2]'
            );
            expect(getAspectRatioClass('four-grid')).toBe('aspect-[3/2]');
        });

        it('should return horizontal aspect ratio for undefined diagram', () => {
            expect(getAspectRatioClass(undefined)).toBe('aspect-[3/2]');
        });
    });
});
