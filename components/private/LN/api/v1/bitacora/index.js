const index = children => {
    const ArticlesbyBox = [];
    let posnum = 0;
    let cajanum = 0;

    children.map(element => {
        const itemBoxes = element.map(elem => {
            if (elem && elem.articles) {
                cajanum += 1;
                posnum = 0;

                const subChild = elem.articles.map(item => {
                    posnum += 1;
                    return {
                        id_nota: item._id,
                        url_nota: item.website_url,
                        posicion: `${String(posnum).padStart(2, '0')}`
                    };
                });
                let result = null;
                let validate = true;

                // Validaciones extras
                if (elem.information.hideCaja === false) {
                    validate = false;
                }
                // fin validaciones extras
                if (validate) {
                    result = {
                        id_caja: `${String(cajanum).padStart(2, '0')}`,
                        visible: !elem.information.hideCaja || false,
                        diagramacion_caja: elem.information.layout,
                        notas: subChild
                    };
                    ArticlesbyBox.push(result);
                }

                return result;
            }
            return elem;
        });

        return itemBoxes;
    });

    return { cajas: ArticlesbyBox };
};

export default index;
