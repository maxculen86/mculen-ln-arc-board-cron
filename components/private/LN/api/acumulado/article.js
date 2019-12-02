import get from 'lodash.get';
import Image from '../common/image';
import Author from './acuAuthor';

const articleItem = article => {
    const {
        _id: id,
        subtype,
        headlines: { basic: titulo, mobile: tituloMobile },
        credits: { by: authors }
    } = article;

    const image = get(article, 'promo_items.basic');

    const resp = {
        id,
        subtype,
        titulo: tituloMobile || titulo
    };

    if (image && image.type === 'image') {
        resp.imagen = Image(image);
    }

    if (authors) {
        const authorsFixed = authors.filter(v => v.type === 'author');
        if (authorsFixed.length > 0) {
            resp.autor = Author(authorsFixed[0]);
        }
    }

    return resp;
};

export default articleItem;
