import get from '../../../../../../../common/utils/get';
import { getPrincipalCategory } from '../../../../../common/elements/category';
import { getArticleImage } from '../../../../../common/article/elements/image/index';
import {
    getArticleVideos,
    getYouTubeVideoLink
} from '../../../../../common/article/elements/video/index';
import { CardBasic } from '../../../../../common/article/cardBasic/index';
import { getBadgebyConfig } from '../elements/chapita/index';
import { getDroptext } from '../elements/bajada/index';
import { getFlyertext } from '../elements/volanta/index';

export const CardRegular = article => {
    const primarySection = get(article, 'taxonomy.primary_section');
    return {
        categoria: primarySection && getPrincipalCategory(primarySection),
        ...CardBasic(article),
        volanta: getFlyertext(article),
        bajada: getDroptext(article),
        imagen: getArticleImage(article),
        video: getArticleVideos(article),
        videos: getArticleVideos(article, true),
        videoYouTube: getYouTubeVideoLink(article),
        ...getBadgebyConfig(article),
        opinion: false
    };
};

export default CardRegular;
