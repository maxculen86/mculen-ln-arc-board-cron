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
        title: tituloMobile || titulo
    };

    if (image && image.type === 'image') {
        resp.image = Image(image);
    }

    if (authors && authors.length > 0) {
        resp.authors = authors.map(v => Author(v));
    }

    return resp;
};

export default articleItem;
