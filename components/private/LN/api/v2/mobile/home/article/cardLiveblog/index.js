import { cardRegular as Article } from '../../../../../common/article/cardRegular/index';
import { getLiveblogTitlesApi } from '../../../../../../../../features/LN-10/article/common/_helper-WebApi';

export const CardLiveblog = article => {
    return {
        ...Article(article),
        subtitulos: getLiveblogTitlesApi(article)
    };
};

export default CardLiveblog;
