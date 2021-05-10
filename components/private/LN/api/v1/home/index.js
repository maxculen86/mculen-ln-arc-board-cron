import Article from './article';

const index = (children, diagramacion) => {
    const ArticlesbyBox = children.map(e => {
        if (e) {
            //TODO: Recorrer las notas en un archivo nuevo. Recibir el array y validar que tenga notas
            const subChild = e.articles.map(item => {
                return Article(item, diagramacion);
            });

            return {
                notas: subChild
            };
        }
    });
    return ArticlesbyBox;
};

export default index;
