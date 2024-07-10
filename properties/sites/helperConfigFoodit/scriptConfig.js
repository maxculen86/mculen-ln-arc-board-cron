const BODYBOTTOM = 'body-bottom';
const BODYTOP = 'body-top';
const HEAD = 'head';

export default {
    Datadog: { props: {}, location: [HEAD] },
    GTM: {
        props: { id: 'GTM-M5NBFQW9' },
        location: [HEAD, BODYTOP]
    },
    PostBid: {
        props: {},
        location: [HEAD]
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
        location: [HEAD]
    },
    GooglePublisherTag: {
        props: {},
        location: [HEAD]
    },
    GooglePublisherTagAcumulado: {
        props: {},
        location: [HEAD]
    },
    ComscoreVideo: {
        props: {},
        location: [BODYTOP]
    },
    DevReactTracker: {
        props: {},
        location: [HEAD]
    },
    Observable: { props: {}, location: [BODYBOTTOM] },
    DataModal: { props: {}, location: [BODYBOTTOM] },
    FooditEventsHelper: { props: {}, location: [BODYBOTTOM] }
};
