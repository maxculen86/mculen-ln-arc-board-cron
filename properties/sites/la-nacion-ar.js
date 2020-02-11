export default {
    title: 'LA NACION',
    className: {
        body: 'ln'
    },
    host: 'https://www.lanacion.com.ar',
    scripts: {
        GTM: {
            props: { id: 'GTM-GHV6' },
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
        }
    },
    imageConfig: {
        resize: {
            nota: {
                bySubtype: {
                    7: {
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
                                        height: '853.33',
                                        width: '1280'
                                    },
                                    vertical: {
                                        width: '853.33',
                                        height: '1280'
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
                            content_elements: {}
                        }
                    },
                    default: {
                        promo_items: {
                            sizes: [
                                {
                                    width: 1033,
                                    height: 768,
                                    media: '(min-width: 768px)',
                                    class: 'img-desktop'
                                }
                            ]
                        },
                        content_elements: {
                            sizes: [
                                {
                                    width: 1033,
                                    height: 768,
                                    media: '(min-width: 768px)',
                                    class: 'img-desktop'
                                }
                            ]
                        }
                    }
                }
            },
            notaM: [
                {
                    width: 600,
                    height: 300,
                    media: '(min-width: 64em)'
                },
                {
                    width: 520,
                    height: 200,
                    media: '(min-width: 48em)'
                },
                {
                    width: 375,
                    height: 100,
                    media: '(min-width: 20em)'
                }
            ]
        }
    },
    bannerConfig: {
        dfp_id: 133919216
    },
    shareConfig: {
        facebook: {
            appID: '272582409596628'
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
