import get from '../../../../../../../../common/utils/get';

export const getArticleTitleEditorial = article => {
    const title = get(article, 'additionalProperties.title', null);
    return title;
};

export default getArticleTitleEditorial;
