import siteConfig from '../../../../properties/sites/la-nacion-ar';
import getBajadaOrFirstTextParagraph from '../../../private/common/utils/getBajadaOrFirstTextParagraph';
import { getSectionLogo } from '../../../private/common/utils/sectionUtils';

export const getNotaCardsAperturaData = globalContent => {
    const {
        headlines: { basic: title = '' } = {},
        subheadlines: { basic: subtitle = '' } = {},
        description: { basic: description = '' } = {},
        content_restrictions: { content_code: contentCode = '' } = {},
        credits: { by: authors = [] } = {},
        first_publish_date: publishDate,
        label,
        taxonomy,
        distributor
    } = globalContent || {};

    const { layoutsName = {} } = siteConfig || {};

    const layout = layoutsName.Cards;
    const { sections } = taxonomy || {};
    const { name: distributorName } = distributor || {};

    const logoData = getSectionLogo(sections, layout, distributorName);

    const dataMeta = {
        publishDate,
        authors
    };

    const resolvedDescription =
        description.trim() ||
        getBajadaOrFirstTextParagraph(
            { ...globalContent, subheadlines: { basic: '' } },
            { truncateResult: false }
        ) ||
        '';

    const dataContent = {
        title,
        subtitle,
        description: resolvedDescription,
        label,
        logoData,
        isSubscriber: contentCode === 'cerrada'
    };

    return {
        dataMeta,
        dataContent
    };
};
