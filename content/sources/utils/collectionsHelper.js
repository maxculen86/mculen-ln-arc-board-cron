export const isNotRecommend = article => {
    const { label = {} } = article;
    const { recomendar = {} } = label;
    return recomendar.text === 'No';
};

export const getArticlesToShow = (
    articles = [],
    idsArticlesToExclude = [],
    from,
    notesQuantity
) => {
    const articlesFiltered = articles.filter(
        art => idsArticlesToExclude.some(id => art._id === id) === false
    );

    const articlesToShow = articlesFiltered
        ? articlesFiltered.slice(from, from + notesQuantity)
        : [];
    return articlesToShow;
};
