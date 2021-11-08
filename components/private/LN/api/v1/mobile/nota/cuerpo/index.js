import Header from './elements/header';
import Text from './elements/text';
import Video from './elements/video';
import Image from './elements/image';
import List from './elements/list';
import Quote from './elements/quote';
import Gallery from './elements/gallery';
import Embed from './elements/embed';
import Html from './elements/htmlContent';
import Button from './elements/button';
import body from '../../../common/nota/cuerpo/index';

const cuerpoIndex = dataNota => {
    const elementBySubtype = {
        '1': {
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
        },
        '7': {
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
        },
        '8': { Text, Image }
    };

    return body(dataNota, elementBySubtype);

    // const defaultTemplateElements = [
    //     Text,
    //     Header,
    //     Image,
    //     Video,
    //     List,
    //     Quote,
    //     Gallery,
    //     Embed,
    //     Html,
    //     Button
    // ];

    // const photoTemplateElements = [Text, Image];

    // const data = [
    //     {
    //         template: 'default',
    //         elements: defaultTemplateElements
    //     },
    //     {
    //         template: '9',
    //         elements: photoTemplateElements
    //     }
    // ];

    // const res = {
    //     '7': RecetaCuerpo,
    //     '8': fotoAlCienCuerpo(dataNota),
    //     '9': htmlCuerpo
    // };

    // return res[dataNota.subtype] || defaultCuerpo(dataNota,);

    // const templates = {
    //     '1': DefaultCuerpo,
    //     '2': DefaultCuerpo,
    //     '4': DefaultCuerpo,
    //     '5': DefaultCuerpo,
    //     '6': DefaultCuerpo,
    //     '7': RecetaCuerpo,
    //     '8': fotoAlCienCuerpo,
    //     '9': htmlCuerpo,
    //     '10': DefaultCuerpo
    // };

    // const contentElements = dataNota.content_elements;
    // if (!contentElements) throw new Error('Esta nota no posee cuerpo');

    // const infographic = get(dataNota, 'promo_items.basic');

    // if (dataNota.subtype === '2' && infographic) {
    //     contentElements.unshift(infographic);
    // }

    // if (templates[dataNota.subtype]) {
    //     return templates[dataNota.subtype](dataNota);
    // }

    // throw new Error(`El ID de template ${dataNota.subtype} no esta declarado`);
};

export default cuerpoIndex;
