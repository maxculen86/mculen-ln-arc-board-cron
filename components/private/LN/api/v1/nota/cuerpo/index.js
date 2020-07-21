import DefaultCuerpo from './defaultCuerpo';
import RecetaCuerpo from './recetaCuerpo';

const cuerpoIndex = article => {

    if (!article.content_elements) return null;

    const {        
        promo_items: { basic: infographic }
    } = article;

    const contentElements = article.content_elements

    if (article.subtype == 2) {
        contentElements.unshift(infographic);
    }

    return article.subtype === '7'
        ? RecetaCuerpo(contentElements)
        : DefaultCuerpo(contentElements);
};

export default cuerpoIndex;
