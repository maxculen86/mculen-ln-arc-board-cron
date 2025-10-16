import get from '../../../../../../../common/utils/get';
import { CardBasic } from '../../../../../common/article/cardBasic/index';
import { getArticleImage } from '../../../../../common/article/elements/image/index';
import { getPrincipalCategory } from '../../../../../common/elements/category';
import { validSectionAliasMobile } from '../elements/author/index';
import { getDroptext } from '../elements/bajada/index';
import { getBadgebyConfig } from '../elements/chapita/index';
import { getEmbed, getEmbedWidget } from '../elements/embed/index';
import { getFlyertext } from '../elements/volanta/index';
import { getYouTubeVideoLink } from '../../../../../common/article/elements/video/index';
import { videoJWHomeMobile } from '../../../../../common/elements/videoJW';

export const CardRegular = article => {
    const primarySection = get(article, 'taxonomy.primary_section');
    const hideDescriptionValue = get(
        article,
        'additionalProperties.hideDescription'
    );
    const showVideoLoop = get(article, 'additionalProperties.showVideoLoop', false);
    const video = get(article, 'additionalProperties.video', null);
    const videoLoopRaw = video?.sources ? videoJWHomeMobile(video.sources) : null;
    const hasVideoLoop = showVideoLoop && videoLoopRaw;

    const widgetEmbed = getEmbedWidget(article);

    const basicCard = CardBasic(article);
    const isHashtagSection = validSectionAliasMobile(article);
    const autores = isHashtagSection ? null : basicCard.authors;

    return {
        categoria: primarySection && getPrincipalCategory(primarySection),
        ...basicCard,
        autores,
        authors: autores,
        marquesina: isHashtagSection ? null : basicCard.marquesina,
        volanta: getFlyertext(article),
        bajada: hideDescriptionValue ? null : getDroptext(article),
        imagen: getArticleImage(article),
        videoYouTube: getYouTubeVideoLink(article),
        widgetEmbed,
        embed: getEmbed(article),
        ...(widgetEmbed === null && getBadgebyConfig(article)),
        opinion: false,
        isListenable: article.isListenable,
        videoLoop: hasVideoLoop ? videoLoopRaw : null,
    };
};

export default CardRegular;
