import Article from './article';

const index = children => {
    const ArticlesbyBox = [];
    children.map(element => {
        const itemBoxes = element.map(elem => {
            if (elem && elem.articles) {
                const subChild = elem.articles.map(item => {
                    return {
                        id_nota: item._id,
                        url_nota: item.website_url,
                        article: Article(item)
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
