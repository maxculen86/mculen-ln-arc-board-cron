const clearArticleKey = (key, articles = []) =>
    key ? articles.map(art => ({ ...art, [key]: '' })) : articles;

export default clearArticleKey;
