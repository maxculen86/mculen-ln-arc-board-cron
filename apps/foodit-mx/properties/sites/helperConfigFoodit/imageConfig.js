import setMediaCondition from '../utils/setMediaCondition';

const contentElementsSizes = {
    sizes: [
        {
            width: 780,
            height: 520,
            minScreenWidth: 768,
            media_preload: setMediaCondition({ minWidth: 768 })
        },
        {
            width: 420,
            height: 280,
            media_preload: setMediaCondition({ maxWidth: 767 })
        }
    ]
};

const creditsSizes = {
    sizes: [
        {
            width: 80,
            height: 80
        }
    ]
};

export default {
    resize: {
        fichaNotaAl100: {
            promo_items: {
                sizes: [
                    {
                        width: 1920,
                        height: 1280,
                        minScreenWidth: 1440,
                        useFullSize: true,
                        proportion: '3:2',
                        device: 'desktop',
                        media_preload: setMediaCondition({ minWidth: 1440 })
                    },
                    {
                        width: 1200,
                        height: 800,
                        minScreenWidth: 1024,
                        useFullSize: true,
                        device: 'desktop',
                        proportion: '3:2',
                        media_preload: setMediaCondition({
                            minWidth: 1024,
                            maxWidth: 1439
                        })
                    },
                    {
                        width: 880,
                        height: 587,
                        minScreenWidth: 768,
                        useFullSize: true,
                        device: 'mobile',
                        proportion: '3:2',
                        media_preload: setMediaCondition({
                            minWidth: 768,
                            maxWidth: 1023
                        })
                    },
                    {
                        width: 420,
                        height: 280,
                        useFullSize: true,
                        device: 'mobile',
                        proportion: '3:2',
                        media_preload: setMediaCondition({ maxWidth: 767 })
                    }
                ]
            },
            content_elements: contentElementsSizes,
            credits: creditsSizes
        },
        fichaReceta: {
            promo_items: {
                sizes: [
                    {
                        width: 880,
                        height: 587,
                        minScreenWidth: 768,
                        media_preload: setMediaCondition({ minWidth: 768 }),
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 420,
                        height: 280,
                        media_preload: setMediaCondition({ maxWidth: 767 }),
                        useFullSize: true,
                        proportion: '3:2'
                    }
                ]
            },
            content_elements: contentElementsSizes,
            credits: creditsSizes
        },
        recipeDay: {
            promo_items: {
                sizes: [
                    {
                        width: 880,
                        height: 587,
                        minScreenWidth: 768,
                        media_preload: setMediaCondition({ minWidth: 768 }),
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 420,
                        height: 280,
                        media_preload: setMediaCondition({ maxWidth: 767 }),
                        useFullSize: true,
                        proportion: '3:2'
                    }
                ]
            },
            credits: creditsSizes,
            poster: {
                sizes: {
                    width: 420,
                    height: 280,
                    media_preload: setMediaCondition({ maxWidth: 767 }),
                    useFullSize: true,
                    proportion: '3:2'
                }
            }
        },
        grid2Notes: {
            promo_items: {
                sizes: [
                    {
                        width: 610,
                        height: 407,
                        minScreenWidth: 1024,
                        media_preload: setMediaCondition({ minWidth: 1024 }),
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 420,
                        height: 280,
                        media_preload: setMediaCondition({ maxWidth: 1023 }),
                        useFullSize: true,
                        proportion: '3:2'
                    }
                ]
            },
            credits: creditsSizes,
            poster: {
                sizes: {
                    width: 610,
                    height: 407,
                    minScreenWidth: 1024,
                    media_preload: setMediaCondition({ minWidth: 1024 }),
                    useFullSize: true,
                    proportion: '3:2'
                }
            }
        },
        category: {
            promo_items: {
                sizes: [
                    {
                        width: 150,
                        height: 150,
                        proportion: '1:1',
                        useFullSize: true,
                        quality: 85
                    }
                ]
            }
        },
        m: {
            promo_items: {
                sizes: [
                    {
                        width: 420,
                        height: 280,
                        maxScreenWidth: 1279,
                        media_preload: setMediaCondition({ maxWidth: 1279 }),
                        proportion: '3:2'
                    },
                    {
                        width: 300,
                        height: 200,
                        media_preload: setMediaCondition({ minWidth: 1280 }),
                        proportion: '3:2'
                    }
                ]
            },
            credits: creditsSizes
        },
        chefs: {
            credits: {
                sizes: {
                    width: 280,
                    height: 280,
                    media: '(min-width: 320px)',
                    class: '',
                    type: 'image'
                }
            }
        },
        default: [
            {
                width: 1033,
                height: 768,
                class: 'img-desktop',
                media_preload: setMediaCondition({ minWidth: 768 })
            }
        ]
    }
};
