import get from 'lodash.get';
import Image from '../common/image';
import Author from '../common/author';
import { dateAndTimeForAppsUtil } from '../../../../common/utils/dateAndTimeUtil';
import { getPrincipalCategory } from '../common/category';

const articleItem = article => {
    const {
        _id: id,
        subtype: templateId,
        headlines: { basic: titulo, mobile: tituloMobile },
        website_url: url,
        last_updated_date: lastUpdatedDate //No lo encuentro
    } = article;

    const authors = get(article, 'credits.by', null); //Retorna Null
    const image = get(article, 'promo_items.basic');

    const primarySection = get(article, 'taxonomy.primary_section', null); //No lo encuentro

    const resp = {
        id,
        templateId,
        titulo: tituloMobile || titulo,
        fecha: dateAndTimeForAppsUtil(article.first_publish_date), //No lo encuentro
        fechaActualizacion: dateAndTimeForAppsUtil(lastUpdatedDate), //No lo encuentro
        url
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
    // if (authors) {
    //     const authorsFixed = authors.filter(v => v.type === 'author');
    //     if (authorsFixed.length > 0) {
    //         resp.autores = Author(authorsFixed[0]);
    //     }
    // }

    if (primarySection) {
        resp.categoria = getPrincipalCategory(primarySection);
    }

    return resp;
};

export default articleItem;
