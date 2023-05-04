import { cardRegular as Article } from '../../../../../common/article/cardRegular/index';
import { getLiveblogSubtitles } from '../elements/title/index';
import {
    getArticleChapita,
    getArticleChapitaStyle
} from '../elements/chapita/index';

export const CardLiveblog = article => {
    return {
        ...Article(article),
        badgeStyle: getArticleChapitaStyle(article) || 'live',
        badge: getArticleChapita(article) || 'VIVO',
        chapita: getArticleChapita(article) || 'VIVO',
        subtitles: getLiveblogSubtitles(article),
        opinion: false
    };
};

export default CardLiveblog;
