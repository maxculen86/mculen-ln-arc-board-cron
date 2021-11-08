import get from 'lodash.get';
import DefaultCuerpo from '../../../common/nota/cuerpo/templates/default';
import RecetaCuerpo from './templates/receta';
import htmlCuerpo from './templates/htmlLibre';
import fotoAlCienCuerpo from './templates/fotoAlCien';
import Header from '../cuerpo/elements/header';
import Text from '../cuerpo/elements/text';
import Video from '../cuerpo/elements/video';
import Image from '../cuerpo/elements/image';
import List from '../cuerpo/elements/list';
import Quote from '../cuerpo/elements/quote';
import Gallery from '../cuerpo/elements/gallery';
import Embed from '../cuerpo/elements/embed';
import Html from '../cuerpo/elements/htmlContent';
import Button from '../cuerpo/elements/button';

const cuerpoIndex = dataNota => {
    const components = [
        Text,
        Header,
        Image,
        Video,
        List,
        Quote,
        Gallery,
        Embed,
        Html,
        Button
    ];
    const templates = {
        '1': DefaultCuerpo,
        '2': DefaultCuerpo,
        '4': DefaultCuerpo,
        '5': DefaultCuerpo,
        '6': DefaultCuerpo,
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
        return templates[dataNota.subtype](dataNota, components);
    }

    throw new Error(`El ID de template ${dataNota.subtype} no esta declarado`);
};

export default cuerpoIndex;
