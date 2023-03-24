import get from '../../../../../../../../common/utils/get';

export const getArticleChapitaStyle = article => {
    return get(article, 'additionalProperties.chapitaStyle', null);
};

export default getArticleChapitaStyle;
