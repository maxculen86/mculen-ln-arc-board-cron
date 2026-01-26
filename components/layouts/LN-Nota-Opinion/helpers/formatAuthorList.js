import get from '../../../private/common/utils/get';
import { startsWithIorHiRAE } from '../../../private/common/utils/getAuthorsAsString';

const formatAuthorList = (authors = []) => {
    if (!Array.isArray(authors) || authors.length === 0) return '';

    const authorFiltered = authors.filter(author => author?.type === 'author');

    if (authorFiltered.length === 0) return '';

    const result = authorFiltered.reduce((acc, author, index) => {
        const name = get(author, 'name', '').trim();
        if (!name) return acc;

        if (index === 0) return name;

        const isLast = index === authorFiltered.length - 1;

        if (isLast) {
            const connector = startsWithIorHiRAE(name) ? 'e' : 'y';
            return `${acc} ${connector} ${name}`;
        }

        return `${acc}, ${name}`;
    }, '');

    return result.toUpperCase();
};

export default formatAuthorList;
