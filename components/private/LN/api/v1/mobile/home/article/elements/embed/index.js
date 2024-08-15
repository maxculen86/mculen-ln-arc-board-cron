import get from '../../../../../../../../common/utils/get';

export const getEmbed = article => {
    const embed = get(article, 'additionalProperties.html', null);
    return embed === '' ? null : embed;
};

export default getEmbed;
