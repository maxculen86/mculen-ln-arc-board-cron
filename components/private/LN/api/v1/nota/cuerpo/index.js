import get from 'lodash.get';
import DefaultCuerpo from './defaultCuerpo';
import RecetaCuerpo from './recetaCuerpo';
import htmlCuerpo from './htmlCuerpo';
import fotoAlCienCuerpo from './fotoAlCienCuerpo';

const cuerpoIndex = article => {
    const templates = {
        '1': DefaultCuerpo,
        '7': RecetaCuerpo,
        '8': fotoAlCienCuerpo,
        '9': htmlCuerpo                
    };

    if (!article.content_elements) return null;

    const contentElements = article.content_elements;
    const infographic = get(article, 'promo_items.basic');

    if (article.subtype === '2' && infographic) {
        contentElements.unshift(infographic);
    }
    
    return templates[article.subtype](contentElements);

};

export default cuerpoIndex;
