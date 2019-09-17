export default {
    title: 'LA NACION',
    className: {
        body: 'ln'
    },
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
        }
    },
    imageConfig: {
        resize: {
            nota: {
                bySubtype: {
                    7: {
                        apertura_big: {
                            width: 1033,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            type: 'apertura'
                        },
                        apertura_medium: {
                            width: 768,
                            media: '(min-width: 740px)',
                            class: 'img-desktop-sm',
                            type: 'apertura'
                        },
                        apertura_small: {
                            width: 340,
                            media: '(min-width: 320px)',
                            class: 'img-mobile',
                            type: 'apertura'
                        },
                        cuerpo_medium: {
                            width: 768,
                            media: '(min-width: 740px)',
                            class: 'img-desktop-sm',
                            type: 'cuerpo'
                        },
                        cuerpo_small: {
                            width: 340,
                            media: '(min-width: 320px)',
                            class: 'img-mobile',
                            type: 'cuerpo'
                        }
                    },
                    default: {
                        apertura_big: {
                            width: 1033,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            type: 'apertura'
                        }
                    }
                }
            },
            notaM: {
                desktop: {
                    width: 600,
                    media: '(min-width: 64em)',
                    type: 'apertura'
                },
                tablet: {
                    width: 520,
                    media: '(min-width: 48em)',
                    type: 'apertura'
                },
                mobile: {
                    width: 375,
                    media: '(min-width: 20em)',
                    type: 'apertura'
                }
            }
        }
    },
    bannerConfig: {
        dfp_id: 133919216
    },
    shareConfig: {
        host: 'http://www.lanacion.com.ar',
        facebook: {
            appID: '246891475813003'
        }
    }
};
