import {
    buildOpeningImage,
    getOpeningImageSizes
} from '../../../../../../components/private/LN/common/utils/openingImageHelper';

describe('components - private - LN - common - utils - openingImageHelper', () => {
    it('builds opening image props using resized_urls from imageConfig', () => {
        const imageData = {
            type: 'image',
            url: 'https://example.com/image?width=420&height=280',
            alt_text: 'Hero image alt',
            resized_urls: [
                {
                    resizedUrl:
                        'https://example.com/image?width=420&height=280',
                    option: {
                        width: 420,
                        height: 280,
                        media_preload: '(max-width: 767px)'
                    }
                },
                {
                    resizedUrl:
                        'https://example.com/image?width=880&height=586',
                    option: {
                        width: 880,
                        height: 586,
                        media_preload:
                            '(min-width: 768px and max-width: 1279px)'
                    }
                },
                {
                    resizedUrl:
                        'https://example.com/image?width=1200&height=800',
                    option: {
                        width: 1200,
                        height: 675,
                        media_preload: '(min-width: 1280px)'
                    }
                }
            ]
        };

        const openingImage = buildOpeningImage(imageData);

        expect(openingImage).toEqual({
            alt: 'Hero image alt',
            src: 'https://example.com/image?width=1200&height=800',
            srcset: 'https://example.com/image?width=420&height=280 420w, https://example.com/image?width=880&height=586 880w, https://example.com/image?width=1200&height=800 1200w',
            sizes: '(min-width: 1280px) 1200px, (min-width: 768px and max-width: 1279px) 880px, (max-width: 767px) 420px, 420px',
            width: 1200,
            height: 675,
            pictureSources: []
        });
    });

    it('builds sizes from current breakpoint metadata', () => {
        expect(
            getOpeningImageSizes([
                {
                    option: {
                        width: 309,
                        media_preload: '(max-width: 375px)'
                    }
                },
                {
                    option: {
                        width: 351,
                        media_preload:
                            '(min-width: 375.1px and max-width: 768px)'
                    }
                },
                {
                    option: {
                        width: 768,
                        media_preload:
                            '(min-width: 768.1px and max-width: 1024px)'
                    }
                },
                {
                    option: {
                        width: 1200,
                        media_preload:
                            '(min-width: 1024.1px and max-width: 1280px)'
                    }
                }
            ])
        ).toBe(
            '(min-width: 1024.1px and max-width: 1280px) 1200px, (min-width: 768.1px and max-width: 1024px) 768px, (min-width: 375.1px and max-width: 768px) 351px, (max-width: 375px) 309px, 309px'
        );
    });

    it('uses largest entry as fallback src when no 1200 entry exists', () => {
        const openingImage = buildOpeningImage({
            type: 'image',
            url: 'https://example.com/original.jpg',
            alt_text: 'Hero image alt',
            resized_urls: [
                {
                    resizedUrl:
                        'https://example.com/image?width=375&height=250',
                    option: {
                        width: 375,
                        height: 250
                    }
                },
                {
                    resizedUrl:
                        'https://example.com/image?width=608&height=405',
                    option: {
                        width: 608,
                        height: 405,
                        media: '(min-width: 1280px)'
                    }
                }
            ]
        });

        expect(openingImage.src).toBe(
            'https://example.com/image?width=608&height=405'
        );
        expect(openingImage.width).toBe(608);
        expect(openingImage.height).toBe(405);
        expect(openingImage.srcset).toContain('375w');
        expect(openingImage.srcset).toContain('608w');
    });

    it('prefers 1200w entry over larger entries for og image fallback', () => {
        const openingImage = buildOpeningImage({
            type: 'image',
            url: 'https://example.com/original.jpg',
            alt_text: 'Hero image alt',
            resized_urls: [
                {
                    resizedUrl:
                        'https://example.com/image?width=375&height=250',
                    option: { width: 375, height: 250 }
                },
                {
                    resizedUrl:
                        'https://example.com/image?width=1200&height=800',
                    option: { width: 1200, height: 675 }
                },
                {
                    resizedUrl:
                        'https://example.com/image?width=1920&height=1280',
                    option: { width: 1920, height: 1080 }
                }
            ]
        });

        expect(openingImage.src).toBe(
            'https://example.com/image?width=1200&height=800'
        );
        expect(openingImage.width).toBe(1200);
        expect(openingImage.height).toBe(675);
        expect(openingImage.srcset).toContain('1920w');
    });

    it('falls back to original url when no resized_urls exist', () => {
        const openingImage = buildOpeningImage({
            type: 'image',
            url: 'https://example.com/original.jpg',
            alt_text: 'Fallback alt',
            resized_urls: []
        });

        expect(openingImage.src).toBe('https://example.com/original.jpg');
        expect(openingImage.width).toBeUndefined();
        expect(openingImage.height).toBeUndefined();
    });
});
