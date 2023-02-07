export const orderArticles = (articles, diagramacion) => {
    if (articles && articles.length > 0) {
        if (diagramacion === 'focalRight2') {
            return articles.slice(0, 2).reverse();
        }
    }
    return articles;
};

export default orderArticles;
