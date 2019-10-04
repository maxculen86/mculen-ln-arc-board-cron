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
        host: 'https://www.lanacion.com.ar',
        facebook: {
            appID: '246891475813003'
        }
    }
};
