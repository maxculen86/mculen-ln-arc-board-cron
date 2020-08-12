import get from 'lodash.get';

import DefaultCuerpo from './defaultCuerpo';
import RecetaCuerpo from './recetaCuerpo';
import htmlCuerpo from './htmlCuerpo';
import fotoAlCienCuerpo from './fotoAlCienCuerpo';

const cuerpoIndex = article => {
    if (!article.content_elements) return null;

    const contentElements = article.content_elements;
    const infographic = get(article, 'promo_items.basic');

    if (article.subtype === '2' && infographic) {
        contentElements.unshift(infographic);
    }

    let resp = '';

    if (article.subtype === '7') {
        resp = RecetaCuerpo(contentElements);
    } else if (article.subtype === '9') {
        resp = htmlCuerpo(contentElements);
    } else if (article.subtype === '8') {
        resp = fotoAlCienCuerpo(contentElements);
    } else {
        resp = DefaultCuerpo(contentElements);
    }

    return resp;
};

export default cuerpoIndex;
