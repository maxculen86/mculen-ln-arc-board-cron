const LNHome = ({ children }) => {
    const resultCajas = [];
    const Cajas = [];
    const NotasSection = children[6];
    const today = new Date();
    const fecha = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;
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
                    ).padStart(2, '0')}`,
                    fecha_publish: fecha
                };
            });

            for (let a = 0; a < subChild.length; a++) {
                Cajas.push(subChild[a]);
            }
        }
    }

    resultCajas.push({
        data: Cajas
    });

    return Array.isArray(resultCajas) ? resultCajas : null;
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
