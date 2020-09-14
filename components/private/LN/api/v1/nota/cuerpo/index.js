import get from 'lodash.get';
import DefaultCuerpo from './templates/default';
import RecetaCuerpo from './templates/receta';
import htmlCuerpo from './templates/htmlLibre';
import fotoAlCienCuerpo from './templates/fotoAlCien';

const cuerpoIndex = article => {
    const templates = {
        '1': DefaultCuerpo,
        '2': DefaultCuerpo,
        '4': DefaultCuerpo,
        '7': RecetaCuerpo,
        '8': fotoAlCienCuerpo,
        '9': htmlCuerpo
    };

    if (!article.content_elements) throw new Error('Esta nota no posee cuerpo');

    const contentElements = article.content_elements;
    const infographic = get(article, 'promo_items.basic');

    if (article.subtype === '2' && infographic) {
        contentElements.unshift(infographic);
    }

    try {
        return templates[article.subtype](contentElements);
    } catch (err) {
        err.message = `El ID de template ${article.subtype} no esta declarado`;
        throw err;
    }
};

export default cuerpoIndex;
