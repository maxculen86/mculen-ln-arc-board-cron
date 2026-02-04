import buildEmbedCll from '../../../../../../../common/utils/embedCllHelper';
import get from '../../../../../../../common/utils/get';
import html from '../../../../../common/elements/story/cuerpo/elements/htmlContent';
import header from './header';
import image from './image';
import videoJW from './videoJW';

const VALID_SUBTYPES = [
    'custom-parallax',
    'custom-liveblog',
    'custom-video-jw',
    'video_jw',
    'custom-how-to',
    'canchallena',
    'gallery-embed'
];

const VIDEO_SUBTYPES = ['custom-video-jw', 'video_jw'];

const getTime = time => {
    if (time) {
        const timeSplit = time.split(':');
        if (timeSplit && timeSplit[1]) {
            return timeSplit[0].concat(':').concat(timeSplit[1]);
        }
    }

    return null;
};

const isValidSubtype = nodo => nodo && VALID_SUBTYPES.includes(nodo.subtype);

const handleVideo = nodo => {
    const videoJWElement = get(nodo, 'embed.config.videoJw', null);
    return [videoJW(videoJWElement)];
};

const handleCanchallena = nodo => {
    const id = get(nodo, '_id');
    const content = buildEmbedCll(nodo);

    return content ? html({ _id: id, content, type: 'raw_html' }) : null;
};

const handleHowTo = nodo => {
    const title = get(nodo, 'embed.config.title', '') ?? '';
    const step = get(nodo, 'embed.config.step', '') ?? '';

    return [
        {
            _t: 'header',
            level: 1,
            value: `${step} - ${title}`
        }
    ];
};

const handleGallery = nodo => {
    const images = get(nodo, 'embed.config.galleryImages', []);
    const caption = get(nodo, 'embed.config.caption', '');
    const count = get(nodo, 'embed.config.count', 0);

    const selected = images.slice(0, count);
    const total = selected.length;

    return selected.map((img, index) => {
        const mapped = {
            _t: 'image',
            url: img.url
        };

        if (caption && (total === 1 || index === total - 1)) {
            mapped.epigraph = caption;
        }

        return mapped;
    });
};

const buildDefaultContent = nodo => {
    const res = [];

    const time = getTime(get(nodo, 'embed.config.time', null));
    const title = get(nodo, 'embed.config.title', '') ?? '';

    if (title) {
        const objTitle = {
            type: 'header',
            level: nodo.subtype === 'custom-liveblog' ? 1 : 2,
            content: time ? `${time} ${title}` : title
        };
        res.push(header(objTitle));
    }

    const imageElement = get(nodo, 'embed.config.imageId', null);
    if (imageElement) {
        res.push(image(imageElement));
    }

    const paragraph = get(nodo, 'embed.config.paragraph', null);
    if (paragraph) {
        res.push({ _t: 'text', valor: paragraph });
    }

    return res.length ? res : null;
};

const embedHandlers = {
    canchallena: handleCanchallena,
    'custom-how-to': handleHowTo,
    'gallery-embed': handleGallery
};

const customEmbed = nodo => {
    if (!isValidSubtype(nodo)) return null;

    if (VIDEO_SUBTYPES.includes(nodo.subtype)) {
        return handleVideo(nodo);
    }

    return embedHandlers[nodo.subtype]
        ? embedHandlers[nodo.subtype](nodo)
        : buildDefaultContent(nodo);
};

export default customEmbed;
