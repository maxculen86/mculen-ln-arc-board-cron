import buildImageVariants, {
    SCHEMA_IMAGE_VARIANTS
} from '../../../../../../components/private/LN/common/utils/buildImageVariants';

describe('Components - Private - LN - Common - utils - buildImageVariants', () => {
    describe('SCHEMA_IMAGE_VARIANTS', () => {
        it('should export 3 variants', () => {
            expect(SCHEMA_IMAGE_VARIANTS).toHaveLength(3);
        });

        it('should include 16:9, 4:3 and 1:1 variants', () => {
            expect(SCHEMA_IMAGE_VARIANTS).toEqual([
                { width: 1200, height: 675 },
                { width: 1200, height: 900 },
                { width: 1200, height: 1200 }
            ]);
        });

        it('all variants should exceed 50,000 pixels (width × height)', () => {
            SCHEMA_IMAGE_VARIANTS.forEach(({ width, height }) => {
                expect(width * height).toBeGreaterThan(50000);
            });
        });
    });

    describe('buildImageVariants', () => {
        const BASE_URL_V2 =
            'https://resizer.glanacion.com/resizer/v2/IMAGE.jpg?auth=abc123&width=768&height=512&quality=70&smart=true';
        const BASE_URL_V1 =
            'https://resizer.glanacion.com/resizer/HASH=/768x512/smart/cloudfront.example.com/IMAGE.jpg';
        const PLACEHOLDER =
            'https://arc-static.glanacion.com/pf/resources/images/placeholderLN-1200x800.jpg';

        it('should return an array of 3 ImageObject items', () => {
            const result = buildImageVariants(BASE_URL_V2);
            expect(Array.isArray(result)).toBe(true);
            expect(result).toHaveLength(3);
        });

        it('each item should have @type, url, width and height', () => {
            const result = buildImageVariants(BASE_URL_V2);
            result.forEach(item => {
                expect(item['@type']).toBe('ImageObject');
                expect(item.url).toBeDefined();
                expect(item.width).toBeDefined();
                expect(item.height).toBeDefined();
            });
        });

        it('should apply the correct dimensions for each variant', () => {
            const result = buildImageVariants(BASE_URL_V2);
            expect(result[0]).toMatchObject({ width: 1200, height: 675 });
            expect(result[1]).toMatchObject({ width: 1200, height: 900 });
            expect(result[2]).toMatchObject({ width: 1200, height: 1200 });
        });

        it('should update width and height query params for v2 URLs', () => {
            const result = buildImageVariants(BASE_URL_V2);
            expect(result[0].url).toContain('width=1200');
            expect(result[0].url).toContain('height=675');
            expect(result[1].url).toContain('height=900');
            expect(result[2].url).toContain('height=1200');
        });

        it('should return the same URL for all variants when URL has no query params (v1)', () => {
            const result = buildImageVariants(BASE_URL_V1);
            expect(result[0].url).toBe(BASE_URL_V1);
            expect(result[1].url).toBe(BASE_URL_V1);
            expect(result[2].url).toBe(BASE_URL_V1);
        });

        it('should use the placeholder URL when no real image is available', () => {
            const result = buildImageVariants(PLACEHOLDER);
            result.forEach(item => {
                expect(item.url).toBe(PLACEHOLDER);
            });
        });
    });
});
