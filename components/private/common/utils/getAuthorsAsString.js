import get from './get';

const getAuthorsAsString = article => {
    const authors = get(article, 'credits.by', []);
    const authorFiltered = authors.filter(auth => auth.type === 'author');
    const authorsConcat = authorFiltered.reduce((prevVal, currVal, idx) => {
        if (idx === 0) return currVal.name;
        if (idx === authors.length - 1) return `${prevVal} y ${currVal.name}`;
        return `${prevVal}, ${currVal.name}`;
    }, '');

    return authorFiltered.length > 0 ? `Por ${authorsConcat}` : '';
};

export default getAuthorsAsString;
