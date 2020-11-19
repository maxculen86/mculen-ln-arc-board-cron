import get from 'lodash.get';
import Image from '../common/image';
import Author from '../common/author';
import { getTag } from '../common/tag';
import { getPrincipalCategory } from '../common/category';
import { dateAndTimeForAppsUtil } from '../../../../common/utils/dateAndTimeUtil';

const articleItem = article => {
    const {
        _id: id,
        subtype: templateId,
        headlines: { basic: titulo, mobile: tituloMobile },
        subheadlines: { basic: bajada },
        website_url: url,
        last_updated_date: lastUpdatedDate
    } = article;

    const resp = {
        id,
        templateId,
        titulo,
        fecha: dateAndTimeForAppsUtil(article.display_date),
        fechaActualizacion: dateAndTimeForAppsUtil(lastUpdatedDate),
        url,
        tituloMobile,
        bajada
    };

    const authors = get(article, 'credits.by', null);
    const image = get(article, 'promo_items.basic', null);
    const primarySection = get(article, 'taxonomy.primary_section', null);
    const tags = get(article, 'taxonomy.tags', null);

    if (image && image.type === 'image') {
        resp.imagen = Image(image);
    }

    if (authors) {
        const authorsFixed = authors.filter(v => v.type === 'author');
        if (authorsFixed.length > 0) {
            resp.autores = Author(authorsFixed[0]);
        }
    }

    if (primarySection) {
        resp.categoria = getPrincipalCategory(primarySection);
    }

    if (tags && tags.length > 0) {
        resp.tags = tags.map(v => {
            return getTag(v);
        });
    }

    return resp;
};

export default articleItem;
