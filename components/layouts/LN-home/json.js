const LNHome = ({ children }) => {
    const listItems = [];
    const ArticlesbyBox = [];
    const listBox = children[6];
    const today = new Date();
    const dateToday = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;
    let posnum = 0;
    let cajanum = 0;

    const Boxes = listBox.map(elem => {
        if (elem) {
            cajanum += 1;
            posnum = 0;

            const subChild = elem.notas.map(item => {
                posnum += 1;
                return {
                    ...item,
                    posicion: `${String(posnum).padStart(2, '0')}`
                };
            });

            return {
                ...elem,
                id_caja: `${String(cajanum).padStart(2, '0')}`,
                notas: subChild
            };
        }
        return elem;
    });
    ArticlesbyBox.push(Boxes);

    listItems.push({
        fecha_foto: dateToday,
        usuario_publica: 'XX',
        cajas: Boxes
    });

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
