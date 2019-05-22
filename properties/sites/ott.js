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
            props: { id: 'GTM-GHV6' },
            location: ['head', 'body-top']
        },
        Comscore: {
            props: { config: { c1: '2', c2: '6906398' } },
            location: ['head']
        }
    }
};
