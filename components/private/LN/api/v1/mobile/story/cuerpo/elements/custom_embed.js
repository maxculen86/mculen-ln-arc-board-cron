import get from '../../../../../../../common/utils/get';
import header from './header';
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
                content: titleElement
            })
        );
    }

    const imageElement = get(nodo, 'embed.config.imageId', null);
    if (imageElement) {
        res.push(image(imageElement));
    }

    const paragraphElement = get(nodo, 'embed.config.paragraph', null);
    if (paragraphElement) {
        res.push({ _t: 'text', valor: paragraphElement });
    }

    return res;
};

export default customEmbed;
