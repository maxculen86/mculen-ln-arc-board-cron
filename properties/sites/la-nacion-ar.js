export default {
    title: 'LA NACION',
    className: {
        body: 'ln'
    },
    host: 'https://www.lanacion.com.ar',
    scripts: {
        GTM: {
            props: { id: 'GTM-GHV6', idAMP: 'GTM-PRT86FH' },
            location: ['head', 'body-top']
        },
        PostBid: {
            props: {},
            location: ['body-top']
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
                            width: 1024,
                            height: 683,
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
            xxl: {
                promo_items: {
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
                            width: 1260,
                            height: 450,
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
                content_elements: {
                    sizes: [
                        {
                            width: 1260,
                            height: 450,
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
                            width: 1280,
                            height: 768,
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
                content_elements: {
                    sizes: [
                        {
                            width: 1280,
                            height: 768,
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
            nota: {
                bySubtype: {
                    7: {
                        Normal: {
                            promo_items: {
                                sizes: [
                                    {
                                        width: 1920,
                                        height: 850,
                                        media: '(min-width: 1280px)'
                                    },
                                    {
                                        width: 1033,
                                        height: 1280,
                                        media: '(min-width: 1024px)'
                                    },
                                    {
                                        width: 1033,
                                        height: 1280,
                                        media: '(min-width: 768px)'
                                    },
                                    {
                                        width: 768,
                                        height: 200,
                                        media: '(min-width: 360px)'
                                    },
                                    {
                                        width: 340,
                                        height: 100,
                                        media: '(min-width: 320px)',
                                        class: 'img-mobile'
                                    }
                                ]
                            },
                            content_elements: {
                                sizes: [
                                    {
                                        width: 768,
                                        height: 200,
                                        media: '(min-width: 740px)',
                                        class: 'img-desktop-sm'
                                    },
                                    {
                                        width: 340,
                                        height: 100,
                                        media: '(min-width: 320px)',
                                        class: 'img-mobile'
                                    }
                                ]
                            },
                            credits: {
                                sizes: []
                            }
                        },
                        Amp: {
                            promo_items: {
                                containerSize: {
                                    horizontal: {
                                        height: 1280,
                                        width: 850
                                    },
                                    vertical: {
                                        width: 850,
                                        height: 1280
                                    }
                                },
                                sizes: [
                                    {
                                        width: 1033,
                                        height: 1280,
                                        class: 'img-desktop'
                                    },
                                    {
                                        width: 768,
                                        height: 200,
                                        class: 'img-desktop-sm'
                                    },
                                    {
                                        width: 340,
                                        height: 100,
                                        class: 'img-mobile'
                                    }
                                ]
                            },
                            content_elements: {
                                sizes: []
                            }
                        }
                    },
                    1: {
                        Normal: {
                            promo_items: {
                                sizes: [
                                    {
                                        width: 1033,
                                        height: 1280,
                                        media: '(min-width: 768px)',
                                        class: 'img-desktop'
                                    },
                                    {
                                        width: 768,
                                        height: 200,
                                        media: '(min-width: 740px)',
                                        class: 'img-desktop-sm'
                                    },
                                    {
                                        width: 340,
                                        height: 100,
                                        media: '(min-width: 320px)',
                                        class: 'img-mobile'
                                    }
                                ]
                            },
                            content_elements: {
                                sizes: [
                                    {
                                        width: 768,
                                        height: 200,
                                        media: '(min-width: 740px)',
                                        class: 'img-desktop-sm'
                                    },
                                    {
                                        width: 340,
                                        height: 100,
                                        media: '(min-width: 320px)',
                                        class: 'img-mobile'
                                    }
                                ]
                            },
                            credits: {
                                sizes: []
                            }
                        },
                        Amp: {
                            promo_items: {
                                containerSize: {
                                    horizontal: {
                                        width: 1280,
                                        height: 850
                                    },
                                    vertical: {
                                        width: 850,
                                        height: 1280
                                    }
                                },
                                sizes: [
                                    {
                                        width: 1033,
                                        height: 1280,
                                        class: 'img-desktop'
                                    },
                                    {
                                        width: 768,
                                        height: 200,
                                        class: 'img-desktop-sm'
                                    },
                                    {
                                        width: 340,
                                        height: 100,
                                        class: 'img-mobile'
                                    }
                                ]
                            },
                            content_elements: {
                                sizes: []
                            }
                        }
                    }
                }
            },
            notaM: {
                promo_items: {
                    sizes: [
                        {
                            width: 600,
                            //height: 300, cambio a 3:2
                            height: 400,
                            media: '(min-width: 64em)'
                        },
                        {
                            width: 520,
                            //height: 200, cambio a 3:2
                            height: 347,
                            media: '(min-width: 48em)'
                        },
                        {
                            width: 375,
                            // height: 100, cambio a 3:2
                            height: 250,
                            media: '(min-width: 20em)'
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
    ]
};
