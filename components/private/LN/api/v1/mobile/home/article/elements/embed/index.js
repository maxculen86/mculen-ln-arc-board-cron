import get from '../../../../../../../../common/utils/get';
import cleanHtmlAttributes from '../../../../../../../../common/utils/cleanHtmlAttributes';

export const getEmbed = article => {
    const embed = cleanHtmlAttributes(
        get(article, 'additionalProperties.html', null)
    );

    return embed;
};

export default getEmbed;
