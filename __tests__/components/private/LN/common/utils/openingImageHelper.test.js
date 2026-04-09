import {
    buildOpeningImage,
    getOpeningImageSizes,
    OPENING_IMAGE_FALLBACK
} from '../../../../../../components/private/LN/common/utils/openingImageHelper';

describe('components - private - LN - common - utils - openingImageHelper', () => {
    it('builds opening image props using current widths plus the 1200 fallback', () => {
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
                        height: 280
                    }
                },
                {
                    resizedUrl:
                        'https://example.com/image?width=880&height=586',
                    option: {
                        width: 880,
                        height: 586,
                        media: '(min-width: 768px)'
                    }
                }
            ]
        };

        const openingImage = buildOpeningImage(imageData);

        expect(openingImage).toEqual({
            alt: 'Hero image alt',
            src: 'https://example.com/image?width=1200&height=675',
            srcset: 'https://example.com/image?width=420&height=280 420w, https://example.com/image?width=880&height=586 880w, https://example.com/image?width=1200&height=675 1200w',
            sizes: '(min-width: 768px) 880px, 420px',
            width: OPENING_IMAGE_FALLBACK.width,
            height: OPENING_IMAGE_FALLBACK.height,
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

    it('supports opening srcset generation from resizer urls that use path dimensions', () => {
        const openingImage = buildOpeningImage({
            type: 'image',
            url: 'https://www.lanacion.com.ar/resizer/UQhUqLALzHkgpU5EWwe0ll_g_zk=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg',
            alt_text: 'Hero image alt',
            resized_urls: [
                {
                    resizedUrl:
                        'https://www.lanacion.com.ar/resizer/m7nbZlY2_AfrOIcxMPTEiZs5sok=/375x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg',
                    option: {
                        width: 375,
                        height: 250
                    }
                },
                {
                    resizedUrl:
                        'https://www.lanacion.com.ar/resizer/9JkXATNcqzYXNsQ2bYSGvpitwUA=/608x405/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg',
                    option: {
                        width: 608,
                        height: 405,
                        media: '(min-width: 1280px)'
                    }
                }
            ]
        });

        expect(openingImage.src).toBe(
            'https://www.lanacion.com.ar/resizer/UQhUqLALzHkgpU5EWwe0ll_g_zk=/1200x675/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg'
        );
        expect(openingImage.srcset).toContain('/375x250/');
        expect(openingImage.srcset).toContain('/608x405/');
        expect(openingImage.srcset).toContain('/1200x675/');
    });
});
