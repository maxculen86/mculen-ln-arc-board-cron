import get from '../../../../../../../../common/utils/get';
import { getArticleAuthor } from '../../../../../../common/article/elements/author/index';
import { articleSignature } from '../../../../../../common/elements/author';

const validSectionAliasMobile = article => {
    const sectionAliasMobile = get(
        article,
        'informationBox.sectionAliasMobile',
        null
    );
    return ['hashtag'].includes(sectionAliasMobile);
};

export const getAuthors = article => {
    if (validSectionAliasMobile(article)) {
        return null;
    }
    return getArticleAuthor(article);
};

export const getAuthor = article => {
    if (validSectionAliasMobile(article)) {
        return null;
    }
    const authors = getAuthors(article);
    return authors ? authors[0] : null;
};

export const getSignature = article => {
    if (validSectionAliasMobile(article)) {
        return null;
    }
    const signature =
        get(article, 'additionalProperties.authors', null) || null;
    const authors = getArticleAuthor(article);
    return articleSignature(authors, signature);
};
