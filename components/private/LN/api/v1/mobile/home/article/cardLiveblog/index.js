import { cardRegular as Article } from '../../../../../common/article/cardRegular/index';
import { getLiveblogSubtitles } from '../elements/title/index';
import { getBadgebyConfig } from '../elements/chapita/index';

export const CardLiveblog = article => {
    return {
        ...Article(article),
        ...getBadgebyConfig(article),
        subtitles: getLiveblogSubtitles(article),
        opinion: false
    };
};

export default CardLiveblog;
