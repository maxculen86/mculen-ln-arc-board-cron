import get from 'lodash.get';
import Image from '../common/image';
import Author from '../common/author';
import { dateAndTimeForAppsUtil } from '../../../../common/utils/dateAndTimeUtil';

const articleItem = article => {
    const {
        _id: id,
        subtype: template,
        headlines: { basic: titulo, mobile: tituloMobile }
    } = article;

    const authors = get(article, 'credits.by', null);
    const image = get(article, 'promo_items.basic');

    const resp = {
        id,
        template,
        titulo: tituloMobile || titulo,
        fecha: dateAndTimeForAppsUtil(article.first_publish_date)
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

    return resp;
};

export default articleItem;
