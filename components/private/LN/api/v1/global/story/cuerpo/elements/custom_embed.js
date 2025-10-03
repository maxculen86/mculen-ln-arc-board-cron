import get from '../../../../../../../common/utils/get';
import header from './header';
import htmlText from '../../../../../common/elements/story/cuerpo/elements/htmlText';
import image from './image';
import videoJW from './videoJW';

const getTime = time => {
    if (time) {
        const timeSplit = time.split(':');
        if (timeSplit && timeSplit[1]) {
            return timeSplit[0].concat(':').concat(timeSplit[1]);
        }
    }

    return null;
};
const customEmbed = (nodo, dataNota) => {
    if (
        !nodo ||
        ![
            'custom-parallax',
            'custom-liveblog',
            'custom-video-jw',
            'video_jw'
        ].includes(nodo.subtype)
    )
        return null;

    const res = [];

    if (nodo.subtype === 'custom-video-jw' || nodo.subtype === 'video_jw') {
        const videoJWElement = get(nodo, 'embed.config.videoJw', null);
        res.push(videoJW(videoJWElement));
        return res;
    }

    const titleElement = get(nodo, 'embed.config.title', null);
    const time = getTime(get(nodo, 'embed.config.time', null));
    if (titleElement) {
        const objTitle = {
            type: 'header',
            content: titleElement
        };
        if (nodo.subtype === 'custom-liveblog') {
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