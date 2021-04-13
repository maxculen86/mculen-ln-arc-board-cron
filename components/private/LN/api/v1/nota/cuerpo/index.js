import get from 'lodash.get';
import DefaultCuerpo from './templates/default';
import RecetaCuerpo from './templates/receta';
import htmlCuerpo from './templates/htmlLibre';
import fotoAlCienCuerpo from './templates/fotoAlCien';

const cuerpoIndex = dataNota => {
    const templates = {
        '1': DefaultCuerpo,
        '2': DefaultCuerpo,
        '4': DefaultCuerpo,
        '7': RecetaCuerpo,
        '8': fotoAlCienCuerpo,
        '9': htmlCuerpo,
        '10': DefaultCuerpo
    };

    const contentElements = dataNota.content_elements;
    if (!contentElements) throw new Error('Esta nota no posee cuerpo');

    const infographic = get(dataNota, 'promo_items.basic');

    if (dataNota.subtype === '2' && infographic) {
        contentElements.unshift(infographic);
    }

    if (templates[dataNota.subtype]) {
        return templates[dataNota.subtype](dataNota);
    }

    throw new Error(`El ID de template ${dataNota.subtype} no esta declarado`);
};

export default cuerpoIndex;
