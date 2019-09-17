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
                    7: [
                        {
                            width: 1033,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            type: 'apertura'
                        },
                        {
                            width: 768,
                            media: '(min-width: 740px)',
                            class: 'img-desktop-sm',
                            type: 'apertura'
                        },
                        {
                            width: 340,
                            media: '(min-width: 320px)',
                            class: 'img-mobile',
                            type: 'apertura'
                        },
                        {
                            width: 768,
                            media: '(min-width: 740px)',
                            class: 'img-desktop-sm',
                            type: 'cuerpo'
                        },
                        {
                            width: 340,
                            media: '(min-width: 320px)',
                            class: 'img-mobile',
                            type: 'cuerpo'
                        }
                    ],
                    default: [
                        {
                            width: 1033,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            type: 'apertura'
                        }
                    ]
                }
            },
            notaM: [
                {
                    width: 600,
                    media: '(min-width: 64em)',
                    type: 'apertura'
                },
                {
                    width: 520,
                    media: '(min-width: 48em)',
                    type: 'apertura'
                },
                {
                    width: 375,
                    media: '(min-width: 20em)',
                    type: 'apertura'
                }
            ]
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
