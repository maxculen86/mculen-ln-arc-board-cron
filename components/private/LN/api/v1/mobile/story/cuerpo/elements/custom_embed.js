import buildEmbedCll from '../../../../../../../common/utils/embedCllHelper';
import get from '../../../../../../../common/utils/get';
import html from '../../../../../common/elements/story/cuerpo/elements/htmlContent';
import header from './header';
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

// eslint-disable-next-line no-unused-vars
const customEmbed = (nodo, dataNota) => {
    if (
        !nodo ||
        ![
            'custom-parallax',
            'custom-liveblog',
            'custom-video-jw',
            'video_jw',
            'custom-how-to',
            'canchallena',
            'gallery-embed'
        ].includes(nodo.subtype)
    )
        return null;

    const res = [];

    if (nodo.subtype === 'custom-video-jw' || nodo.subtype === 'video_jw') {
        const videoJWElement = get(nodo, 'embed.config.videoJw', null);
        res.push(videoJW(videoJWElement));
        return res;
    }

    if (nodo.subtype === 'canchallena') {
        const id = get(nodo, '_id');
        const content = buildEmbedCll(nodo);
        if (content) return html({ _id: id, content, type: 'raw_html' });

        return null;
    }

    const time = getTime(get(nodo, 'embed.config.time', null));
    const title = get(nodo, 'embed.config.title', '') ?? '';
    const step = get(nodo, 'embed.config.step', '') ?? '';

    if (nodo.subtype === 'custom-how-to') {
        const objTitle = {
            _t: 'header',
            level: 1,
            value: `${step} - ${title}`
        };
        res.push(objTitle);
        return res;
    }

    if (nodo.subtype === 'gallery-embed') {
        const allImages = get(nodo, 'embed.config.galleryImages', []);
        const caption = get(nodo, 'embed.config.caption', '');
        const count = get(nodo, 'embed.config.count', 0);

        const selected = allImages.slice(0, count);

        const total = selected.length;

        selected.forEach((img, index) => {
            const mapped = {
                _t: 'image',
                url: img.url
            };

            if (caption && (total === 1 || index === total - 1)) {
                mapped.epigraph = caption;
            }

            res.push(mapped);
        });

        return res;
    }

    if (title) {
        const objTitle = {
            type: 'header',
            content: title
        };
        if (nodo.subtype === 'custom-liveblog') {
            objTitle.level = 1;
            if (time) {
                objTitle.content = time.concat(' '.concat(title));
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
        res.push({ _t: 'text', valor: paragraphElement });
    }

    if (res.length === 0) return null;

    return res;
};

export default customEmbed;
