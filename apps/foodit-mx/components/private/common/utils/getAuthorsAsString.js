import get from './get';
import isExternalDistributor from './isExternalDistributor';

export const startsWithIorHiRAE = name => {
    if (!name) return false;
    return /^hi[^aeo]|^i[^aeo]/i.test(name);
};

const getAuthorsAsString = (article, isHomeLN10) => {
    const name = article?.distributor?.name || '';
    const category = article?.distributor?.category || '';
    const authors = get(article, 'credits.by', []);
    const authorId = get(authors, '[0]._id', '');
    const authorFiltered = authors.filter(auth => auth.type === 'author');
    const authorsConcat = authorFiltered.reduce((prevVal, currVal, idx) => {
        const authorName = get(currVal, 'name', '').trim();

        if (idx === 0) return authorName;

        if (idx === authors.length - 1 && authorName) {
            const connector = startsWithIorHiRAE(authorName) ? 'e' : 'y';
            return `${prevVal} ${connector} ${authorName}`;
        }

        return `${prevVal}, ${authorName}`;
    }, '');

    if (isHomeLN10 && isExternalDistributor(name, category, authorId))
        return name;

    if (isHomeLN10) return authorsConcat;

    return authorFiltered.length > 0 && authorsConcat.trim()
        ? `Por ${authorsConcat}`
        : '';
};

export default getAuthorsAsString;
