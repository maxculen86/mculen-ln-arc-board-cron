const BODYBOTTOM = 'body-bottom';
const BODYTOP = 'body-top';
const HEAD = 'head';

export default {
    AmazonPublisherServices: {
        props: {},
        location: [HEAD]
    },
    Datadog: { props: {}, location: [HEAD] },
    Permutive: { props: {}, location: [HEAD] },
    ScriptCripto: {
        props: {},
        location: [BODYBOTTOM]
    },
    GTM: {
        props: { id: 'GTM-GHV6', idAMP: 'GTM-PRT86FH' },
        location: [HEAD, BODYTOP]
    },
    PostBid: {
        props: {},
        location: [HEAD]
    },
    ArcAds: {
        props: {},
        location: [HEAD]
    },
    FacebookSDK: {
        props: {},
        location: [HEAD]
    },
    Comscore: {
        props: {
            config: {
                c1: '2',
                c2: '6906398'
            }
        },
        location: [HEAD]
    },
    Petametrics: {
        props: {},
        location: [HEAD]
    },
    AdblockDetector: {
        props: {},
        location: [BODYBOTTOM]
    },
    NewsMediaOrganization: {
        props: {},
        location: [HEAD]
    },
    LiftIgniter: {
        props: {},
        location: [BODYTOP]
    },
    GooglePublisherTag: {
        props: {},
        location: [HEAD]
    },
    GooglePublisherTagAcumulado: {
        props: {},
        location: [HEAD]
    },
    OptaEmbed: {
        props: {},
        location: [HEAD]
    },
    ScriptHtmlLibre: {
        props: {},
        location: [HEAD]
    },
    Blockthrough: {
        props: {},
        location: [BODYBOTTOM]
    },
    Queryly: {
        props: {},
        location: [BODYBOTTOM]
    },
    Viafoura: {
        props: {},
        location: [BODYBOTTOM]
    },
    ComscoreVideo: {
        props: {},
        location: [BODYTOP]
    },
    DevReactTracker: {
        props: {},
        location: [HEAD]
    },
    Marfeel: { props: {}, location: [HEAD] },
    ScriptCloseBanners: { props: {}, location: [BODYBOTTOM] },
    EventsHelper: { props: {}, location: [HEAD] },
    Observable: { props: {}, location: [BODYBOTTOM] },
    HandleGlossary: { props: {}, location: [BODYBOTTOM] },
    MetaRobots: { props: {}, location: [HEAD] },
    ScriptJwVideoHome: {
        props: {},
        location: [BODYBOTTOM]
    },
    FacebookPixel: { props: { id: '492459597522335' }, location: [HEAD] },
    GoogleOneTap: { props: {}, location: [HEAD] }
};
