import Article from './article';

const articleList = ({ articles }) => {
    return articles
        ? articles.map(v => {
              return Article(v);
          })
        : null;
};

export default articleList;
