import siteConfig from '../../../../properties/sites/la-nacion-ar';
import getBajadaOrFirstTextParagraph from '../../../private/common/utils/getBajadaOrFirstTextParagraph';
import {
    getSectionLogo,
    getAFondoLogo
} from '../../../private/common/utils/sectionUtils';

export const resolveDualTitles = (workTitle, nativeTitle) => {
    const cleanNative = nativeTitle?.trim();
    const cleanWork = workTitle?.trim();

    return {
        primaryTitle: cleanNative || cleanWork || '',
        secondaryTitle: cleanNative && cleanWork ? cleanWork : null
    };
};

export const getNotaCardsAperturaData = globalContent => {
    const {
        headlines: { basic: workTitle = '', native: nativeTitle = '' } = {},
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
    const { sections, tags = [] } = taxonomy || {};
    const { name: distributorName } = distributor || {};

    const aFondoLogo = getAFondoLogo(tags, layout);
    const logoData =
        aFondoLogo || getSectionLogo(sections, layout, distributorName);

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

    const { primaryTitle, secondaryTitle } = resolveDualTitles(
        workTitle,
        nativeTitle
    );

    const dataContent = {
        title: primaryTitle,
        secondaryTitle,
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
