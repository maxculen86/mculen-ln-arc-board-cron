import Article from './article';

const articleList = articles => {
    return articles.map(v => {
        return Article(v);
    });
};

export default articleList;
