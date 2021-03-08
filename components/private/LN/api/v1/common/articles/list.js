const articleList = (type, articles) => {
    return articles.map(v => {
        return type(v);
    });
};

export default articleList;
