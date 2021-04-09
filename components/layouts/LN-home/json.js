const LNHome = ({ children }) => {
    const listItems = [];
    const ArticlesbyBox = [];
    let posnum = 0;
    let cajanum = 0;

    children.map(element => {
        const itemBoxes = element.map(elem => {
            if (elem && elem.diagramacion_caja) {
                cajanum += 1;
                posnum = 0;

                const subChild = elem.notas.map(item => {
                    posnum += 1;
                    return {
                        ...item,
                        posicion: `${String(posnum).padStart(2, '0')}`
                    };
                });
                const result = {
                    ...elem,
                    id_caja: `${String(cajanum).padStart(2, '0')}`,
                    notas: subChild
                };
                ArticlesbyBox.push(result);
                return result;
            }
            return elem;
        });

        return itemBoxes;
    });

    listItems.push({
        // fecha_foto: dateToday, //Data pendiente de añadir
        // usuario_publica: 'XX', //Data pendiente de añadir
        cajas: ArticlesbyBox
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
