import get from '../../../../../../../common/utils/get';
import { CardBasic } from '../../../../../common/article/cardBasic/index';
import { getArticleImage } from '../../../../../common/article/elements/image/index';
import { getPrincipalCategory } from '../../../../../common/elements/category';
import { getAuthor, getAuthors, getSignature } from '../elements/author/index';
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

    return {
        categoria: primarySection && getPrincipalCategory(primarySection),
        ...CardBasic(article),
        autor: getAuthor(article),
        autores: getAuthors(article),
        marquesina: getSignature(article),
        volanta: getFlyertext(article),
        bajada: hideDescriptionValue ? null : getDroptext(article),
        imagen: getArticleImage(article),
        videoYouTube: getYouTubeVideoLink(article),
        widgetEmbed: getEmbedWidget(article),
        embed: getEmbed(article),
        ...getBadgebyConfig(article),
        opinion: false,
        isListenable: article.isListenable
    };
};

export default CardRegular;
