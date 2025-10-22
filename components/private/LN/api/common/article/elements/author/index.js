import get from '../../../../../../common/utils/get';
import { authorHomeMobile } from '../../../elements/author';

export const getArticleAuthor = article => {
    const authors = get(article, 'credits.by', null);
    if (authors && authors.length > 0) {
        const authorsFixed = authors.filter(v => v.type === 'author');
        if (authorsFixed.length > 0) {
            return authorsFixed.map(author => authorHomeMobile(author));
        }
    }
    return null;
};

export default getArticleAuthor;
