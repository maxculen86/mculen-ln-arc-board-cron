import React from 'react';

jest.mock('fusion:properties', () => () => ({
    imageConfig: {
        resize: {
            l: {
                promo_items: {
                    sizes: [
                        {
                            width: 360,
                            height: 240,
                            media: '1024',
                            proportion: '3:2'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '1024',
                            proportion: '3:2'
                        },
                        {
                            width: 351,
                            height: 234,
                            media: '1024',
                            proportion: '3:2'
                        },
                        {
                            width: 360,
                            height: 240,
                            media: '1024',
                            proportion: '3:2'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 278,
                            height: 186,
                            media: '1024'
                        },
                        {
                            width: 344,
                            height: 230,
                            media: '1024'
                        },
                        {
                            width: 768,
                            height: 513,
                            media: '(max-width: 375px)'
                        },
                        {
                            width: 350,
                            height: 234,
                            media: '(max-width: 375px)'
                        },
                        {
                            width: 360,
                            height: 234,
                            media: '(max-width: 375px)'
                        }
                    ]
                },
                credits: {
                    sizes: [
                        {
                            width: 80,
                            height: 80,
                            media: '1024'
                        }
                    ]
                }
            },
            default: [
                {
                    width: 1033,
                    height: 768,
                    media: '1024',
                    class: 'img-desktop',
                    media_preload: '1024'
                }
            ]
        }
    }
}));
