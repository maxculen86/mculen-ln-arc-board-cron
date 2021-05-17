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
    'Anexo_1',
    'Bomba',
    'Apertura',
    'Anexo_2',
    'Breaking_1',
    'Breaking_2',
    'Breaking_3',
    'Anexo_3',
    'Opinion',
    'Breaking_4',
    'Breaking_5',
    'Breaking_6',
    'Comercial_1',
    'Bloque_2',
    'Comercial_2',
    'Bloque_3',
    'Bloque_4',
    'Bloque_5',
    'Bloque_6',
    'Bloque_7',
    'Bloque_8'
];

export default LNMainHome;
