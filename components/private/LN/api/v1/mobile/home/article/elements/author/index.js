import get from '../../../../../../../../common/utils/get';
import { getArticleAuthor } from '../../../../../../common/article/elements/author/index';
import { articleSignature } from '../../../../../../common/elements/author';

export const getAuthors = article => {
    const sectionAliasMobile = get(
        article,
        'informationBox.sectionAliasMobile',
        null
    );
    if (['hashtag'].includes(sectionAliasMobile)) {
        return null;
    }
    return getArticleAuthor(article);
};

export const getAuthor = article => {
    const sectionAliasMobile = get(
        article,
        'informationBox.sectionAliasMobile',
        null
    );
    if (['hashtag'].includes(sectionAliasMobile)) {
        return null;
    }
    const authors = getAuthors(article);
    return authors ? authors[0] : null;
};

export const getSignature = article => {
    const sectionAliasMobile = get(
        article,
        'informationBox.sectionAliasMobile',
        null
    );
    if (['hashtag'].includes(sectionAliasMobile)) {
        return null;
    }
    const signature =
        get(article, 'additionalProperties.authors', null) || null;
    const authors = getArticleAuthor(article);
    return articleSignature(authors, signature);
};
