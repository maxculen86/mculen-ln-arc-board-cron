import get from '../../../../../../../common/utils/get';
import { CardBasic } from '../../../../../common/article/cardBasic/index';
import { getArticleImage } from '../../../../../common/article/elements/image/index';
import { getPrincipalCategory } from '../../../../../common/elements/category';
import { getAuthors, validSectionAliasMobile } from '../elements/author/index';
import { getDroptext } from '../elements/bajada/index';
import { getBadgebyConfig } from '../elements/chapita/index';
import { getEmbed, getEmbedWidget } from '../elements/embed/index';
import { getFlyertext } from '../elements/volanta/index';
import { getYouTubeVideoLink } from '../../../../../common/article/elements/video/index';

export const CardRegular = article => {
    const primarySection = get(article, 'taxonomy.primary_section');
    const hideDescriptionValue = get(
        article,
        'additionalProperties.hideDescription'
    );

    const widgetEmbed = getEmbedWidget(article);

    const basicCard = CardBasic(article);
    const isHashtagSection = validSectionAliasMobile(article);
    return {
        categoria: primarySection && getPrincipalCategory(primarySection),
        ...basicCard,
        autores: getAuthors(article),
        authors: isHashtagSection ? null : basicCard.authors,
        marquesina: isHashtagSection ? null : basicCard.marquesina,
        volanta: getFlyertext(article),
        bajada: hideDescriptionValue ? null : getDroptext(article),
        imagen: getArticleImage(article),
        videoYouTube: getYouTubeVideoLink(article),
        widgetEmbed,
        embed: getEmbed(article),
        ...(widgetEmbed === null && getBadgebyConfig(article)),
        opinion: false,
        isListenable: article.isListenable
    };
};

export default CardRegular;
