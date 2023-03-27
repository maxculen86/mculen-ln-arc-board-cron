import { cardRegular as Article } from '../../../../../common/article/cardRegular/index';
import { getLiveblogTitlesApi } from '../../../../../../../../features/LN-10/article/common/_helper-WebApi';
import { getArticleChapitaStyle } from '../elements/chapita/index';

export const CardLiveblog = article => {
    return {
        ...Article(article),
        badgeStyle: getArticleChapitaStyle(article),
        subtitles: getLiveblogTitlesApi(article),
        opinion: false
    };
};

export default CardLiveblog;
