import { getArticleAuthor as getFormatedAuthors } from '../../LN/api/common/article/elements/author';
import get from './get';

const isGuestAuthor = article => {
    const authors = get(article, 'credits.by', null);
    const authorsMobile = getFormatedAuthors(article);
    const authorType = get(
        authors,
        '[0].additional_properties.original.author_type',
        null
    );

    if (authorType && authorType.toLowerCase() === 'estándar') {
        return false;
    }

    if (authorType && authorType.toLowerCase() !== 'estándar') {
        return true;
    }

    const authorMobileType = get(authorsMobile, '[0].tipo', null);

    if (authorMobileType !== null) {
        return authorMobileType === 2;
    }

    return true;
};

export default isGuestAuthor;
