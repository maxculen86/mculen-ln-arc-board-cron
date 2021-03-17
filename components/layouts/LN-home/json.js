const LNHome = ({ children }) => {
    // Only return the data from the first child (body)
    let respRoot = [];
    let resp = [];
    for (let i = 0; i < children.length; i++) {
        if (Array.isArray(children[i]) && children[i].length > 0) {
            let subChild = children[i];
            for (let a = 0; a < subChild.length; a++) {
                resp.push(subChild[a]);
            }
        } else {
            resp.push(children[i]);
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
