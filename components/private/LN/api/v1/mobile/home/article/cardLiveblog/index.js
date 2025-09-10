import { cardRegular as Article } from '../../../../../common/article/cardRegular/index';
import { getLiveblogTimeline } from '../elements/title/index';
import { getBadgebyConfig } from '../elements/chapita/index';

export const CardLiveblog = article => ({
    ...Article(article),
    ...getBadgebyConfig(article),
    timeline: getLiveblogTimeline(article),
    opinion: false
});

export default CardLiveblog;
