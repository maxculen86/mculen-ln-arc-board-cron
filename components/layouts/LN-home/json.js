const LNHome = ({ children }) => {
    const listItems = [];
    const ArticlesbyBox = [];
    const BoxSection = children[6];
    const today = new Date();
    const dateToday = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;
    let posnum = 0;
    let cajanum = 0;

    for (let i = 0; i < BoxSection.length; i++) {
        cajanum += 1;
        posnum = 0;
        if (Array.isArray(BoxSection[i]) && BoxSection[i].length > 0) {
            let subChild = BoxSection[i];
            subChild = BoxSection[i].map(elem => {
                posnum += 1;
                return {
                    ...elem,
                    posicion: `${posnum.toString()}`
                };
            });
            ArticlesbyBox.push({
                id_caja: `${String(cajanum).padStart(2, '0')}`,
                fecha_publicacion: dateToday,
                notas: subChild
            });
        }
    }
    listItems.push(ArticlesbyBox);

    return Array.isArray(listItems) ? listItems : null;
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
