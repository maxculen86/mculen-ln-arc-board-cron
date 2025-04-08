import get from '../../../../../../../../common/utils/get';
import { getArticleAuthor } from '../../../../../../common/article/elements/author/index';

export const validSectionAliasMobile = article => {
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
