const index = children => {
    let posnum = 0;
    let cajanum = 0;

    const ArticlesbyBox = children.map(e => {
        if (e) {
            const { articles, information } = e;
            if (information.hideCaja !== false) {
                cajanum += 1;
                posnum = 0;

                const subChild = articles.map(item => {
                    posnum += 1;
                    return {
                        id_nota: item._id,
                        url_nota: item.website_url,
                        posicion: `${String(posnum).padStart(2, '0')}`
                    };
                });

                return {
                    id_caja: `${String(cajanum).padStart(2, '0')}`,
                    visible: !information.hideCaja || false,
                    diagramacion_caja: information.layout,
                    notas: subChild
                };
            }
        }
    });

    return { cajas: ArticlesbyBox };
};

export default index;
