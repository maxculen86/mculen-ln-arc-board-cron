import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageArticle from '../../../../../../../components/private/LN/common/media/imageBase';

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

describe('Tests component - imageBase', () => {
    const props = {
        active: false,
        image: {
            height: 513,
            resized_urls: [
                {
                    option: {
                        height: 407,
                        media: '(min-width: 1280px)',
                        media_preload: '(min-width: 1280px)',
                        minScreenWidth: 1280,
                        width: 608
                    },
                    resizedUrl:
                        'https://www.lanacion.com.ar/resizer/9JkXATNcqzYXNsQ2bYSGvpitwUA=/608x405/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg'
                },
                {
                    option: {
                        height: 250,
                        media_preload:
                            '(min-width: 375px) and (max-width: 768px)',
                        minScreenWidth: 375,
                        width: 375
                    },
                    resizedUrl:
                        'https://www.lanacion.com.ar/resizer/m7nbZlY2_AfrOIcxMPTEiZs5sok=/375x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg'
                }
            ],
            url: 'https://www.lanacion.com.ar/resizer/UQhUqLALzHkgpU5EWwe0ll_g_zk=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg',
            width: 768,
            titleText:
                'Adentro y afuera se confunden en esta casa con gran quincho junto a un jardín semicubierto'
        },
        href: '/lifestyle/por-mas-verde-interior-y-exterior-se-funden-en-esta-casa-con-una-galeria-fabulosa-nid2436566/',
        outputType: 'default',
        zoom: false,
        isApertura: true,
        isAperturaNota: true,
        isValidSection: true,
        isVertical: false
    };

    describe('Opening hero', () => {
        test('should return a link with a responsive img instead of picture', () => {
            const { container } = render(<ImageArticle {...props} />);
            const img = screen.getByRole('img');

            expect(screen.getByRole('link')).toBeDefined();
            expect(img).toBeDefined();
            expect(container.querySelector('picture')).not.toBeInTheDocument();
            expect(img).toHaveAttribute(
                'src',
                'https://www.lanacion.com.ar/resizer/UQhUqLALzHkgpU5EWwe0ll_g_zk=/1200x675/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg'
            );
            expect(img).toHaveAttribute('width', '1200');
            expect(img).toHaveAttribute('height', '675');
        });

        test('should return a srcset with current widths plus 1200 fallback', () => {
            const { container } = render(<ImageArticle {...props} />);
            const img = screen.getByRole('img');
            const srcset = img.getAttribute('srcset');
            const sizes = img.getAttribute('sizes');

            expect(container.querySelectorAll('source')).toHaveLength(0);
            expect(srcset).toContain('/375x250/');
            expect(srcset).toContain('375w');
            expect(srcset).toContain('/608x405/');
            expect(srcset).toContain('608w');
            expect(srcset).toContain('/1200x675/');
            expect(srcset).toContain('1200w');
            expect(sizes).toBe(
                '(min-width: 1280px) 608px, (min-width: 375px) and (max-width: 768px) 375px, 375px'
            );
        });

        test('should return the attributes loading eager and fetchpriority high when the is opening is true', () => {
            const { container } = render(<ImageArticle {...props} />);

            expect(
                container.querySelector('[fetchpriority=high]')
            ).toBeDefined();

            expect(container.querySelector('[loading=eager]')).toBeDefined();
        });

        test('Should return one of the sources with multiple urls when setting a pixel density', () => {
            const properties = {
                ...props,
                image: {
                    ...props.image,
                    resized_urls: [
                        {
                            option: {
                                configPixelRatio: {
                                    forScreenWidth: 375,
                                    xDescriptor: '2x'
                                },
                                height: 250,
                                media: '(min-width: 1024px)',
                                media_preload:
                                    '(min-width: 1024px) and (max-width: 1280px)',
                                minScreenWidth: 1024,
                                width: 500
                            },
                            resizedUrl:
                                'https://www.lanacion.com.ar/resizer/9JkXATNcqzYXNsQ2bYSGvpitwUA=/500x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg'
                        },
                        ...props.image.resized_urls
                    ]
                }
            };

            const { container } = render(<ImageArticle {...properties} />);
            const srcset = screen.getByRole('img').getAttribute('srcset');

            expect(container.querySelectorAll('source')).toHaveLength(0);
            expect(srcset).toContain('/375x250/');
            expect(srcset).toContain('/500x250/');
            expect(srcset).toContain('500w');
            expect(srcset).toContain('/1200x675/');
        });

        test('should return the attributes fetchpriority low and loading lazy when is not opening', () => {
            const properties = { ...props, isApertura: false };
            const { container } = render(<ImageArticle {...properties} />);

            expect(
                container.querySelector('[fetchpriority=low]')
            ).toBeDefined();

            expect(container.querySelector('[loading=lazy]')).toBeDefined();
        });
    });

    describe('Linked hero rendering', () => {
        const properties = { ...props, isValidSection: false };

        test('should return the attributes fetchpriority low and loading lazy when is not opening ', () => {
            const props = {
                ...properties,
                isApertura: false
            };
            const { container } = render(<ImageArticle {...props} />);

            expect(
                container.querySelector('[fetchpriority=low]')
            ).toBeDefined();

            expect(container.querySelector('[loading=lazy]')).toBeDefined();
        });

        test('the image should contain the attributes srcSet with media condition', () => {
            const { container } = render(<ImageArticle {...properties} />);
            const resultSrcset =
                'https://www.lanacion.com.ar/resizer/9JkXATNcqzYXNsQ2bYSGvpitwUA=/608x405/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg 608w, https://www.lanacion.com.ar/resizer/m7nbZlY2_AfrOIcxMPTEiZs5sok=/375x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg 375w';

            expect(
                container.querySelector(`[srcset="${resultSrcset}"]`)
            ).toBeDefined();
        });

        test('The image should be wrapped in a link without picture markup', () => {
            const { container } = render(<ImageArticle {...properties} />);
            const img = screen.getByRole('img');

            expect(screen.getByRole('link')).toBeDefined();
            expect(container.querySelector('picture')).not.toBeInTheDocument();
            expect(img).toHaveAttribute('srcset');
        });
    });
});
