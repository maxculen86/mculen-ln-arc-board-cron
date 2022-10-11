const clearArticleKey = (articles = [], key) =>
    key ? articles.map(art => ({ ...art, [key]: '' })) : articles;

export default clearArticleKey;
