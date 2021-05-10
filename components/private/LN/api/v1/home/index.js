import Article from './article';

const index = (children, diagramacion) => {
    const ArticlesbyBox = children.map(e => {
        if (e && e.articles) {
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
