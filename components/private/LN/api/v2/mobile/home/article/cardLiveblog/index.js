import { cardRegular as Article } from '../../../../../common/article/cardRegular/index';
import { getLiveblogTitles } from '../../../../../../../../features/LN-10/article/common/_helper-WebApi';

export const CardLiveblog = article => {
    return {
        ...Article(article),
        subtitulos: getLiveblogTitles(article)
    };
};

export default CardLiveblog;
