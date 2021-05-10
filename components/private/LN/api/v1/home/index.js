import Article from './article';

const index = (children, diagramacion) => {
    const ArticlesbyBox = [];
    children.map(element => {
        const itemBoxes = element.map(elem => {
            if (elem && elem.articles) {
                const subChild = elem.articles.map(item => {
                    return Article(item, diagramacion);
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
