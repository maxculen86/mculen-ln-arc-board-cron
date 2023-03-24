import get from '../../../../../../../../common/utils/get';

export const getArticleChapitaStyle = article => {
    return get(article, 'additionalProperties.chapitaStyle', null);
};

export const getArticleChapita = article => {
    const originalTag = get(article, 'label.chapita.text', null);
    const tag = get(article, 'additionalProperties.chapita', null);
    const result = originalTag || tag || null;
    return result ? result.toUpperCase() : result;
};
