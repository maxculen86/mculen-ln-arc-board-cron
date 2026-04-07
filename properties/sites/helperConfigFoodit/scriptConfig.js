const BODYBOTTOM = 'body-bottom';
const BODYTOP = 'body-top';
const HEAD = 'head';

export default {
    Datadog: { props: {}, location: [BODYBOTTOM] },
    GTM: {
        props: { id: 'GTM-M5NBFQW9', excludeInArcPreview: true },
        location: [HEAD, BODYTOP]
    },
    ComscoreFoodit: {
        props: {
            config: {
                c1: '2',
                c2: '6906398'
            },
            configNoScript: {
                cv: '4.4.0',
                cj: '1'
            }
        },
        location: [BODYBOTTOM]
    },
    SocialEmbeds: {
        props: {},
        location: [BODYTOP]
    },
    ComscoreVideo: {
        props: {},
        location: [BODYTOP]
    },
    DevReactTracker: {
        props: {},
        location: [HEAD]
    },
    Marfeel: { props: {}, location: [BODYBOTTOM] },
    Observable: { props: {}, location: [BODYBOTTOM] },
    DataModal: { props: {}, location: [BODYBOTTOM] },
    FooditEventsHelper: { props: {}, location: [BODYBOTTOM] },
    TikTokPixel: {
        props: { id: 'D23O82JC77UF7183BOFG' },
        location: [BODYBOTTOM]
    },
    GoogleOneTap: { props: {}, location: [HEAD] }
};
