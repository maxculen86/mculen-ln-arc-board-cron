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
        }
    },
    imageConfig: {
        resize: {
            nota: {
                bySubtype: {
                    4: {
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
                    }
                }
            },
            masNotas: {
                byDestination: {
                    article: {
                        big: {
                            width: 1033,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            type: 'apertura'
                        },
                        medium: {
                            width: 300,
                            media: '(min-width: 240px)',
                            class: 'img-desktop-sm',
                            type: 'apertura'
                        }
                    }
                }
            }
        }
    },
    bannerConfig: {
        dfp_id: 133919216
    }
};
