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
        isValidSection: true,
        isVertical: false
    };

    describe('Cases with tag Picture', () => {
        test('should return a link with the an image with picture', () => {
            const { container } = render(<ImageArticle {...props} />);

            expect(screen.getByRole('link')).toBeDefined();
            expect(screen.getByRole('img')).toBeDefined();
            expect(container.querySelector('picture')).toBeDefined();
            expect(container).toMatchSnapshot();
        });

        test('should return a source tag for each resized image with the attributes media and srset', () => {
            const { container } = render(<ImageArticle {...props} />);
            const resultImage = [
                {
                    media: '(min-width: 1280px)',
                    srcset: 'https://www.lanacion.com.ar/resizer/9JkXATNcqzYXNsQ2bYSGvpitwUA=/608x405/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg'
                },
                {
                    media: '(min-width: 375px)',
                    srcset: 'https://www.lanacion.com.ar/resizer/m7nbZlY2_AfrOIcxMPTEiZs5sok=/375x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg'
                }
            ];

            expect(container.querySelectorAll('source')).toHaveLength(2);

            resultImage.forEach(({ media, srcset }) => {
                expect(
                    container.querySelector(`[media="${media}"]`)
                ).toBeDefined();

                expect(
                    container.querySelector(`[srcset="${srcset}"]`)
                ).toBeDefined();
            });
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

            const resultImageWithPixelDensity =
                'https://www.lanacion.com.ar/resizer/m7nbZlY2_AfrOIcxMPTEiZs5sok=/375x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg, https://www.lanacion.com.ar/resizer/9JkXATNcqzYXNsQ2bYSGvpitwUA=/500x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WQXXYZCSIFH2FIOME64UDJKN64.jpg 2x';

            expect(
                container.querySelector(
                    `[srcset="${resultImageWithPixelDensity}"]`
                )
            ).toBeDefined();
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

    describe('Cases without tag picture', () => {
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

        test('The image should be wrapped in a link', () => {
            const { container } = render(<ImageArticle {...properties} />);

            expect(screen.getByRole('link')).toBeDefined();

            expect(container).toMatchSnapshot();
        });
    });
});
