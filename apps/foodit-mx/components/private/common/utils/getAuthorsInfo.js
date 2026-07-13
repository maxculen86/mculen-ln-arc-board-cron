import get from './get';

export const getAuthorsInfo = article => {
    const authors = get(article, 'credits.by', []);
    const authorFiltered = authors.filter(auth => auth.type === 'author');

    return authorFiltered.reduce(
        (acc, curr) => {
            const authorName = get(curr, 'name', '').trim();
            const authorId = get(curr, '_id', 'no_url').trim();

            acc.authorsName = acc.authorsName
                ? `${acc.authorsName}, ${authorName}`
                : authorName;
            acc.authorsIds = acc.authorsIds
                ? `${acc.authorsIds}, ${authorId}`
                : authorId;

            return acc;
        },
        { authorsName: '', authorsIds: '' }
    );
};

export default getAuthorsInfo;
