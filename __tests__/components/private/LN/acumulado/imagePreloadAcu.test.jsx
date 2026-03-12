import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { preload } from 'react-dom';
import ImagePreloadAcu from '../../../../../components/private/LN/acumulado/imagePreloadAcu';
import { useContent } from 'fusion:content';

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

jest.mock('fusion:content');

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    preload: jest.fn()
}));

describe('Private - LN - Acumulado - ImagePreloadAcu', () => {
    beforeEach(() => {
        preload.mockClear();
    });

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

        const [firstArticle] = contentResponse.content_elements;
        const { resized_urls } = firstArticle.promo_items.basic;

        expect(preload).toHaveBeenCalledTimes(resized_urls.length);
        expect(preload).toHaveBeenCalledWith(
            resized_urls[0].resizedUrl,
            expect.objectContaining({ as: 'image', fetchPriority: 'high' })
        );
    });
});
