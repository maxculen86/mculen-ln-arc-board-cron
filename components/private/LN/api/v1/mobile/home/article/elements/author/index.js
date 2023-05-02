import get from '../../../../../../../../common/utils/get';
import { getArticleAuthor } from '../../../../../../common/article/elements/author/index';
import { articleSignature } from '../../../../../../common/elements/author';

export const getAuthors = article => {
    if (
        ['hashtag'].includes(
            get(article, 'informationBox.sectionAliasMobile', null)
        )
    ) {
        return null;
    }
    return getArticleAuthor(article);
};

export const getAuthor = article => {
    if (
        ['hashtag'].includes(
            get(article, 'informationBox.sectionAliasMobile', null)
        )
    ) {
        return null;
    }
    const authors = getAuthors(article);
    return authors ? authors[0] : null;
};

export const getSignature = article => {
    if (
        ['hashtag'].includes(
            get(article, 'informationBox.sectionAliasMobile', null)
        )
    ) {
        return null;
    }
    const signature =
        get(article, 'additionalProperties.authors', null) || null;
    const authors = getArticleAuthor(article);
    return articleSignature(authors, signature);
};
