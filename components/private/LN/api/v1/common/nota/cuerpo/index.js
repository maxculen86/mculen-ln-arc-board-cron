import get from 'lodash.get';
import DefaultCuerpo from './templates/default';
import RecetaCuerpo from './templates/receta';
import htmlCuerpo from './templates/htmlLibre';
import fotoAlCienCuerpo from './templates/fotoAlCien';

const body = (dataNota, elementBySubtype) => {
    const subtype = get(dataNota, 'subtype', '');
    if (!subtype) throw Error('The story does not have subtype');

    const contentElements = get(dataNota, 'content_elements', '');
    if (!contentElements) throw new Error('The story does not have body');

    const infographic = get(dataNota, 'promo_items.basic');
    if (subtype === '2' && infographic) {
        contentElements.unshift(infographic);
    }

    const templates = {
        '7': RecetaCuerpo(dataNota, elementBySubtype[7]),
        '8': fotoAlCienCuerpo(dataNota, elementBySubtype[8]),
        '9': htmlCuerpo(dataNota)
    };

    return 'hola';
    return templates[subtype] || DefaultCuerpo(dataNota, elementBySubtype[1]);
};

export default body;
