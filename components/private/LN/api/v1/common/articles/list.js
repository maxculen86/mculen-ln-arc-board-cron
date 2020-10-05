const articleList = (type, articles) => {
    return articles
        ? articles.map(v => {
              return type(v);
          })
        : null;
};

export default articleList;
