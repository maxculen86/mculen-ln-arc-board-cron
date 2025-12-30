import { dateAndTimeForAppsUtil } from '../../../../../common/utils/dateAndTimeUtil';
import get from '../../../../../common/utils/get';
import { authorCommon as Author } from '../../../common/elements/author';
import { getPrincipalCategory } from '../../../common/elements/category';
import getDistributor from '../../../common/elements/distributor';
import { getDomainCLL } from '../../../common/elements/domain';
import Image from '../../../common/elements/image';
import getOpeningMode from '../../../common/elements/label/openingMode';
import sentToApps from '../../../common/elements/label/sentToApps';
import { getTag } from '../../../common/elements/tag';

const articleItem = article => {
    const {
        _id: id,
        subtype: templateId,
        headlines: { basic: titulo, mobile: tituloMobile },
        website_url: url,
        last_updated_date: lastUpdatedDate
    } = article;

    if (!titulo) {
        throw new Error('Titulo de la nota es null o undefined');
    }
    const authors = get(article, 'credits.by', null);
    const image = get(article, 'promo_items.basic', null);
    const primarySection = get(article, 'taxonomy.primary_section', null);
    const tags = get(article, 'taxonomy.tags', null);
    const bajada = get(article, 'subheadlines.basic', null);
    const domain = getDomainCLL(article);
    const resp = {
        id,
        templateId: Number.isInteger(templateId)
            ? templateId.toString()
            : templateId,
        titulo: titulo || tituloMobile,
        tituloMobile,
        fecha: dateAndTimeForAppsUtil(article.display_date),
        fechaActualizacion: dateAndTimeForAppsUtil(lastUpdatedDate),
        url,
        bajada,
        enviarApps: sentToApps(article),
        openingMode: getOpeningMode(article),
        distributor: getDistributor(article),
        ...(domain && { domain })
    };

    if (image && image.type === 'image') {
        resp.imagen = Image(image);
    }

    if (authors && authors.length > 0) {
        const authorsFixed = authors.filter(v => v.type === 'author');
        if (authorsFixed.length > 0) {
            resp.autores = authorsFixed.map(v => Author(v));
            resp.authors = resp.autores;
        }
    }

    if (primarySection) {
        resp.categoria = getPrincipalCategory(primarySection);
    }

    if (tags && tags.length > 0) {
        resp.tags = tags.map(v => getTag(v));
    }

    if (domain) {
        resp.domain = domain;
    }

    return resp;
};

export default articleItem;
