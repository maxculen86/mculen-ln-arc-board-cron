export default {
    title: 'LA NACION',
    className: {
        body: 'ln'
    },
    host: 'https://www.lanacion.com.ar',
    loggerOn: true,
    loggerExcludedErrors: [404, 301, 302],
    scripts: {
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
            props: { config: { c1: '2', c2: '6906398' } },
            location: ['head']
        },
        Livefyre: {
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
    cajaTemaCss: {
        focalLeft3: '--focal --left',
        focalRight3: '--focal --right',
        notaColorAzul3: '--highlight --blue',
        notaColorRojo3: '--highlight --red',
        notaColorRosa3: '--highlight --pink',
        notaColorVerde3: '--highlight --teal',
        author3: '',
        grilla1: '--cinema',
        grilla3: '',
        grilla6: '',
        grilla9: ''
    }
};
