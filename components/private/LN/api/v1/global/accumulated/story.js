import get from 'lodash.get';
import Image from '../../common/image';
import { authorCommon as Author } from '../../common/author';
import { getTag } from '../../common/tag';
import { dateAndTimeForAppsUtil } from '../../../../../common/utils/dateAndTimeUtil';
import { getPrincipalCategory } from '../../common/category';
import matchObject from '../../common/utils/matchObject';

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
        enviarApps: matchObject(article, 'contains')
    };

    if (image && image.type === 'image') {
        resp.imagen = Image(image);
    }

    if (authors && authors.length > 0) {
        const authorsFixed = authors.filter(v => v.type === 'author');
        if (authorsFixed.length > 0) {
            resp.autores = authorsFixed.map(v => {
                return Author(v);
            });
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
