import get from '../../../../../../../../common/utils/get';
import cleanHtmlAttributes from '../../../../../../../../common/utils/cleanHtmlAttributes';

export const getEmbed = article =>
    cleanHtmlAttributes(get(article, 'additionalProperties.html', null));

export const getEmbedWidget = article =>
    get(article, 'additionalProperties.cllBoard', null);
