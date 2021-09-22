const targetingNota = {
    sitio: 'lanacion',
    seccion: 'nota'
};
const targetingAcumulado = {
    sitio: 'lanacion',
    seccion: 'acumulado'
};
const targetingHome = {
    sitio: 'lanacion',
    seccion: 'home'
};

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
        AmazonPublisherServices: {
            props: {},
            location: ['head']
        },
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
        FacebookSDK: {
            props: {},
            location: ['head']
        },
        Comscore: {
            props: {
                config: {
                    c1: '2',
                    c2: '6906398',
                    c3: 'LANACION.COM.AR',
                    c4: '*null',
                    c6: '*null'
                }
            },
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
        ScriptSWG: {
            props: {},
            location: ['body-bottom']
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
                            proportion: '3:2',
                            media_preload: '(min-width: 1920.1px)'
                        },
                        {
                            width: 1280,
                            height: 854,
                            media: '(min-width: 1280px)',
                            useFullSize: true,
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 1280.1px and max-width: 1920px)'
                        },
                        {
                            width: 1024,
                            height: 682,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 1024.1px and max-width: 1280px)'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 768.1px and max-width: 1024px)'
                        },
                        {
                            width: 375,
                            height: 562,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '2:3',
                            media_preload:
                                '(min-width: 375.1px and max-width: 768px)'
                        },
                        {
                            width: 320,
                            height: 480,
                            media: '(min-width: 320px)',
                            useFullSize: true,
                            proportion: '2:3',
                            media_preload: '(max-width: 375px)'
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
                            proportion: '3:2',
                            media_preload: '(min-width: 1280.1px)'
                        },
                        {
                            width: 637,
                            height: 424,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 1024.1px and max-width: 1280px)'
                        },
                        {
                            width: 465,
                            height: 310,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 768.1px and max-width: 1024px)'
                        },
                        {
                            width: 375,
                            height: 250,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '2:3',
                            media_preload:
                                '(min-width: 375.1px and max-width: 768px)'
                        },
                        {
                            width: 320,
                            height: 213,
                            media: '(min-width: 320px)',
                            useFullSize: true,
                            proportion: '2:3',
                            media_preload: '(max-width: 375px)'
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
                            proportion: '3:2',
                            media_preload: '(min-width: 1280.1px)'
                        },
                        {
                            width: 635,
                            height: 424,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 1024.1px and max-width: 1280px)'
                        },
                        {
                            width: 465,
                            height: 311,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 768.1px and max-width: 1024px)'
                        },
                        {
                            width: 375,
                            height: 229,
                            media: '(min-width: 375px)',
                            useFullSize: true,
                            proportion: '2:3',
                            media_preload:
                                '(min-width: 375.1px and max-width: 768px)'
                        },
                        {
                            width: 320,
                            height: 192,
                            media: '(min-width: 320px)',
                            useFullSize: true,
                            proportion: '2:3',
                            media_preload: '(max-width: 375px)'
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
            // solo se visualiza imagen en mobile
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
                            proportion: '3:2',
                            media_preload: '(min-width: 1280.1px)'
                        },
                        {
                            width: 1200,
                            height: 800,
                            media: '(min-width: 1024px)',
                            useFullSize: true,
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 1024.1px and max-width: 1280px)'
                        },
                        {
                            width: 1023,
                            height: 682,
                            media: '(min-width: 768px)',
                            useFullSize: true,
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 768.1px and max-width: 1024px)'
                        },
                        {
                            width: 768,
                            height: 1152,
                            media: '(min-width: 360px)',
                            useFullSize: true,
                            proportion: '2:3',
                            media_preload:
                                '(min-width: 375.1px and max-width: 768px)'
                        },
                        {
                            width: 360,
                            height: 540,
                            media: '(min-width: 320px)',
                            useFullSize: true,
                            proportion: '2:3',
                            media_preload: '(max-width: 375px)'
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
                            proportion: '3:2',
                            media_preload: '(min-width: 1280.1px)'
                        },
                        {
                            width: 1200,
                            height: 800,
                            media: '(min-width: 1024px)',
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 1024.1px and max-width: 1280px)'
                        },
                        {
                            width: 1023,
                            height: 682,
                            media: '(min-width: 768px)',
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 768.1px and max-width: 1024px)'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '(min-width: 375px)',
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 375.1px and max-width: 768px)'
                        },
                        {
                            width: 360,
                            height: 240,
                            media: '(min-width: 320px)',
                            proportion: '3:2',
                            media_preload: '(max-width: 375px)'
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
                            proportion: '3:2',
                            media_preload: '(min-width: 1280.1px)'
                        },
                        {
                            width: 1119,
                            height: 746,
                            media: '(min-width: 1024px)',
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 1024.1px and max-width: 1280px'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '(min-width: 768px)',
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 768.1px and max-width: 1024px)'
                        },
                        {
                            width: 351,
                            height: 234,
                            media: '(min-width: 375px)',
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 375.1px and max-width: 768px)'
                        },
                        {
                            width: 309,
                            height: 206,
                            media: '(min-width: 320px)',
                            proportion: '3:2',
                            media_preload: '(max-width: 375px)'
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
                            media: '(-width: 320px)'
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
                            proportion: '3:2',
                            media_preload: '(min-width: 1280.1px)'
                        },
                        {
                            width: 1119,
                            height: 746,
                            media: '(min-width: 1024px)',
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 1024.1px and max-width: 1280px)'
                        },
                        {
                            width: 768,
                            height: 512,
                            media: '(min-width: 768px)',
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 768.1px and max-width: 1024px)'
                        },
                        {
                            width: 351,
                            height: 234,
                            media: '(min-width: 375px)',
                            proportion: '3:2',
                            media_preload:
                                '(min-width: 375.1px and max-width: 768px)'
                        },
                        {
                            width: 309,
                            height: 206,
                            media: '(min-width: 320px)',
                            proportion: '3:2',
                            media_preload: '(max-width: 375px)'
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
                    class: 'img-desktop',
                    media_preload: '(min-width: 768px)'
                }
            ]
        }
    },
    bannerConfig: {
        dfp_id: 133919216,
        nota: {
            desktop: {
                adhesion_dsk: {
                    slotName: 'la_nacion_desktop/Nota/adhesion_dsk',
                    dimensions: [
                        [728, 90],
                        [920, 100]
                    ],
                    targeting: targetingNota,
                    closeButton: true
                },
                megatop_dsk: {
                    slotName: 'la_nacion_desktop/Nota/megatop_dsk',
                    dimensions: [[800, 600]],
                    targeting: targetingNota
                },
                '1x1_dsk': {
                    slotName: 'la_nacion_desktop/Nota/1x1_dsk',
                    dimensions: [[1, 1]],
                    targeting: targetingNota
                },
                cabezal_dsk: {
                    slotName: 'la_nacion_desktop/Nota/cabezal_dsk',
                    withoutHide: true,
                    dimensions: [
                        [1, 1],
                        [728, 90],
                        [920, 100],
                        [920, 170],
                        [970, 90],
                        [1260, 100],
                        [1260, 170]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja1_dsk: {
                    slotName: 'la_nacion_desktop/Nota/caja1_dsk',
                    withoutHide: true,
                    dimensions: [
                        [300, 600],
                        [300, 250]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja2_dsk: {
                    slotName: 'la_nacion_desktop/Nota/caja2_dsk',
                    withoutHide: true,
                    dimensions: [[300, 250]],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja3_dsk: {
                    slotName: 'la_nacion_desktop/Nota/caja3_dsk',
                    withoutHide: true,
                    dimensions: [
                        [300, 600],
                        [300, 250]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja4_dsk: {
                    slotName: 'la_nacion_desktop/Nota/caja4_dsk',
                    withoutHide: true,
                    dimensions: [
                        [300, 600],
                        [300, 250]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja5_dsk: {
                    slotName: 'la_nacion_desktop/Nota/caja5_dsk',
                    withoutHide: true,
                    dimensions: [[300, 250]],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                inread_dsk: {
                    slotName: 'la_nacion_desktop/Nota/inread_dsk',
                    dimensions: [
                        [1, 1],
                        [728, 90]
                    ],
                    targeting: targetingNota
                },
                middle_1_dsk: {
                    slotName: 'la_nacion_desktop/Nota/middle_1_dsk',
                    withoutHide: true,
                    dimensions: [
                        [1, 1],
                        [640, 360],
                        [640, 480],
                        [728, 90],
                        [468, 60]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                middle_2_dsk: {
                    slotName: 'la_nacion_desktop/Nota/middle_2_dsk',
                    withoutHide: true,
                    dimensions: [
                        [468, 60],
                        [640, 480],
                        [728, 90],
                        [1, 1]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                middle_3_dsk: {
                    slotName: 'la_nacion_desktop/Nota/middle_3_dsk',
                    withoutHide: true,
                    dimensions: [
                        [728, 90],
                        [640, 480],
                        [468, 60],
                        [1, 1]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                middle_teads_dsk: {
                    slotName: 'la_nacion_desktop/Nota/middle_teads_dsk',
                    dimensions: [
                        [1, 1],
                        [728, 90]
                    ],
                    targeting: targetingNota
                },
                comercial_dsk: {
                    slotName: 'la_nacion_desktop/Nota/comercial_dsk',
                    dimensions: [
                        [1, 1],
                        [800, 600]
                    ],
                    targeting: targetingNota,
                    closeButton: true
                }
            },
            mobile: {
                adhesion_mob: {
                    slotName: 'la_nacion_mobile/Nota/adhesion_mob',
                    dimensions: [[320, 50]],
                    targeting: targetingNota,
                    closeButton: true
                },
                megatop_mob: {
                    slotName: 'la_nacion_mobile/Nota/megatop_mob',
                    dimensions: [[320, 480]],
                    targeting: targetingNota
                },
                '1x1_mob': {
                    slotName: 'la_nacion_mobile/Nota/1x1_mob',
                    dimensions: [[1, 1]],
                    targeting: targetingNota
                },
                sticky1_mob: {
                    slotName: 'la_nacion_mobile/Nota/sticky1_mob',
                    dimensions: [[320, 100]],
                    targeting: targetingNota,
                    withoutHide: true,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                sticky2_mob: {
                    slotName: 'la_nacion_mobile/Nota/sticky2_mob',
                    dimensions: [[320, 50]],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja1_mob: {
                    slotName: 'la_nacion_mobile/Nota/caja1_mob',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [300, 450],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja2_mob: {
                    slotName: 'la_nacion_mobile/Nota/caja2_mob',
                    withoutHide: true,
                    dimensions: [
                        [1, 1],
                        [300, 250],
                        [300, 450],
                        [320, 50],
                        [320, 100],
                        [320, 180],
                        [360, 270]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja3_mob: {
                    slotName: 'la_nacion_mobile/Nota/caja3_mob',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja4_mob: {
                    slotName: 'la_nacion_mobile/Nota/caja4_mob',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja5_mob: {
                    slotName: 'la_nacion_mobile/Nota/caja5_mob',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                inread_mob: {
                    slotName: 'la_nacion_mobile/Nota/inread_mob',
                    dimensions: [
                        [1, 1],
                        [320, 50],
                        [300, 250]
                    ],
                    targeting: targetingNota
                },
                comercial_mob: {
                    slotName: 'la_nacion_mobile/Nota/comercial_mob',
                    dimensions: [
                        [1, 1],
                        [320, 480]
                    ],
                    targeting: targetingNota,
                    closeButton: true
                }
            },
            tablet: {
                '1x1_tab': {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/1x1_tab',
                    dimensions: [[1, 1]],
                    targeting: targetingNota
                },
                cabezal_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/cabezal_tab',
                    dimensions: [[728, 90]],
                    targeting: targetingNota,
                    withoutHide: true,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                adhesion_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/adhesion_tab',
                    dimensions: [[728, 90]],
                    targeting: targetingNota,
                    closeButton: true
                },
                caja1_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/caja1_tab',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [300, 600]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja2_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/caja2_tab',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [300, 600]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                caja3_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/caja3_tab',
                    withoutHide: true,
                    dimensions: [
                        [300, 250],
                        [1, 1]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                inread_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/inread_tab',
                    dimensions: [
                        [1, 1],
                        [728, 90]
                    ],
                    targeting: targetingNota
                },
                middle_1_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/middle_1_tab',
                    withoutHide: true,
                    dimensions: [
                        [728, 90],
                        [640, 480],
                        [468, 60],
                        [1, 1]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                middle_2_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/middle_2_tab',
                    withoutHide: true,
                    dimensions: [
                        [728, 90],
                        [640, 480],
                        [468, 60],
                        [1, 1]
                    ],
                    targeting: targetingNota,
                    bidding: {
                        prebid: {
                            enabled: true
                        }
                    }
                },
                middle_teads_tab: {
                    device: 'tab',
                    slotName: 'la_nacion_tablet/Nota/middle_teads_tab',
                    dimensions: [[1, 1]],
                    targeting: targetingNota
                }
            },
            amp: {
                caja1_amp: {
                    slotName: '/133919216/AMP/ROS/caja1_amp',
                    dimensions: [[300, 250]]
                },
                caja2_amp: {
                    slotName: '/133919216/AMP/ROS/caja2_amp',
                    dimensions: [[300, 250]]
                },
                caja3_amp: {
                    slotName: '/133919216/AMP/ROS/caja3_amp',
                    dimensions: [[300, 250]]
                }
            }
        },
        acumulado: {
            desktop: {
                megatop_dsk: {
                    slotName: `la_nacion_desktop/Acumulado/megatop_dsk`,
                    dimensions: [[800, 600]],
                    targeting: targetingAcumulado
                },
                '1x1_dsk': {
                    slotName: `la_nacion_desktop/Acumulado/1x1_dsk`,
                    dimensions: [[1, 1]],
                    targeting: targetingAcumulado
                },
                cabezal_dsk: {
                    slotName: `la_nacion_desktop/Acumulado/cabezal_dsk`,
                    withoutHide: true,
                    dimensions: [
                        [1, 1],
                        [728, 90],
                        [920, 100],
                        [970, 90],
                        [1260, 100]
                    ],
                    targeting: targetingAcumulado
                },
                adhesion_dsk: {
                    slotName: `la_nacion_desktop/Acumulado/adhesion_dsk`,
                    dimensions: [
                        [920, 100],
                        [728, 90]
                    ],
                    targeting: targetingAcumulado
                },
                caja1_dsk: {
                    slotName: `la_nacion_desktop/Acumulado/caja1_dsk`,
                    dimensions: [
                        [300, 600],
                        [300, 250]
                    ],
                    targeting: targetingAcumulado,
                    withoutHide: true
                },
                caja2_dsk: {
                    slotName: `la_nacion_desktop/Acumulado/caja2_dsk`,
                    dimensions: [
                        [300, 250],
                        [300, 250],
                        [300, 250]
                    ],
                    targeting: targetingAcumulado,
                    withoutHide: true
                },
                caja3_dsk: {
                    slotName: `la_nacion_desktop/Acumulado/caja3_dsk`,
                    dimensions: [
                        [300, 600],
                        [300, 250]
                    ],
                    targeting: targetingAcumulado,
                    withoutHide: true
                },
                caja4_dsk: {
                    slotName: `la_nacion_desktop/Acumulado/caja4_dsk`,
                    dimensions: [
                        [300, 600],
                        [300, 250]
                    ],
                    targeting: targetingAcumulado,
                    withoutHide: true
                },
                comercial_dsk: {
                    slotName: `la_nacion_desktop/Acumulado/comercial_dsk`,
                    dimensions: [
                        [1, 1],
                        [800, 600]
                    ],
                    targeting: targetingAcumulado,
                    closeButton: true
                }
            },
            mobile: {
                megatop_mob: {
                    slotName: `la_nacion_mobile/Acumulado/megatop_mob`,
                    dimensions: [[320, 480]],
                    targeting: targetingAcumulado
                },
                sticky1_mob: {
                    slotName: `la_nacion_mobile/Acumulado/sticky1_mob`,
                    withoutHide: true,
                    dimensions: [
                        [320, 50],
                        [320, 100]
                    ],
                    targeting: targetingAcumulado
                },
                sticky2_mob: {
                    slotName: `la_nacion_mobile/Acumulado/sticky2_mob`,
                    withoutHide: true,
                    dimensions: [
                        [300, 50],
                        [320, 50]
                    ],
                    targeting: targetingAcumulado
                },
                adhesion_mob: {
                    slotName: `la_nacion_mobile/Acumulado/adhesion_mob`,
                    dimensions: [[320, 50]],
                    targeting: targetingAcumulado
                },
                caja1_mob: {
                    slotName: `la_nacion_mobile/Acumulado/caja1_mob`,
                    dimensions: [
                        [320, 50],
                        [320, 100],
                        [300, 250],
                        [300, 450],
                        [1, 1]
                    ],
                    targeting: targetingAcumulado,
                    withoutHide: true
                },
                caja2_mob: {
                    slotName: `la_nacion_mobile/Acumulado/caja2_mob`,
                    dimensions: [
                        [360, 270],
                        [320, 50],
                        [320, 100],
                        [300, 250],
                        [300, 450],
                        [1, 1]
                    ],
                    targeting: targetingAcumulado,
                    withoutHide: true
                },
                caja3_mob: {
                    slotName: `la_nacion_mobile/Acumulado/caja3_mob`,
                    dimensions: [
                        [320, 50],
                        [320, 100],
                        [300, 250],
                        [300, 450],
                        [1, 1]
                    ],
                    targeting: targetingAcumulado,
                    withoutHide: true
                },
                caja4_mob: {
                    slotName: `la_nacion_mobile/Acumulado/caja4_mob`,
                    dimensions: [
                        [320, 50],
                        [320, 100],
                        [300, 250],
                        [300, 450],
                        [1, 1]
                    ],
                    targeting: targetingAcumulado,
                    withoutHide: true
                },
                comercial_mob: {
                    slotName: `la_nacion_mobile/Acumulado/comercial_mob`,
                    dimensions: [
                        [1, 1],
                        [320, 480]
                    ],
                    targeting: targetingAcumulado,
                    closeButton: true
                }
            },
            tablet: {
                cabezal_tab: {
                    slotName: `la_nacion_tablet/Acumulado/cabezal_tab`,
                    dimensions: [[728, 90]],
                    targeting: targetingAcumulado,
                    withoutHide: true
                },
                adhesion_tab: {
                    slotName: `la_nacion_tablet/Acumulado/adhesion_tab`,
                    dimensions: [[728, 90]],
                    targeting: targetingAcumulado
                },
                caja1_tab: {
                    slotName: `la_nacion_tablet/Acumulado/caja1_tab`,
                    dimensions: [[728, 90]],
                    targeting: targetingAcumulado,
                    withoutHide: true
                },
                caja2_tab: {
                    slotName: `la_nacion_tablet/Acumulado/caja2_tab`,
                    dimensions: [[728, 90]],
                    targeting: targetingAcumulado,
                    withoutHide: true
                }
            },
            amp: {
                caja1_amp: {
                    slotName: '/133919216/AMP/ROS/caja1_amp',
                    dimensions: [[300, 250]]
                },
                caja2_amp: {
                    slotName: '/133919216/AMP/ROS/caja2_amp',
                    dimensions: [[300, 250]]
                },
                caja3_amp: {
                    slotName: '/133919216/AMP/ROS/caja3_amp',
                    dimensions: [[300, 250]]
                }
            }
        },
        home: {
            desktop: {
                '1x1_dsk': {
                    slotName: `la_nacion_desktop/Home/1x1_dsk`,
                    dimensions: [[1, 1]],
                    targeting: targetingHome
                },
                cabezal_dsk: {
                    slotName: `la_nacion_desktop/Home/cabezal_dsk`,
                    withoutHide: true,
                    dimensions: [
                        [1, 1],
                        [728, 90],
                        [920, 100],
                        [970, 90],
                        [1260, 100]
                    ],
                    targeting: targetingHome
                },
                adhesion_dsk: {
                    slotName: `la_nacion_desktop/Home/adhesion_dsk`,
                    dimensions: [
                        [920, 100],
                        [728, 90],
                        [1, 1]
                    ],
                    targeting: targetingHome
                },
                caja1_dsk: {
                    slotName: `la_nacion_desktop/Home/caja1_dsk`,
                    dimensions: [[300, 250]],
                    targeting: targetingHome
                },
                caja2_dsk: {
                    slotName: `la_nacion_desktop/Home/caja2_dsk`,
                    dimensions: [[300, 250]],
                    targeting: targetingHome
                },
                caja3_dsk: {
                    slotName: `la_nacion_desktop/Home/caja3_dsk`,
                    dimensions: [[300, 250]],
                    targeting: targetingHome
                },
                caja4_dsk: {
                    slotName: `la_nacion_desktop/Home/caja4_dsk`,
                    dimensions: [[300, 250]],
                    targeting: targetingHome
                },
                comercial_dsk: {
                    slotName: `la_nacion_desktop/Home/comercial_dsk`,
                    dimensions: [
                        [1, 1],
                        [800, 600]
                    ],
                    targeting: targetingHome,
                    closeButton: true
                },
                middle1_dsk: {
                    slotName: `la_nacion_desktop/Home/middle1_dsk`,
                    dimensions: [
                        [1, 1],
                        [920, 120],
                        [920, 250],
                        [728, 90]
                    ],
                    targeting: targetingHome
                },
                megalateral_dsk: {
                    slotName: `la_nacion_desktop/Home/megalateral_dsk`,
                    dimensions: [
                        [120, 600],
                        [250, 600],
                        [160, 600],
                        [300, 600]
                    ],
                    targeting: targetingHome
                },
                megalateral2_dsk: {
                    slotName: `la_nacion_desktop/Home/megalateral2_dsk`,
                    dimensions: [
                        [120, 600],
                        [250, 600],
                        [160, 600],
                        [300, 600]
                    ],
                    targeting: targetingHome
                },
                megalateral3_dsk: {
                    slotName: `la_nacion_desktop/Home/megalateral3_dsk`,
                    dimensions: [
                        [120, 600],
                        [250, 600],
                        [160, 600],
                        [300, 600]
                    ],
                    targeting: targetingHome
                },
                billboard_dsk: {
                    slotName: `la_nacion_desktop/Home/billboard_dsk`,
                    dimensions: [
                        [728, 90],
                        [920, 250],
                        [1, 1]
                    ],
                    targeting: targetingHome
                },
                caja_producto1_dsk: {
                    slotName: `la_nacion_desktop/Home/caja_producto1_dsk`,
                    dimensions: [[240, 250]],
                    targeting: targetingHome
                },
                caja_producto2_dsk: {
                    slotName: `la_nacion_desktop/Home/caja_producto2_dsk`,
                    dimensions: [[240, 250]],
                    targeting: targetingHome
                },
                cinturon1_dsk: {
                    slotName: `la_nacion_desktop/Home/cinturon1_dsk`,
                    dimensions: [
                        [1, 1],
                        [728, 90],
                        [920, 120],
                        [920, 250],
                        [920, 300]
                    ],
                    targeting: targetingHome
                },
                cinturon2_dsk: {
                    slotName: `la_nacion_desktop/Home/cinturon2_dsk`,
                    dimensions: [
                        [1, 1],
                        [728, 90],
                        [920, 120],
                        [920, 250],
                        [920, 300]
                    ],
                    targeting: targetingHome
                }
            },
            mobile: {
                sticky2_mob: {
                    slotName: `la_nacion_mobile/Home/sticky2_mob`,
                    dimensions: [
                        [300, 50],
                        [320, 50],
                        [1, 1]
                    ],
                    targeting: targetingHome
                },
                adhesion_mob: {
                    slotName: `la_nacion_mobile/Home/adhesion_mob`,
                    dimensions: [[320, 50]],
                    targeting: targetingHome
                },
                caja1_mob: {
                    slotName: `la_nacion_mobile/Home/caja1_mob`,
                    dimensions: [
                        [320, 50],
                        [300, 250],
                        [300, 450],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: targetingHome
                },
                caja2_mob: {
                    slotName: `la_nacion_mobile/Home/caja2_mob`,
                    dimensions: [
                        [320, 50],
                        [300, 250],
                        [300, 450],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: targetingHome
                },
                caja3_mob: {
                    slotName: `la_nacion_mobile/Home/caja3_mob`,
                    dimensions: [
                        [320, 50],
                        [300, 250],
                        [300, 450],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: targetingHome
                },
                caja4_mob: {
                    slotName: `la_nacion_mobile/Home/caja4_mob`,
                    dimensions: [
                        [320, 50],
                        [300, 250],
                        [300, 450],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: targetingHome
                },
                caja5_mob: {
                    slotName: `la_nacion_mobile/Home/caja5_mob`,
                    dimensions: [
                        [320, 50],
                        [300, 250],
                        [300, 450],
                        [320, 100],
                        [1, 1]
                    ],
                    targeting: targetingHome
                },
                comercial_mob: {
                    slotName: `la_nacion_mobile/Home/comercial_mob`,
                    dimensions: [
                        [1, 1],
                        [320, 480]
                    ],
                    targeting: targetingHome,
                    closeButton: true
                },
                '1x1_mob': {
                    slotName: `la_nacion_mobile/Home/1x1_mob`,
                    dimensions: [[1, 1]],
                    targeting: targetingHome
                }
            },
            tablet: {
                cabezal_tab: {
                    slotName: `la_nacion_tablet/Home/cabezal_tab`,
                    dimensions: [[728, 90]],
                    targeting: targetingHome,
                    withoutHide: true
                },
                middle1_tab: {
                    slotName: `la_nacion_tablet/Home/middle1_tab`,
                    dimensions: [[728, 90]],
                    targeting: targetingHome,
                    withoutHide: true
                },
                middle2_tab: {
                    slotName: `la_nacion_tablet/Home/middle2_tab`,
                    dimensions: [[728, 90]],
                    targeting: targetingHome,
                    withoutHide: true
                },
                adhesion_tab: {
                    slotName: `la_nacion_tablet/Home/adhesion_tab`,
                    dimensions: [[728, 90]],
                    targeting: targetingHome
                },
                caja1_tab: {
                    slotName: `la_nacion_tablet/Home/caja1_tab`,
                    dimensions: [
                        [300, 250],
                        [300, 600]
                    ],
                    targeting: targetingHome
                },
                caja2_tab: {
                    slotName: `la_nacion_tablet/Home/caja2_tab`,
                    dimensions: [[300, 250]],
                    targeting: targetingHome
                },
                caja3_tab: {
                    slotName: `la_nacion_tablet/Home/caja3_tab`,
                    dimensions: [[300, 250]],
                    targeting: targetingHome
                },
                caja4_tab: {
                    slotName: `la_nacion_tablet/Home/caja4_tab`,
                    dimensions: [[300, 250]],
                    targeting: targetingHome
                },
                logo_tag_tab: {
                    slotName: `la_nacion_tablet/Home/logo_tag_tab`,
                    dimensions: [[40, 280]],
                    targeting: targetingHome
                }
            },
            amp: {}
        },
        common: {
            desktop: {
                logo_header_dsk: {
                    slotName: 'la_nacion_desktop/logo_header_dsk',
                    dimensions: [[300, 30]]
                }
            },
            mobile: {
                logo_header_mob: {
                    slotName: 'la_nacion_mobile/logo_header_mob',
                    dimensions: [[170, 17]]
                }
            },
            tablet: {
                logo_header_tab: {
                    slotName: 'la_nacion_tablet/logo_header_tab',
                    dimensions: [[200, 20]]
                }
            }
        }
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
        grillaVideo1: {
            className: '--grilla --video',
            articles: []
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
        Home: 'LN-Home_Main',
        Columnistas: 'LN-acumulado-columnistas'
    },
    notRecommendedSections: ['recetas']
};
