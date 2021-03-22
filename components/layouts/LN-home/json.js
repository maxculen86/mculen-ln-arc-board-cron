const LNHome = ({ children }) => {
    // Only return the data from the first child (body)
    const respRoot = [];
    const resp = [];
    const NotasSection = children[6];
    let posnum = 0;
    let cajanum = 0;
    for (let i = 0; i < NotasSection.length; i++) {
        posnum += 1;
        cajanum = 0;
        if (Array.isArray(NotasSection[i]) && NotasSection[i].length > 0) {
            let subChild = NotasSection[i];
            subChild = NotasSection[i].map(elem => {
                cajanum += 1;
                return {
                    ...elem,
                    posicion_id: `${String(posnum).padStart(2, '0')}${String(
                        cajanum
                    ).padStart(2, '0')}`
                };
            });

            for (let a = 0; a < subChild.length; a++) {
                resp.push(subChild[a]);
            }
        }
    }
    respRoot.push(resp);

    return Array.isArray(respRoot) ? respRoot : null;
    // return Array.isArray(children) ? children : null;
};

LNHome.sections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Pre-Apertura',
    'Breadcrumb/Titulo',
    'Apertura',
    'Links',
    'Notas',
    'Aside'
];

export default LNHome;
