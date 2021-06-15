export default {
    longTitle: 'Últimas noticias de Argentina y el mundo - LA NACION',
    title: 'LA NACION',
    description:
        'Todas las noticias de Argentina y el mundo: últimas noticias en actualidad, deportes, coronavirus, economía, política, y tecnología. Mantenete informado sobre las novedades de Argentina en LA NACION.',
    className: {
        body: 'ln'
    },
    host: 'https://www.lanacion.com.ar',
    loggerOn: true,
    loggerExcludedErrors: [404, 301, 302],
    scripts: {
        Datadog: { props: {}, location: ['head'] },
        ScriptVideoPowa: {
            props: {},
            location: ['head']
        },
        GTM: {
            props: { id: 'GTM-GHV6', idAMP: 'GTM-PRT86FH' },
            location: ['head', 'body-top']
        },
        PostBid: {
            props: {},
            location: ['head']
        },
        ArcAds: {
            props: {},
            location: ['head']
        },
        Pwa: {
            props: {},
            location: ['body-bottom']
        },
        FacebookSDK: {
            props: {},
            location: ['head']
        },
        Comscore: {
            props: { config: { c1: '2', c2: '6906398' } },
            location: ['head']
        },
        Livefyre: {
            props: {},
            location: ['head']
        },
        Petametrics: {
            props: {},
            location: ['head']
        },
        NewsMediaOrganization: {
            props: {},
            location: ['head']
        },
        LivefyreCommentCount: {
            props: {},
            location: ['head']
        },
        LiftIgniter: {
            props: {},
            location: ['body-top']
        },
        GooglePublisherTag: {
            props: {},
            location: ['head']
        },
        GooglePublisherTagAcumulado: {
            props: {},
            location: ['head']
        },
        SocialEmbeds: {
            props: {},
            location: ['body-top']
        },
        OptaEmbed: {
            props: {},
            location: ['head']
        },
        ScriptHtmlLibre: {
            props: {},
            location: ['head']
        },
        Queryly: {
            props: {},
            location: ['body-bottom']
        }
    },
    imageConfig: {
        resize: {
            bomba: {
                promo_items: {
                    sizes: [
                        {
                            width: 1920,
                            height: 1280,
                            media: '(min-width: 1920px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 1280,
                            height: 854,
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 1024,
                            height: 682,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 375,
                            height: 562,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '2:3'
                        },
                        {
                            width: 320,
                            height: 480,
                            media: '(min-width: 320px)',
                            useFullSize: true,
                            proportion: '2:3'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 1920,
                            height: 1280,
                            media: '(min-width: 1920px)'
                        },
                        {
                            width: 1280,
                            height: 854,
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 1024,
                            height: 682,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 375,
                            height: 562,
                            media: '(min-width: 375px)'
                        },
                        {
                            width: 320,
                            height: 480,
                            media: '(min-width: 320px)'
                        }
                    ]
                }
            },
            featuredFocalIzquierdo: {
                promo_items: {
                    sizes: [
                        {
                            width: 560,
                            height: 373,
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 637,
                            height: 424,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 465,
                            height: 310,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 375,
                            height: 250,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '2:3'
                        },
                        {
                            width: 320,
                            height: 213,
                            media: '(min-width: 320px)',
                            useFullSize: true,
                            proportion: '2:3'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 560,
                            height: 373,
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 637,
                            height: 424,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 465,
                            height: 310,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 375,
                            height: 250,
                            media: '(min-width: 375px)'
                        },
                        {
                            width: 320,
                            height: 213,
                            media: '(min-width: 320px)'
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
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 316,
                            height: 210,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 231,
                            height: 154,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 375,
                            height: 229,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '2:3'
                        },
                        {
                            width: 320,
                            height: 192,
                            media: '(min-width: 320px)',
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
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 316,
                            height: 210,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 231,
                            height: 154,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 375,
                            height: 229,
                            media: '(min-width: 375px)'
                        },
                        {
                            width: 320,
                            height: 192,
                            media: '(min-width: 320px)'
                        }
                    ]
                }
            },
            featuredFocalDerecho: {
                promo_items: {
                    sizes: [
                        {
                            width: 595,
                            height: 399,
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 635,
                            height: 424,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 465,
                            height: 311,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 375,
                            height: 229,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '2:3'
                        },
                        {
                            width: 320,
                            height: 192,
                            media: '(min-width: 320px)',
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
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 316,
                            height: 210,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 231,
                            height: 154,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 375,
                            height: 229,
                            media: '(min-width: 375px)'
                        },
                        {
                            width: 320,
                            height: 192,
                            media: '(min-width: 320px)'
                        }
                    ]
                }
            },
            //solo se visualiza imagen en mobile
            mediumFocalDerecho: {
                promo_items: {
                    sizes: [
                        {
                            width: 375,
                            height: 229,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '2:3'
                        },
                        {
                            width: 320,
                            height: 192,
                            media: '(min-width: 320px)',
                            useFullSize: true,
                            proportion: '2:3'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 375,
                            height: 229,
                            media: '(min-width: 375px)'
                        },
                        {
                            width: 320,
                            height: 192,
                            media: '(min-width: 320px)'
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
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 403,
                            height: 270,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 297,
                            height: 200,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 375,
                            height: 229,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 320,
                            height: 192,
                            media: '(min-width: 320px)',
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
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 403,
                            height: 270,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 297,
                            height: 200,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 375,
                            height: 229,
                            media: '(min-width: 375px)'
                        },
                        {
                            width: 320,
                            height: 192,
                            media: '(min-width: 320px)'
                        }
                    ]
                },
                credits: {
                    sizes: [
                        {
                            width: 80,
                            height: 80,
                            media: '(min-width: 320px)'
                        }
                    ]
                }
            },
            boxArticlesSingleArticle: {
                promo_items: {
                    sizes: [
                        {
                            width: 1250,
                            height: 500,
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '5:2'
                        },
                        {
                            width: 1024,
                            height: 682,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '5:2'
                        },
                        {
                            width: 736,
                            height: 294,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '5:2'
                        },
                        {
                            width: 375,
                            height: 429,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '3:4'
                        },
                        {
                            width: 320,
                            height: 360,
                            media: '(min-width: 320px)',
                            useFullSize: true,
                            proportion: '3:4'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 1250,
                            height: 500,
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 1024,
                            height: 682,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 736,
                            height: 294,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 375,
                            height: 429,
                            media: '(min-width: 375px)'
                        },
                        {
                            width: 320,
                            height: 360,
                            media: '(min-width: 320px)'
                        }
                    ]
                }
            },
            boxArticlesTwoArticles: {
                promo_items: {
                    sizes: [
                        {
                            width: 449,
                            height: 300,
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 486,
                            height: 325,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 358,
                            height: 240,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 375,
                            height: 250,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 320,
                            height: 213,
                            media: '(min-width: 320px)',
                            useFullSize: true,
                            proportion: '3:2'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 449,
                            height: 300,
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 486,
                            height: 325,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 358,
                            height: 240,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 375,
                            height: 250,
                            media: '(min-width: 375px)'
                        },
                        {
                            width: 320,
                            height: 213,
                            media: '(min-width: 320px)'
                        }
                    ]
                }
            },
            boxArticles: {
                promo_items: {
                    sizes: [
                        {
                            width: 298,
                            height: 200,
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 318,
                            height: 213,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 233,
                            height: 159,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 375,
                            height: 250,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 320,
                            height: 213,
                            media: '(min-width: 320px)',
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
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 318,
                            height: 213,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 233,
                            height: 159,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 375,
                            height: 250,
                            media: '(min-width: 375px)'
                        },
                        {
                            width: 320,
                            height: 213,
                            media: '(min-width: 320px)'
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
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '3:4'
                        },
                        {
                            width: 320,
                            height: 400,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:4'
                        },
                        {
                            width: 245,
                            height: 293,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:4'
                        },
                        {
                            width: 375,
                            height: 229,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '3:4'
                        },
                        {
                            width: 320,
                            height: 192,
                            media: '(min-width: 320px)',
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
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 320,
                            height: 400,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 245,
                            height: 293,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 375,
                            height: 229,
                            media: '(min-width: 375px)'
                        },
                        {
                            width: 320,
                            height: 192,
                            media: '(min-width: 320px)'
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
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 1200,
                            height: 800,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 1023,
                            height: 682,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '(min-width: 360px)'
                        },
                        {
                            width: 360,
                            height: 240,
                            media: '(min-width: 320px)'
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
                            media: '(min-width: 1024px)'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 278,
                            height: 186,
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 344,
                            height: 230,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 768,
                            height: 513,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 350,
                            height: 234,
                            media: '(min-width: 360px)'
                        },
                        {
                            width: 360,
                            height: 234,
                            media: '(min-width: 320px)'
                        }
                    ]
                },
                credits: {
                    sizes: [
                        {
                            width: 80,
                            height: 80,
                            media: '(min-width: 320px)'
                        }
                    ]
                }
            },
            fotoAl100: {
                promo_items: {
                    sizes: [
                        {
                            width: 1920,
                            height: 1280,
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 1200,
                            height: 800,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 1023,
                            height: 682,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 768,
                            height: 1152,
                            media: '(min-width: 360px)',
                            useFullSize: true,
                            proportion: '2:3'
                        },
                        {
                            width: 360,
                            height: 540,
                            media: '(min-width: 320px)',
                            useFullSize: true,
                            proportion: '2:3'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 1920,
                            height: 1280,
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 1200,
                            height: 800,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 1023,
                            height: 682,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2'
                        },
                        {
                            width: 768,
                            height: 1152,
                            media: '(min-width: 360px)',
                            useFullSize: true,
                            proportion: '2:3'
                        },
                        {
                            width: 360,
                            height: 540,
                            media: '(min-width: 320px)',
                            useFullSize: true,
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
                            media: '(min-width: 1280px)',
                            proportion: '3:2'
                        },
                        {
                            width: 1200,
                            height: 800,
                            media: '(min-width: 1024px)',
                            proportion: '3:2'
                        },
                        {
                            width: 1023,
                            height: 682,
                            media: '(min-width: 768px)',
                            proportion: '3:2'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '(min-width: 360px)',
                            proportion: '3:2'
                        },
                        {
                            width: 360,
                            height: 240,
                            media: '(min-width: 320px)',
                            proportion: '3:2'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 1920,
                            height: 850,
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 1200,
                            height: 515,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 1024,
                            height: 579,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 768,
                            height: 432,
                            media: '(min-width: 360px)'
                        },
                        {
                            width: 360,
                            height: 203,
                            media: '(min-width: 320px)'
                        }
                    ]
                },
                credits: {
                    sizes: [
                        {
                            width: 80,
                            height: 80,
                            media: '(min-width: 320px)'
                        }
                    ]
                }
            },
            xl: {
                promo_items: {
                    sizes: [
                        {
                            width: 879,
                            height: 586,
                            media: '(min-width: 1280px)',
                            proportion: '3:2'
                        },
                        {
                            width: 1119,
                            height: 746,
                            media: '(min-width: 1024px)',
                            proportion: '3:2'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '(min-width: 768px)',
                            proportion: '3:2'
                        },
                        {
                            width: 351,
                            height: 234,
                            media: '(min-width: 360px)',
                            proportion: '3:2'
                        },
                        {
                            width: 309,
                            height: 206,
                            media: '(min-width: 320px)',
                            proportion: '3:2'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 878,
                            height: 585,
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 1120,
                            height: 400,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 768,
                            height: 961,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 350,
                            height: 438,
                            media: '(min-width: 360px)'
                        },
                        {
                            width: 310,
                            height: 203,
                            media: '(min-width: 320px)'
                        }
                    ]
                },
                credits: {
                    sizes: [
                        {
                            width: 80,
                            height: 80,
                            media: '(min-width: 320px)'
                        }
                    ]
                }
            },
            l: {
                promo_items: {
                    sizes: [
                        {
                            width: 879,
                            height: 586,
                            media: '(min-width: 1280px)',
                            proportion: '3:2'
                        },
                        {
                            width: 1119,
                            height: 746,
                            media: '(min-width: 1024px)',
                            proportion: '3:2'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '(min-width: 768px)',
                            proportion: '3:2'
                        },
                        {
                            width: 351,
                            height: 234,
                            media: '(min-width: 360px)',
                            proportion: '3:2'
                        },
                        {
                            width: 309,
                            height: 206,
                            media: '(min-width: 320px)',
                            proportion: '3:2'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 879,
                            height: 586,
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 690,
                            height: 465,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 768,
                            height: 513,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 350,
                            height: 438,
                            media: '(min-width: 360px)'
                        },
                        {
                            width: 310,
                            height: 203,
                            media: '(min-width: 320px)'
                        }
                    ]
                },
                credits: {
                    sizes: [
                        {
                            width: 80,
                            height: 80,
                            media: '(min-width: 320px)'
                        }
                    ]
                }
            },
            m: {
                promo_items: {
                    sizes: [
                        {
                            width: 360,
                            height: 240,
                            media: '(min-width: 1024px)',
                            proportion: '3:2'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '(min-width: 768px)',
                            proportion: '3:2'
                        },
                        {
                            width: 351,
                            height: 234,
                            media: '(min-width: 360px)',
                            proportion: '3:2'
                        },
                        {
                            width: 360,
                            height: 240,
                            media: '(min-width: 320px)',
                            proportion: '3:2'
                        }
                    ]
                },
                content_elements: {
                    sizes: [
                        {
                            width: 278,
                            height: 186,
                            media: '(min-width: 1280px)'
                        },
                        {
                            width: 344,
                            height: 230,
                            media: '(min-width: 1024px)'
                        },
                        {
                            width: 768,
                            height: 513,
                            media: '(min-width: 768px)'
                        },
                        {
                            width: 350,
                            height: 234,
                            media: '(min-width: 360px)'
                        },
                        {
                            width: 360,
                            height: 234,
                            media: '(min-width: 320px)'
                        }
                    ]
                },
                credits: {
                    sizes: [
                        {
                            width: 80,
                            height: 80,
                            media: '(min-width: 320px)'
                        }
                    ]
                }
            },
            default: [
                {
                    width: 1033,
                    height: 768,
                    media: '(min-width: 768px)',
                    class: 'img-desktop'
                }
            ]
        }
    },
    bannerConfig: {
        dfp_id: 133919216
    },
    shareConfig: {
        facebook: {
            appID: '205326199490321'
        }
    },
    livefyre: {
        siteId: '356483',
        recetas: {
            siteId: '362870',
            sharedKey: 'DsbAQWcjxhc0MSBNnQnlcbs8ZC8='
        },
        sharedKey: 'Wi9J9hmEtpK9QRp5nY1SSSQ2FKE=',
        network: 'la-nacion.fyre.co'
    },
    firebase: {
        apiKey: 'AIzaSyCFxG5eKZiyU1DDlg7yZw4JzblfO6pc0m4',
        authDomain: 'lanacion-92a91.firebaseapp.com',
        databaseURL: 'https://lanacion-92a91.firebaseio.com',
        messagingSenderId: '221085116662',
        projectId: 'lanacion-92a91',
        storageBucket: 'lanacion-92a91.appspot.com'
    },
    loginUrl: '//qa-ingresar.lanacion.com.ar/ingresar/D/1/?callback=',
    logoutUrl: '/logout.html',
    lifigniter: {
        clientId: '8561ps8ov66e7mim'
    },
    sliderConfig: [
        {
            name: 'default',
            lowerRange: null,
            topRange: null,
            pageSize: 1
        }
    ],
    optaConfig: {
        subscription_id: '2f9d4a3fdc61653e686a4be85a25e1ac',
        language: 'es_CO',
        timezone: 'America/Buenos_Aires'
    },
    cajaTemaConfig: {
        focalLeft3: {
            className: '--focal --left',
            articles: {
                0: {
                    titleSize: '--xl',
                    titleTagApertura: 'h1',
                    subheadTagApertura: 'h2',
                    withSubheadAndMedia: true,
                    withSubhead: true,
                    imageConfig: 'featuredFocalIzquierdo'
                },
                1: {
                    titleSize: '--xs',
                    withSubheadAndMedia: false,
                    imageConfig: 'mediumFocalIzquierdo'
                },
                2: {
                    titleSize: '--xs',
                    withSubheadAndMedia: false,
                    imageConfig: 'mediumFocalIzquierdo'
                }
            }
        },
        focalRight2: {
            className: '--focal --right',
            articles: {
                0: {
                    titleSize: '--l',
                    withSubheadAndMedia: true,
                    imageConfig: 'featuredFocalDerecho'
                },
                1: {
                    titleSize: '--xl',
                    titleTagApertura: 'h1',
                    subheadTagApertura: 'h2',
                    withSubheadAndMedia: true,
                    imageConfig: 'mediumFocalDerecho',
                    withSubhead: true
                }
            }
        },
        notaColorRosa3: {
            className: '--highlight --pink',
            articles: {
                0: { imageConfig: 'boxArticlesVerticalArticles' },
                1: { imageConfig: 'boxArticlesVerticalArticles' },
                2: { imageConfig: 'boxArticlesVerticalArticles' }
            }
        },
        notaColorVerde3: {
            className: '--highlight --teal',
            articles: {
                0: { imageConfig: 'boxArticlesVerticalArticles' },
                1: { imageConfig: 'boxArticlesVerticalArticles' },
                2: { imageConfig: 'boxArticlesVerticalArticles' }
            }
        },
        author3: {
            className: '',
            articles: {
                0: { imageConfig: 'boxArticlesVerticalArticles' },
                1: { imageConfig: 'boxArticlesVerticalArticles' },
                2: { imageConfig: 'boxArticlesVerticalArticles' }
            }
        },
        grilla1: {
            className: '--cinema',
            articles: {
                0: {
                    titleSize: '--l',
                    skipRenderAuthor: true,
                    skipHtml: true,
                    skipSubhead: true,
                    imageConfig: 'boxArticlesSingleArticle'
                }
            }
        },
        grilla2: {
            className: '',
            articles: {
                0: { titleSize: '--l', imageConfig: 'boxArticlesTwoArticles' },
                1: { titleSize: '--l', imageConfig: 'boxArticlesTwoArticles' }
            }
        },
        grilla3: {
            className: '',
            articles: {
                0: {
                    titleSizeNoMedia: '--m',
                    imageConfig: 'boxArticles'
                },
                1: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                2: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' }
            }
        },
        grilla6: {
            className: '',
            articles: {
                0: {
                    titleSizeNoMedia: '--m',
                    imageConfig: 'boxArticles'
                },
                1: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                2: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                3: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                4: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                5: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' }
            }
        },
        grilla9: {
            className: '',
            articles: {
                0: {
                    titleSizeNoMedia: '--m',
                    imageConfig: 'boxArticles'
                },
                1: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                2: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                3: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                4: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                5: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                6: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                7: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
                8: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' }
            }
        },
        bomba1: {
            className: '--bomba',
            articles: {
                0: {
                    titleSize: '--threexl',
                    titleTagApertura: 'h1',
                    subheadTagApertura: 'h2',
                    withSubheadAndMedia: true,
                    imageConfig: 'bomba'
                }
            }
        },
        opinion4: {
            className: '--opinion',
            articles: {
                0: {
                    titleSize: '--l',
                    withChapita: true,
                    imageConfig: 'featuredOpinion'
                },
                1: {
                    titleSize: '--xs',
                    authorSize: '--fourxs',
                    isRenderAuthorOpinion: true,
                    imageConfig: 'featuredOpinion'
                },
                2: {
                    titleSize: '--xs',
                    authorSize: '--fourxs',
                    isRenderAuthorOpinion: true,
                    imageConfig: 'featuredOpinion'
                },
                3: {
                    titleSize: '--l',
                    authorSize: '--fourxs',
                    isRenderAuthorOpinion: true,
                    imageConfig: 'featuredOpinion'
                }
            }
        },
        editoriales2: {
            className: '--editoriales',
            headerSize: '--twoxs',
            articles: {
                0: {
                    titleSize: '--twoxs'
                },
                1: {
                    titleSize: '--twoxs'
                }
            }
        }
    },
    layoutsName: {
        Home: 'LN-Home_Main'
    }
};
