import get from '../../../../../../../common/utils/get';
import header from './header';
import htmlText from '../../../../common/story/cuerpo/elements/htmlText';
import image from './image';

const customEmbed = (nodo, dataNota) => {
    if (!nodo || !['custom-parallax', 'custom-liveblog'].includes(nodo.subtype))
        return null;

    const res = [];

    const titleElement = get(nodo, 'embed.config.title', null);
    const typeList = get(nodo, 'embed.config.typeList', null);
    const time = get(nodo, 'embed.config.time', null);
    if (titleElement) {
        const objTitle = {
            type: 'header',
            content: titleElement
        };
        if (typeList === 'liveblog') {
            objTitle.level = 1;
            if (time) {
                objTitle.content = time.concat(' '.concat(titleElement));
            }
        } else {
            objTitle.level = 2;
        }
        res.push(header(objTitle));
    }

    const imageElement = get(nodo, 'embed.config.imageId', null);
    if (imageElement) {
        res.push(image(imageElement));
    }

    const paragraphElement = get(nodo, 'embed.config.paragraph', null);
    if (paragraphElement) {
        res.push({ _t: 'p', valor: htmlText(paragraphElement) });
    }

    if (res.length === 0) return null;

    return res;
};

export default customEmbed;
