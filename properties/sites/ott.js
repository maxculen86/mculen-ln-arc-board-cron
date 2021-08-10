export default {
    title: 'LN+ Mirá todos los programas y videos online',
    className: {
        body: 'ott'
    },
    header: {
        hierarchy: 'Header'
    },
    activeProgramsHierarchy: 'ActivePrograms',
    scripts: {
        GTM: {
            props: { id: 'GTM-GHV6', idAMP: 'GTM-PRT86FH' },
            location: ['head', 'body-top']
        },
        Comscore: {
            props: {
                config: {
                    c1: '2',
                    c2: '6906398',
                    c3: 'LANACION.COM.AR',
                    c4: '*null',
                    c6: '*null'
                }
            },
            location: ['head']
        }
    },
    sliderConfig: [
        {
            name: 'desktop',
            lowerRange: 1380,
            topRange: null,
            pageSize: 4
        },
        {
            name: 'desktop-sm',
            lowerRange: 1025,
            topRange: 1379,
            pageSize: 4
        },
        {
            name: 'tablet',
            lowerRange: 864,
            topRange: 1023,
            pageSize: 3
        },
        {
            name: 'tablet-sm',
            lowerRange: 672,
            topRange: 863,
            pageSize: 3
        },
        {
            name: 'mobile',
            lowerRange: 360,
            topRange: 671,
            pageSize: 2
        },
        {
            name: 'mobile-sm',
            lowerRange: null,
            topRange: 359,
            pageSize: 2
        }
    ]
};
