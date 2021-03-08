export const isNotRecommend = article => {
    const { label = {} } = article;
    const { recomendar = {} } = label;
    return recomendar.text === 'No';
};

export const getArticlesToShow = (
    articles = [],
    idsArticlesToExclude = [],
    notesQuantity
) => {
    const articlesFiltered = articles.filter(
        art => idsArticlesToExclude.some(id => art._id === id) === false
    );

    const articlesToShow = articlesFiltered
        ? articlesFiltered.slice(0, notesQuantity)
        : [];
    return articlesToShow;
};
