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
                    7: [
                        {
                            width: 1033,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            type: 'promo_items'
                        },
                        {
                            width: 768,
                            media: '(min-width: 740px)',
                            class: 'img-desktop-sm',
                            type: 'promo_items'
                        },
                        {
                            width: 340,
                            media: '(min-width: 320px)',
                            class: 'img-mobile',
                            type: 'promo_items'
                        },
                        {
                            width: 768,
                            media: '(min-width: 740px)',
                            class: 'img-desktop-sm',
                            type: 'content_elements'
                        },
                        {
                            width: 340,
                            media: '(min-width: 320px)',
                            class: 'img-mobile',
                            type: 'content_elements'
                        }
                    ],
                    default: [
                        {
                            width: 1033,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            type: 'promo_items'
                        },
                        {
                            width: 1033,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            type: 'content_elements'
                        }
                    ]
                }
            },
            notaM: [
                {
                    width: 600,
                    media: '(min-width: 64em)'
                },
                {
                    width: 520,
                    media: '(min-width: 48em)'
                },
                {
                    width: 375,
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
