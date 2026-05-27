import { getArticleImageUrl } from '../../../../../components/layouts/LN-Buscador/helpers/imageUtils';

jest.mock('fusion:environment', () => ({}));
jest.mock('fusion:context', () => ({}));

describe('getArticleImageUrl', () => {
    describe('source priority', () => {
        it('returns promo_image when available', () => {
            const item = {
                promo_image: 'https://cdn.example.com/img.jpg',
                imageresizer: '/resizer/img.jpg',
                image: '/img.jpg'
            };
            expect(getArticleImageUrl(item)).toBe(
                'https://cdn.example.com/img.jpg'
            );
        });

        it('returns imageresizer when promo_image is absent', () => {
            const item = {
                imageresizer: '/resizer/img.jpg',
                image: '/img.jpg'
            };
            expect(getArticleImageUrl(item)).toBe(
                'https://www.lanacion.com.ar/resizer/img.jpg'
            );
        });

        it('returns image when promo_image and imageresizer are absent', () => {
            const item = { image: '/img.jpg' };
            expect(getArticleImageUrl(item)).toBe(
                'https://www.lanacion.com.ar/img.jpg'
            );
        });
    });

    describe('relative URL handling', () => {
        it('prepends lanacion domain to relative URLs', () => {
            const item = { image: '/path/to/image.jpg' };
            expect(getArticleImageUrl(item)).toBe(
                'https://www.lanacion.com.ar/path/to/image.jpg'
            );
        });

        it('strips pipe-delimited suffix before prepending domain', () => {
            const item = { image: '/path/to/image.jpg|width=800' };
            expect(getArticleImageUrl(item)).toBe(
                'https://www.lanacion.com.ar/path/to/image.jpg'
            );
        });

        it('does not modify absolute URLs', () => {
            const item = { promo_image: 'https://external.com/img.png' };
            expect(getArticleImageUrl(item)).toBe(
                'https://external.com/img.png'
            );
        });
    });

    describe('edge cases', () => {
        it('returns undefined when no image fields are present', () => {
            expect(getArticleImageUrl({})).toBeUndefined();
        });

        it('returns undefined when all fields are undefined', () => {
            const item = {
                promo_image: undefined,
                imageresizer: undefined,
                image: undefined
            };
            expect(getArticleImageUrl(item)).toBeUndefined();
        });

        it('returns undefined when all fields are empty string', () => {
            const item = { promo_image: '', imageresizer: '', image: '' };
            // empty string is falsy, so imgSrc will be '' which doesn't start with '/'
            expect(getArticleImageUrl(item)).toBe('');
        });
    });
});
