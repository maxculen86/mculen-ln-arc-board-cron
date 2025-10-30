import setMediaCondition from '../utils/setMediaCondition';

// TODO: Revisar estas variables y eliminar las que no sean necesarias a medida que se vayan habilitando configuraciones para carga con picture
const minWidth1920 = '(min-width: 1920px)';
const minWidth1440 = '(min-width: 1440px)';
const minWidth1280 = '(min-width: 1280px)';
const minWidth1024 = '(min-width: 1024px)';
const minWidth768 = '(min-width: 768px)';
const minWidth360 = '(min-width: 360px)';
const minWidth320 = '(min-width: 320px)';
const minWidth375 = '(min-width: 375px)';
const minWidthPreload1280 = '(min-width: 1280px)';
const min1024max1280 = '(min-width: 1024px and max-width: 1279px)';
const min768max1024 = '(min-width: 768px and max-width: 1023px)';
const min375max768 = '(min-width: 376px and max-width: 767px)';
const maxWidth767 = '(max-width: 767px)';
const maxWidth375 = '(max-width: 375px)';

const contentElementSizes = {
    sizes: [
        {
            width: 278,
            height: 186,
            media: minWidth1280
        },
        {
            width: 344,
            height: 230,
            media: minWidth1024
        },
        {
            width: 768,
            height: 513
            // media: minWidth768
        },
        {
            width: 350,
            height: 234
            // media: minWidth360
        },
        {
            width: 360,
            height: 234
            // media: minWidth320
        }
    ]
};

const contentElementSizesThreeTwo = {
    sizes: [
        {
            maxScreenWidth: 511,
            width: 480,
            height: 320,
            proportion: '3:2'
        },
        {
            minScreenWidth: 512,
            width: 733,
            height: 488,
            proportion: '3:2'
        },
        {
            minScreenWidth: 768,
            width: 807,
            height: 538,
            proportion: '3:2'
        },
        {
            minScreenWidth: 1280,
            width: 627,
            height: 418,
            proportion: '3:2'
        }
    ]
};

const promoItemsSizes = {
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
};

const creditsSizes = {
    sizes: [
        {
            width: 80,
            height: 80,
            media: minWidth320
        }
    ]
};

export default {
    resize: {
        bomba: {
            promo_items: {
                sizes: [
                    {
                        width: 1920,
                        height: 1280,
                        media: minWidth1920,
                        useFullSize: true,
                        proportion: '3:2',
                        media_preload: '(min-width: 1920.1px)'
                    },
                    {
                        width: 1280,
                        height: 854,
                        // media: minWidth1280,
                        useFullSize: true,
                        proportion: '3:2',
                        media_preload:
                            '(min-width: 1280.1px and max-width: 1920px)'
                    },
                    {
                        width: 1024,
                        height: 682,
                        // media: minWidth1024,
                        useFullSize: true,
                        proportion: '3:2',
                        media_preload: min1024max1280
                    },
                    {
                        width: 768,
                        height: 512,
                        // media: minWidth768,
                        useFullSize: true,
                        proportion: '3:2',
                        media_preload: min768max1024
                    },
                    {
                        width: 375,
                        height: 562,
                        // media: minWidth375,
                        useFullSize: true,
                        proportion: '2:3',
                        media_preload: min375max768
                    },
                    {
                        width: 320,
                        height: 480,
                        // media: minWidth320,
                        useFullSize: true,
                        proportion: '2:3',
                        media_preload: maxWidth375
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 1920,
                        height: 1280,
                        media: minWidth1920
                    },
                    {
                        width: 1280,
                        height: 854,
                        media: minWidth1280
                    },
                    {
                        width: 1024,
                        height: 682,
                        media: minWidth1024
                    },
                    {
                        width: 768,
                        height: 512,
                        media: minWidth768
                    },
                    {
                        width: 375,
                        height: 562,
                        media: minWidth375
                    },
                    {
                        width: 320,
                        height: 480,
                        media: minWidth320
                    }
                ]
            }
        },
        featuredFocalIzquierdo: {
            promo_items: {
                sizes: [
                    {
                        width: 510,
                        height: 340,
                        maxScreenWidth: 767,
                        media_preload: setMediaCondition({ maxWidth: 767 }),
                        proportion: '3:2'
                    },
                    {
                        width: 490,
                        height: 330,
                        minScreenWidth: 768,
                        media_preload: setMediaCondition({
                            minWidth: 768,
                            maxWidth: 1023
                        }),
                        proportion: '3:2'
                    },
                    {
                        width: 560,
                        height: 375,
                        minScreenWidth: 1024,
                        media_preload: setMediaCondition({
                            minWidth: 1024
                        }),
                        proportion: '3:2'
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 560,
                        height: 373,
                        media: minWidth1280
                    },
                    {
                        width: 637,
                        height: 424,
                        media: minWidth1024
                    },
                    {
                        width: 465,
                        height: 310,
                        media: minWidth768
                    },
                    {
                        width: 375,
                        height: 250
                        // media: minWidth375
                    },
                    {
                        width: 320,
                        height: 213
                        // media: minWidth320
                    }
                ]
            }
        },
        mediumFocalIzquierdo: {
            promo_items: {
                sizes: [
                    {
                        width: 292,
                        height: 194,
                        media: minWidth1280,
                        minScreenWidth: 1280,
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 316,
                        height: 210,
                        media: minWidth1024,
                        minScreenWidth: 1024,
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 231,
                        height: 154,
                        media: minWidth768,
                        minScreenWidth: 768,
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 510,
                        height: 320,
                        media: minWidth375,
                        minScreenWidth: 375,
                        useFullSize: true,
                        proportion: '2:3'
                    },
                    {
                        width: 320,
                        height: 192,
                        // media: minWidth320,
                        useFullSize: true,
                        proportion: '2:3'
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 292,
                        height: 194,
                        media: minWidth1280
                    },
                    {
                        width: 316,
                        height: 210,
                        media: minWidth1024
                    },
                    {
                        width: 231,
                        height: 154,
                        media: minWidth768
                    },
                    {
                        width: 375,
                        height: 229
                        // media: minWidth375
                    },
                    {
                        width: 320,
                        height: 192
                        // media: minWidth320
                    }
                ]
            }
        },
        featuredFocalDerecho: {
            promo_items: {
                sizes: [
                    {
                        width: 510,
                        height: 340,
                        maxScreenWidth: 767,
                        media_preload: setMediaCondition({ maxWidth: 767 }),
                        proportion: '3:2'
                    },
                    {
                        width: 490,
                        height: 330,
                        minScreenWidth: 768,
                        media_preload: setMediaCondition({
                            minWidth: 768,
                            maxWidth: 1023
                        }),
                        proportion: '3:2'
                    },
                    {
                        width: 560,
                        height: 375,
                        minScreenWidth: 1024,
                        media_preload: setMediaCondition({
                            minWidth: 1024
                        }),
                        proportion: '3:2'
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 292,
                        height: 194,
                        media: minWidth1280
                    },
                    {
                        width: 316,
                        height: 210,
                        media: minWidth1024
                    },
                    {
                        width: 231,
                        height: 154,
                        media: minWidth768
                    },
                    {
                        width: 375,
                        height: 229
                        // media: minWidth375
                    },
                    {
                        width: 320,
                        height: 192
                        // media: minWidth320
                    }
                ]
            }
        },
        mediumFocalDerecho: {
            promo_items: {
                sizes: [
                    {
                        width: 510,
                        height: 340,
                        maxScreenWidth: 511,
                        proportion: '3:2',
                        media_preload: setMediaCondition({ maxWidth: 511 })
                    },
                    {
                        width: 512,
                        height: 220,
                        minScreenWidth: 512,
                        proportion: '3:2',
                        media_preload: setMediaCondition({
                            minWidth: 512,
                            maxWidth: 767
                        })
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 375,
                        height: 229
                        // media: minWidth375
                    },
                    {
                        width: 320,
                        height: 192
                        // media: minWidth320
                    }
                ]
            }
        },
        featuredOpinion: {
            promo_items: {
                sizes: [
                    {
                        width: 373,
                        height: 250,
                        media: minWidth1280,
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 403,
                        height: 270,
                        media: minWidth1024,
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 297,
                        height: 200,
                        media: minWidth768,
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 375,
                        height: 229,
                        // media: minWidth375,
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 320,
                        height: 192,
                        // media: minWidth320,
                        useFullSize: true,
                        proportion: '3:4'
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 373,
                        height: 250,
                        media: minWidth1280
                    },
                    {
                        width: 403,
                        height: 270,
                        media: minWidth1024
                    },
                    {
                        width: 297,
                        height: 200,
                        media: minWidth768
                    },
                    {
                        width: 375,
                        height: 229
                        // media: minWidth375
                    },
                    {
                        width: 320,
                        height: 192
                        // media: minWidth320
                    }
                ]
            },
            credits: creditsSizes
        },
        columnistas: {
            credits: {
                sizes: {
                    width: 80,
                    height: 80,
                    media: minWidth320,
                    class: '',
                    type: 'image'
                }
            }
        },
        boxArticlesSingleArticle: {
            promo_items: {
                sizes: [
                    {
                        width: 880,
                        height: 586,
                        media: minWidth1280,
                        minScreenWidth: 1280,
                        useFullSize: true
                    },
                    {
                        width: 992,
                        height: 397,
                        media: minWidth1024,
                        minScreenWidth: 1024,
                        useFullSize: true
                    },
                    {
                        width: 736,
                        height: 294,
                        media: minWidth768,
                        minScreenWidth: 768,
                        useFullSize: true
                    },
                    {
                        width: 510,
                        height: 590,
                        // media: minWidth375,
                        minScreenWidth: 375,
                        useFullSize: true
                    },
                    {
                        width: 320,
                        height: 360,
                        // media: minWidth320,
                        useFullSize: true
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 1250,
                        height: 500,
                        media: minWidth1280
                    },
                    {
                        width: 1024,
                        height: 682,
                        media: minWidth1024
                    },
                    {
                        width: 736,
                        height: 294,
                        media: minWidth768
                    },
                    {
                        width: 375,
                        height: 429
                        // media: minWidth375
                    },
                    {
                        width: 320,
                        height: 360
                        // media: minWidth320
                    }
                ]
            }
        },
        boxArticlesTwoArticles: {
            promo_items: {
                sizes: [
                    {
                        width: 510,
                        height: 320,
                        maxScreenWidth: 1023,
                        media_preload: setMediaCondition({
                            maxWidth: 1023
                        }),
                        proportion: '3:2'
                    },
                    {
                        width: 480,
                        height: 320,
                        media_preload: setMediaCondition({
                            minWidth: 1024
                        }),
                        proportion: '3:2'
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 449,
                        height: 300,
                        media: minWidth1280
                    },
                    {
                        width: 486,
                        height: 325,
                        media: minWidth1024
                    },
                    {
                        width: 358,
                        height: 240,
                        media: minWidth768
                    },
                    {
                        width: 375,
                        height: 250
                        // media: minWidth375
                    },
                    {
                        width: 320,
                        height: 213
                        // media: minWidth320
                    }
                ]
            }
        },
        newBoxArticles: {
            promo_items: {
                sizes: [
                    {
                        width: 320,
                        height: 213,
                        media_preload: setMediaCondition({ minWidth: 768 }),
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 420,
                        height: 280,
                        maxScreenWidth: 767,
                        media_preload: setMediaCondition({ maxWidth: 767 }),
                        useFullSize: true,
                        proportion: '3:2'
                    }
                ],
                // TODO: Pendiente por actualizacion de tamaños
                content_elements: {
                    sizes: [
                        {
                            width: 298,
                            height: 200,
                            media: minWidth1280
                        },
                        {
                            width: 318,
                            height: 213,
                            media: minWidth1024
                        },
                        {
                            width: 233,
                            height: 159,
                            media: minWidth768
                        },
                        {
                            width: 375,
                            height: 250
                            // media: minWidth375
                        },
                        {
                            width: 320,
                            height: 213
                            // media: minWidth320
                        }
                    ]
                }
            }
        },
        boxArticles: {
            promo_items: {
                sizes: [
                    {
                        width: 375,
                        height: 250,
                        minScreenWidth: 375,
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 300,
                        height: 200,
                        useFullSize: true,
                        proportion: '3:2'
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 298,
                        height: 200,
                        media: minWidth1280
                    },
                    {
                        width: 318,
                        height: 213,
                        media: minWidth1024
                    },
                    {
                        width: 233,
                        height: 159,
                        media: minWidth768
                    },
                    {
                        width: 375,
                        height: 250
                        // media: minWidth375
                    },
                    {
                        width: 320,
                        height: 213
                        // media: minWidth320
                    }
                ]
            }
        },
        boxArticlesVerticalArticles: {
            promo_items: {
                sizes: [
                    {
                        width: 300,
                        height: 375,
                        media: minWidth1280,
                        useFullSize: true,
                        proportion: '3:4'
                    },
                    {
                        width: 320,
                        height: 400,
                        media: minWidth1024,
                        useFullSize: true,
                        proportion: '3:4'
                    },
                    {
                        width: 245,
                        height: 293,
                        media: minWidth768,
                        useFullSize: true,
                        proportion: '3:4'
                    },
                    {
                        width: 375,
                        height: 229,
                        // media: minWidth375,
                        useFullSize: true,
                        proportion: '3:4'
                    },
                    {
                        width: 320,
                        height: 192,
                        // media: minWidth320,
                        useFullSize: true,
                        proportion: '3:4'
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 300,
                        height: 375,
                        media: minWidth1280
                    },
                    {
                        width: 320,
                        height: 400,
                        media: minWidth1024
                    },
                    {
                        width: 245,
                        height: 293,
                        media: minWidth768
                    },
                    {
                        width: 375,
                        height: 229
                        // media: minWidth375
                    },
                    {
                        width: 320,
                        height: 192
                        // media: minWidth320
                    }
                ]
            }
        },
        latestNews: {
            promo_items: {
                sizes: [
                    {
                        width: 150,
                        height: 100,
                        media: minWidth768,
                        useFullSize: true,
                        proportion: '3:2'
                    },
                    {
                        width: 375,
                        height: 250,
                        // media: minWidth375,
                        useFullSize: true,
                        proportion: '2:3'
                    },
                    {
                        width: 278,
                        height: 187,
                        // media: minWidth320,
                        useFullSize: true,
                        proportion: '2:3'
                    }
                ]
            }
        },
        newAperturaAcu: {
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
            }
        },
        wikiTag: {
            promo_items: {
                sizes: [
                    {
                        width: 420,
                        height: 630
                    }
                ]
            }
        },
        boxMultimediaMobile: {
            promo_items: {
                sizes: [
                    {
                        width: 736,
                        height: 1104,
                        useFullSize: true,
                        proportion: '2:3'
                    },
                    {
                        width: 375,
                        height: 563,
                        useFullSize: true,
                        proportion: '2:3'
                    },
                    {
                        width: 320,
                        height: 480,
                        useFullSize: true,
                        proportion: '2:3'
                    }
                ]
            }
        },
        zoom: {
            promo_items: {
                sizes: [
                    {
                        width: 1920,
                        height: 1280,
                        media: minWidth1280
                    },
                    {
                        width: 1200,
                        height: 800,
                        media: minWidth1024
                    },
                    {
                        width: 1023,
                        height: 682,
                        media: minWidth768
                    },
                    {
                        width: 768,
                        height: 512,
                        media: minWidth360
                    },
                    {
                        width: 360,
                        height: 240,
                        media: minWidth320
                    }
                ]
            }
        },
        techoImagen: {
            promo_items: {
                sizes: [
                    {
                        width: 222,
                        height: 160,
                        media: minWidth1024
                    }
                ]
            },
            content_elements: contentElementSizes,
            credits: creditsSizes
        },
        fotoAl100: {
            promo_items: {
                sizes: [
                    {
                        width: 1920,
                        height: 1280,
                        media: minWidth1280,
                        minScreenWidth: 1440,
                        useFullSize: true,
                        proportion: '3:2',
                        media_preload: setMediaCondition({ minWidth: 1440 })
                    },
                    {
                        width: 1200,
                        height: 800,
                        media: minWidth1280,
                        minScreenWidth: 1024,
                        useFullSize: true,
                        proportion: '3:2',
                        media_preload: setMediaCondition({
                            minWidth: 1024,
                            maxWidth: 1439
                        })
                    },
                    {
                        width: 770,
                        height: 1155,
                        media: minWidth1280,
                        minScreenWidth: 768,
                        useFullSize: true,
                        proportion: '2:3',
                        media_preload: setMediaCondition({
                            minWidth: 768,
                            maxWidth: 1023
                        })
                    },
                    {
                        width: 420,
                        height: 630,
                        media: minWidth1280,
                        useFullSize: true,
                        proportion: '2:3',
                        media_preload: setMediaCondition({ maxWidth: 767 })
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 1920,
                        height: 1280,
                        media: minWidth1440,
                        minScreenWidth: 1440,
                        useFullSize: true,
                        proportion: '3:2',
                        media_preload: setMediaCondition({ minWidth: 1440 })
                    },
                    {
                        width: 1280,
                        height: 853,
                        media: minWidth1024,
                        minScreenWidth: 1024,
                        useFullSize: true,
                        proportion: '3:2',
                        media_preload: setMediaCondition({
                            minWidth: 1024,
                            maxWidth: 1439
                        })
                    },
                    {
                        width: 768,
                        height: 512,
                        media: minWidth768,
                        minScreenWidth: 768,
                        useFullSize: true,
                        proportion: '3:2',
                        media_preload: setMediaCondition({
                            minWidth: 768,
                            maxWidth: 1023
                        })
                    },
                    {
                        width: 420,
                        height: 280,
                        media: maxWidth767,
                        useFullSize: true,
                        proportion: '3:2',
                        media_preload: setMediaCondition({ maxWidth: 767 })
                    }
                ]
            }
        },
        liveblogEditorial: {
            promo_items: {
                sizes: [
                    {
                        minScreenWidth: 768,
                        width: 717,
                        height: 404,
                        proportion: '16:9',
                        media_preload: setMediaCondition({
                            minWidth: 768
                        })
                    },
                    {
                        width: 420,
                        height: 236,
                        proportion: '16:9',
                        media_preload: setMediaCondition({ maxWidth: 767 })
                    }
                ]
            }
        },
        videoAl100: {
            promo_items: {
                sizes: [
                    {
                        minScreenWidth: 1024,
                        width: 1260,
                        height: 708,
                        proportion: '16:9',
                        media_preload: setMediaCondition({
                            minWidth: 1024
                        })
                    },
                    {
                        minScreenWidth: 768,
                        width: 720,
                        height: 405,
                        proportion: '16:9',
                        media_preload: setMediaCondition({
                            minWidth: 768,
                            maxWidth: 1023
                        })
                    },
                    {
                        width: 480,
                        height: 270,
                        proportion: '16:9',
                        media_preload: setMediaCondition({ maxWidth: 767 })
                    }
                ]
            }
        },
        videoImage: {
            promo_items: {
                sizes: [
                    {
                        width: 820,
                        height: 410,
                        media_preload: setMediaCondition({
                            minWidth: 768
                        })
                    },
                    {
                        width: 420,
                        height: 280,
                        maxScreenWidth: 767,
                        media_preload: setMediaCondition({ maxWidth: 767 }),
                        proportion: '3:2'
                    }
                ]
            }
        },
        videoHorizontal: {
            promo_items: {
                sizes: [
                    {
                        width: 460,
                        height: 263,
                        proportion: '3:4'
                    }
                ]
            },
            credits: creditsSizes
        },
        videoVertical: {
            promo_items: {
                sizes: [
                    {
                        width: 320,
                        height: 588,
                        proportion: '2:3'
                    }
                ]
            },
            credits: creditsSizes
        },
        videoJwImage: {
            promo_items: {
                sizes: [
                    {
                        width: 510,
                        height: 765,
                        maxScreenWidth: 511,
                        media_preload: setMediaCondition({
                            maxWidth: 511
                        }),
                        proportion: '2:3'
                    },
                    {
                        width: 767,
                        height: 1151,
                        minScreenWidth: 512,
                        media_preload: setMediaCondition({
                            minWidth: 512,
                            maxWidth: 767
                        }),
                        proportion: '2:3'
                    },
                    {
                        width: 1023,
                        height: 1535,
                        minScreenWidth: 768,
                        media_preload: setMediaCondition({
                            minWidth: 768,
                            maxWidth: 1023
                        }),
                        proportion: '2:3'
                    },
                    {
                        width: 1279,
                        height: 1919,
                        minScreenWidth: 1024,
                        media_preload: setMediaCondition({
                            minWidth: 1024,
                            maxWidth: 1279
                        }),
                        proportion: '2:3'
                    },

                    {
                        width: 1366,
                        height: 2049,
                        minScreenWidth: 1280,
                        media_preload: setMediaCondition({
                            minWidth: 1280,
                            maxWidth: 1366
                        }),
                        proportion: '2:3'
                    }
                ]
            }
        },
        xxl: {
            promo_items: {
                sizes: [
                    {
                        width: 1920,
                        height: 1280,
                        media: minWidth1280,
                        proportion: '3:2',
                        media_preload: minWidthPreload1280
                    },
                    {
                        width: 1200,
                        height: 800,
                        // media: minWidth1024,
                        proportion: '3:2',
                        media_preload: min1024max1280
                    },
                    {
                        width: 1023,
                        height: 682,
                        // media: minWidth768,
                        proportion: '3:2',
                        media_preload: min768max1024
                    },
                    {
                        width: 768,
                        height: 512,
                        // media: minWidth375,
                        proportion: '3:2',
                        media_preload: min375max768
                    },
                    {
                        width: 360,
                        height: 240,
                        // media: minWidth320,
                        proportion: '3:2',
                        media_preload: maxWidth375
                    }
                ]
            },
            content_elements: {
                sizes: [
                    {
                        width: 1920,
                        height: 850,
                        media: minWidth1280
                    },
                    {
                        width: 1200,
                        height: 515
                        // media: minWidth1024
                    },
                    {
                        width: 1024,
                        height: 579
                        // media: minWidth768
                    },
                    {
                        width: 768,
                        height: 432
                        // media: minWidth360
                    },
                    {
                        width: 360,
                        height: 203
                        // media: minWidth320
                    }
                ]
            },
            credits: creditsSizes
        },
        xl: {
            promo_items: promoItemsSizes,
            content_elements: {
                sizes: [
                    {
                        width: 878,
                        height: 585,
                        media: minWidth1280
                    },
                    {
                        width: 1120,
                        height: 400
                        // media: minWidth1024
                    },
                    {
                        width: 768,
                        height: 961
                        // media: minWidth768
                    },
                    {
                        width: 350,
                        height: 438
                        // media: minWidth360
                    },
                    {
                        width: 310,
                        height: 203
                        // media: '(-width: 320px)'
                    }
                ]
            },
            credits: creditsSizes
        },
        l: {
            promo_items: promoItemsSizes,
            content_elements: {
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
            },
            credits: creditsSizes
        },
        m: {
            promo_items: {
                sizes: [
                    {
                        width: 420,
                        height: 280,
                        maxScreenWidth: 767,
                        media_preload: setMediaCondition({ maxWidth: 767 }),
                        proportion: '3:2'
                    },
                    {
                        width: 238,
                        height: 159,
                        media_preload: setMediaCondition({ minWidth: 768 }),
                        proportion: '3:2'
                    }
                ]
            },
            content_elements: contentElementSizes,
            credits: creditsSizes
        },
        // TEMPLATE CARDS - Configuración específica con proportion 3:2
        cardsRatio3x2: {
            content_elements: contentElementSizesThreeTwo
        },
        // HOME LN10
        s: {
            promo_items: {
                sizes: [
                    {
                        width: 420,
                        height: 280,
                        proportion: '3:2',
                        media_preload: setMediaCondition({ maxWidth: 767 }),
                        maxScreenWidth: 767
                    },
                    {
                        width: 302,
                        height: 201,
                        proportion: '3:2',
                        media_preload: setMediaCondition({ minWidth: 768 })
                    }
                ]
            },
            credits: creditsSizes
        },
        xs: {
            promo_items: {
                sizes: [
                    {
                        width: 420,
                        height: 280,
                        proportion: '3:2',
                        media_preload: setMediaCondition({ maxWidth: 767 }),
                        maxScreenWidth: 767
                    },
                    {
                        width: 226,
                        height: 151,
                        proportion: '3:2',
                        media_preload: setMediaCondition({ minWidth: 768 })
                    }
                ]
            },
            credits: creditsSizes
        },
        bombaVertical: {
            promo_items: {
                sizes: [
                    {
                        width: 635,
                        height: 635,
                        proportion: '1:1',
                        media_preload: setMediaCondition({
                            minWidth: 1280
                        }),
                        minScreenWidth: 1280,
                        useFullSize: true
                    },
                    {
                        width: 488,
                        height: 651,
                        proportion: '3:4',
                        media: minWidth768,
                        media_preload: setMediaCondition({
                            minWidth: 768,
                            maxWidth: 1279
                        }),
                        minScreenWidth: 768,
                        useFullSize: true
                    },
                    {
                        width: 420,
                        height: 560,
                        proportion: '3:4',
                        media_preload: setMediaCondition({
                            maxWidth: 767
                        }),
                        useFullSize: true
                    }
                ]
            },
            credits: creditsSizes
        },
        bombaHorizontal: {
            promo_items: {
                sizes: [
                    {
                        width: 1302,
                        height: 868,
                        proportion: '3:2',
                        media_preload: setMediaCondition({
                            minWidth: 1280
                        }),
                        minScreenWidth: 1280
                    },
                    {
                        width: 976,
                        height: 651,
                        proportion: '3:2',
                        media_preload: setMediaCondition({
                            minWidth: 768,
                            maxWidth: 1279
                        }),
                        minScreenWidth: 768
                    },
                    {
                        width: 420,
                        height: 280,
                        proportion: '3:2',
                        media_preload: setMediaCondition({
                            maxWidth: 767
                        })
                    }
                ]
            },
            credits: creditsSizes
        },
        T1: {
            promo_items: {
                sizes: [
                    {
                        width: 488,
                        height: 325,
                        minScreenWidth: 768,
                        media_preload: setMediaCondition({ minWidth: 768 }),
                        proportion: '3:2'
                    },
                    {
                        width: 420,
                        height: 280,
                        media_preload: setMediaCondition({ maxWidth: 767 }),
                        proportion: '3:2'
                    }
                ]
            },
            credits: creditsSizes
        },
        T1Focal100: {
            promo_items: {
                sizes: [
                    {
                        width: 510,
                        height: 510,
                        maxScreenWidth: 511,
                        media_preload: setMediaCondition({
                            maxWidth: 511
                        }),
                        proportion: '1:1'
                    },
                    {
                        width: 765,
                        height: 510,
                        minScreenWidth: 512,
                        media_preload: setMediaCondition({
                            minWidth: 512,
                            maxWidth: 767
                        }),
                        proportion: '3:2'
                    },
                    {
                        height: 395,
                        width: 342,
                        minScreenWidth: 768,
                        media_preload: setMediaCondition({
                            minWidth: 768,
                            maxWidth: 1023
                        }),
                        proportion: '3:2'
                    },
                    {
                        height: 423,
                        width: 635,
                        minScreenWidth: 1024,
                        media_preload: setMediaCondition({ minWidth: 1024 }),
                        proportion: '3:2'
                    }
                ]
            },
            credits: creditsSizes
        },
        ranking: {
            promo_items: {
                sizes: [
                    {
                        width: 126,
                        height: 126,
                        proportion: '1:1',
                        media: minWidth320,
                        media_preload: minWidth320
                    }
                ]
            }
        },
        ctr: {
            promo_items: {
                sizes: [
                    {
                        width: 80,
                        height: 80,
                        useFullSize: true
                    }
                ]
            }
        },
        webStories: {
            promo_items: {
                sizes: [
                    {
                        width: 280,
                        height: 373,
                        proportion: '2:3',
                        maxScreenWidth: 767
                    },
                    {
                        width: 220,
                        height: 293,
                        proportion: '2:3'
                    }
                ]
            }
        },
        cardCoverT1: {
            promo_items: {
                sizes: [
                    {
                        width: 280,
                        height: 280,
                        minScreenWidth: 768,
                        useFullSize: true
                    },
                    {
                        width: 144,
                        height: 144,
                        useFullSize: true
                    }
                ]
            }
        },
        cardCoverDefault: {
            promo_items: {
                sizes: [
                    {
                        width: 100,
                        height: 100,
                        useFullSize: true
                    }
                ]
            }
        },
        default: [
            {
                width: 1033,
                height: 768,
                media: minWidth768,
                class: 'img-desktop',
                media_preload: minWidth768
            }
        ]
    }
};
