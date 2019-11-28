import ArticleList from './articleList';

const index = (name, articles, next) => {
    return {
        next,
        title: name,
        articles: ArticleList(articles)
    };
};

export default index;
