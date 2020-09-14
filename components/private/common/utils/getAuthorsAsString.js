/* eslint-disable no-nested-ternary */
import get from './get';

const getAuthorsAsString = article => {
    const authors = get(article, 'credits.by', []);
    const authorFiltered = authors.filter(auth => auth.type === 'author');
    const authorsConcat = authorFiltered.reduce((prevVal, currVal, idx) => {
        return idx === 0
            ? currVal.name
            : idx === authors.length - 1
            ? `${prevVal} y ${currVal.name}`
            : `${prevVal}, ${currVal.name}`;
    }, '');

    return authorFiltered.length > 0 ? `Por ${authorsConcat}` : '';
};

export default getAuthorsAsString;
