import get from 'lodash.get';
import defaultCuerpo from './templates/default';
import recetaCuerpo from './templates/receta';
import htmlCuerpo from './templates/htmlLibre';

const getInfographicElement = (infographic, subtype, contentElements) => {
    if (!contentElements) throw new Error('The story does not have body');

    if (subtype === '2' && infographic)
        return contentElements.unshift(infographic);

    return contentElements;
};

const storyBody = (dataNota, elementBySubtype) => {
    const { id } = dataNota;
    const subtype = get(dataNota, 'subtype', '');
    if (!subtype) throw Error('The story does not have subtype');

    const contentElements = getInfographicElement(
        get(dataNota, 'promo_items.basic', ''),
        subtype,
        get(dataNota, 'content_elements', '')
    );

    const templates = {
        '7': recetaCuerpo,
        '8': defaultCuerpo,
        '9': htmlCuerpo
    }[subtype];

    return templates
        ? templates(id, contentElements, elementBySubtype[subtype])
        : defaultCuerpo(id, contentElements, elementBySubtype[1]);
};

export default storyBody;
