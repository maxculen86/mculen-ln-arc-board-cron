import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImagePreloadAcu from '../../../../../components/private/LN/acumulado/imagePreloadAcu';
import { useContent } from 'fusion:content';

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

jest.mock('fusion:content');

describe('Private - LN - Acumulado - ImagePreloadAcu', () => {
    test('render correctly', () => {
        const contentResponse = {
            content_elements: [
                {
                    _id: 'L2IXGD5ZJJH27BJOHCEABWFIOI',
                    promo_items: {
                        basic: {
                            height: 513,
                            resized_urls: [
                                {
                                    option: {
                                        height: 240,
                                        media: '(min-width: 1024px)',
                                        width: 360
                                    },
                                    resizedUrl:
                                        'https://www.lanacion.com.ar/resizer/EoAVN415NnJ_hhSCYZlSa_o2oYs=/360x240/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/6AOT7FFVEFBGTAHJDGINZ3RHKI.jpg'
                                },
                                {
                                    option: {
                                        height: 512,
                                        width: 768
                                    },
                                    resizedUrl:
                                        'https://www.lanacion.com.ar/resizer/_15l66F4uJzOU0PiP0Fo-zcCkAY=/768x512/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/6AOT7FFVEFBGTAHJDGINZ3RHKI.jpg'
                                },
                                {
                                    option: {
                                        height: 234,
                                        width: 351
                                    },
                                    resizedUrl:
                                        'https://www.lanacion.com.ar/resizer/PKvYWtapw096AielvEcSPtG8wls=/351x234/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/6AOT7FFVEFBGTAHJDGINZ3RHKI.jpg'
                                },
                                {
                                    option: {
                                        height: 240,
                                        width: 360
                                    },
                                    resizedUrl:
                                        'https://www.lanacion.com.ar/resizer/EoAVN415NnJ_hhSCYZlSa_o2oYs=/360x240/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/6AOT7FFVEFBGTAHJDGINZ3RHKI.jpg'
                                }
                            ],
                            type: 'image',
                            url: 'https://www.lanacion.com.ar/resizer/5QiqWRtDCL79o3YfV575SaET760=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/6AOT7FFVEFBGTAHJDGINZ3RHKI.jpg',
                            width: 768
                        }
                    }
                }
            ]
        };

        useContent.mockImplementation(() => contentResponse);

        const mockProps = {
            arcSite: 'la-nacion-ar',
            accumulated: {
                id: '/cultura',
                name: 'Cultura'
            },
            nodeType: 'section',
            sectionsIds: '',
            collectionId: '',
            imageConfig: 'boxArticles'
        };

        render(<ImagePreloadAcu {...mockProps} />);

        const linkElements = document.head.querySelectorAll(
            'link[rel="preload"][as="image"]'
        );
        const [linkElement] = linkElements;
        const [firstArticle] = contentResponse.content_elements;

        expect(linkElements).toHaveLength(
            contentResponse.content_elements[0].promo_items.basic.resized_urls
                .length
        );
        expect(linkElement.getAttribute('as')).toBe(
            firstArticle.promo_items.basic.type
        );
        expect(linkElement.getAttribute('rel')).toBe('preload');
        expect(linkElement.getAttribute('href')).toBe(
            firstArticle.promo_items.basic.resized_urls[0].resizedUrl
        );
        expect(
            Array.from(linkElements).map(el => el.outerHTML)
        ).toMatchSnapshot();
    });
});
