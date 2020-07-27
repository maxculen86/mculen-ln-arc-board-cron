import DefaultCuerpo from './defaultCuerpo';
import RecetaCuerpo from './recetaCuerpo';
import get from 'lodash.get';

const cuerpoIndex = article => {

    if (!article.content_elements) return null;

    const contentElements = article.content_elements
    const infographic = get(article,'promo_items.basic');
    
    if (article.subtype == 2 && infographic) {
        contentElements.unshift(infographic);
    }

    return article.subtype === '7'
        ? RecetaCuerpo(contentElements)
        : DefaultCuerpo(contentElements);
};

export default cuerpoIndex;
