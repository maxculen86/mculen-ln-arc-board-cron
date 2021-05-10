const LNMainHome = ({ children }) => {
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

LNMainHome.sections = [
    'Anticipo',
    'Anexo-1',
    'Bomba',
    'Apertura',
    'Anexo-2',
    'Breaking-1',
    'Breaking-2',
    'Breaking-3',
    'Anexo-3',
    'Opinion',
    'Breaking-4',
    'Breaking-5',
    'Comercial-1',
    'Bloque-2',
    'Comercial-2',
    'Bloque-3',
    'Bloque-4',
    'Bloque-5',
    'Bloque-6',
    'Bloque-7',
    'Bloque-8',
    'Aside'
];

export default LNMainHome;
