import React from 'react';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import WebStoryFeature from '../../../../../components/features/LN-10/webStory/default';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import '@testing-library/jest-dom';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('components - feature - ln10 - webstory', () => {
    Context.useAppContext = jest.fn(() => ({
        isAdmin: false,
        layout: 'LN10-Home_Main',
        arcSite: 'la-nacion-ar'
    }));

    const getCustomFields = (title, lead, link, imageId) => ({
        title,
        lead,
        link,
        imageId
    });

    const renderables = [
        {
            collection: 'sections',
            children: [
                {
                    type: 'LN10_Caja_Manual',
                    children: []
                },
                {
                    type: 'LN10_Caja_WebStories',
                    children: [
                        {
                            props: {
                                id: '123',
                                customFields: {
                                    link: 'www.lanacion.com.ar',
                                    imageId: 'image-0'
                                }
                            }
                        },
                        {
                            props: {
                                id: '456',
                                customFields: {
                                    link: 'www.lanacion.com.ar'
                                }
                            }
                        },
                        {
                            props: {
                                id: '789',
                                customFields: {
                                    link: 'www.lanacion.com.ar',
                                    imageId: 'image-1'
                                }
                            }
                        },
                        {
                            props: {
                                id: '112',
                                customFields: {
                                    imageId: 'image-1'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            collection: 'chains',
            type: 'LN10_Caja_WebStories',
            props: {
                id: 'chain123'
            },
            children: [
                {
                    props: {
                        id: '123',
                        customFields: {
                            link: 'www.lanacion.com.ar',
                            imageId: 'image-0'
                        }
                    }
                },
                {
                    props: {
                        id: '456',
                        customFields: {
                            link: 'www.lanacion.com.ar'
                        }
                    }
                },
                {
                    props: {
                        id: '789',
                        customFields: {
                            link: 'www.lanacion.com.ar',
                            imageId: 'image-1'
                        }
                    }
                },
                {
                    props: {
                        id: '112',
                        customFields: {
                            imageId: 'image-1'
                        }
                    }
                }
            ]
        }
    ];

    it('should match snapshot', () => {
        useContent.mockReturnValue({
            _id:
                'f1483051a5816ba7685a71f24b31be2e6f3828849684bbe42cd815976b58d55c',
            promo_items: {
                basic: {
                    height: 513,
                    resized_urls: [
                        {
                            option: {
                                height: 373,
                                maxScreenWidth: 767,
                                proportion: '3:4',
                                width: 280
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/lh-gNMcfgBevIHVti6EmwfG2SZo=/280x0/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/SVH33PIGLVCGFON7ZOZYCT6KXM.jpg'
                        },
                        {
                            option: {
                                height: 293,
                                proportion: '3:4',
                                width: 220
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/JLAdGQ5ShrzNMDSgOmcVdqUBmAo=/220x0/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/SVH33PIGLVCGFON7ZOZYCT6KXM.jpg'
                        }
                    ],
                    type: 'image',
                    url:
                        'https://resizer.glanacion.com/resizer/FGk7LNlgU1m6ScntnXbBQu_zO1s=/768x0/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/SVH33PIGLVCGFON7ZOZYCT6KXM.jpg',
                    width: 768
                }
            }
        });

        const { container } = render(
            <WebStoryFeature
                id={'AKWJ178JAK8'}
                customFields={getCustomFields(
                    'Titulo',
                    'Volanta',
                    'www.lanacion.com.ar',
                    '89P13'
                )}
                renderables={renderables}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should have data-... attributes', () => {
        render(
            <WebStoryFeature
                id={'AKWJ178JAK8'}
                customFields={getCustomFields(
                    'Titulo',
                    'Volanta',
                    'www.lanacion.com.ar',
                    '89P13'
                )}
                renderables={renderables}
            />
        );

        const article = screen.getByRole('article');

        expect(article).toHaveAttribute('data-pos', '0000');
        expect(article).toHaveAttribute('data-notaid', '89P13');
        expect(article).toHaveAttribute('data-id', '89P13');
    });
});
