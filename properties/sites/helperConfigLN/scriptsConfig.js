const bodyBottom = 'body-bottom';

export default {
    AmazonPublisherServices: {
        props: {},
        location: ['head']
    },
    Datadog: { props: {}, location: ['head'] },
    ScriptVideoPowa: {
        props: {},
        location: ['head']
    },
    Permutive: { props: {}, location: ['head'] },
    ScriptCripto: {
        props: {},
        location: [bodyBottom]
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
                c2: '6906398'
            }
        },
        location: ['head']
    },
    Petametrics: {
        props: {},
        location: ['head']
    },
    AdblockDetector: {
        props: {},
        location: [bodyBottom]
    },
    NewsMediaOrganization: {
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
    Blockthrough: {
        props: {},
        location: [bodyBottom]
    },
    Queryly: {
        props: {},
        location: [bodyBottom]
    },
    Viafoura: {
        props: {},
        location: [bodyBottom]
    },
    ComscoreVideo: {
        props: {},
        location: ['body-top']
    },
    DevReactTracker: {
        props: {},
        location: ['head']
    }
};
