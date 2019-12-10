import DefaultCuerpo from './defaultCuerpo';
import RecetaCuerpo from './recetaCuerpo';

const cuerpoIndex = article => {
    const { content_elements: contentElements } = article;
    return article.subtype === '7'
        ? RecetaCuerpo(contentElements)
        : DefaultCuerpo(contentElements);
};

export default cuerpoIndex;
