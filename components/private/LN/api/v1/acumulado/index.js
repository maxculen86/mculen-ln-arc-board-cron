import ArticleList from './articleList';

const index = (name, articles, next) => {
    return {
        paginar: next,
        titulo: name,
        notas: ArticleList(articles)
    };
};

export default index;
