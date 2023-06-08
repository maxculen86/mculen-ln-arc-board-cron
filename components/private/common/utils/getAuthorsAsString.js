import get from './get';

const getAuthorsAsString = (article, isHomeLN10) => {
    const authors = get(article, 'credits.by', []);
    const authorFiltered = authors.filter(auth => auth.type === 'author');
    const authorsConcat = authorFiltered.reduce((prevVal, currVal, idx) => {
        const authorName = get(currVal, 'name', '').trim();
        if (idx === 0) return authorName;
        if (idx === authors.length - 1 && authorName)
            return `${prevVal} y ${authorName}`;
        return `${prevVal}, ${authorName}`;
    }, '');

    if (isHomeLN10) return authorsConcat;

    return authorFiltered.length > 0 && authorsConcat.trim()
        ? `Por ${authorsConcat}`
        : '';
};

export default getAuthorsAsString;
