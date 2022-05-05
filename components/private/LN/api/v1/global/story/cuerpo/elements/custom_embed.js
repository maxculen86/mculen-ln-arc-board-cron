import get from '../../../../../../../common/utils/get';
import header from './header';
import htmlText from '../../../../common/story/cuerpo/elements/htmlText';
import image from './image';

const customEmbed = (nodo, dataNota) => {
    if (!nodo && nodo.subtype !== 'custom-parallax') return null;

    const res = [];

    const titleElement = get(nodo, 'embed.config.title', null);
    if (titleElement) {
        res.push(
            header({
                type: 'header',
                level: 2,
                content: 'Subtitulo 2'
            })
        );
    }

    const imageElement = get(nodo, 'embed.config.imageId', null);
    if (imageElement) {
        res.push(image(imageElement));
    }

    const paragraphElement = get(nodo, 'embed.config.paragraph', null);
    if (paragraphElement) {
        res.push({ _t: 'p', valor: htmlText(paragraphElement) });
    }

    return res;
};

export default customEmbed;

// {
//     "_id": "CQTCQCNHQJDNJN7S5BNF5J7ZIM",
//     "type": "header",
//     "level": 2,
//     "additional_properties": {
//         "_id": "1645627518445",
//         "comments": [],
//         "inline_comments": []
//     },
//     "content": "Subtitulo 2"
// }
