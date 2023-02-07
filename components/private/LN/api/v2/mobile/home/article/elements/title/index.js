import get from '../../../../../../../../common/utils/get';

export const getArticleTitleVivo = article => {
    const title = get(article, 'additionalProperties.titleVivo', null);
    return title;
};

export default getArticleTitleVivo;
