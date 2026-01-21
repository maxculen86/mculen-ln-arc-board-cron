import { parse } from 'node-html-parser';
import get from '../../../../../../../common/utils/get';
import trimIfNotEmpty from '../../../../../../../common/utils/trimIfNotEmpty';
import cleanHtmlAttributes from '../../../../../../../common/utils/cleanHtmlAttributes';


const YOUTUBE_REGEX =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?$/;

const getYoutubeVideoId = url => {
    const match = url?.match(YOUTUBE_REGEX);
    return match ? match[1] : null;
};
const isYoutubeUrl = url =>
    Boolean(getYoutubeVideoId(url));

const parseHeight = value =>
    value ? parseInt(value, 10) : null;

const build = (src, url, alto) => [
    { src, ...(url && { url }), ...(alto && { alto }) }
];

const EXCLUDED_URLS = [
    'https://carrousel.lanacion.com.ar/web_stories/',
    'https://especialess3.lanacion.com.ar/ComercialLN/carrousel/'
];

const isExcludedUrl = url =>
    EXCLUDED_URLS.some(excluded => url?.includes(excluded));

const fromUrl = (url, alto) => {
    if (!url || !alto) return null;
    if (isExcludedUrl(url)) return null;

    return build(url, url, alto);
};

const fromIframe = (html, iframe) => {
    if (!iframe) return null;

    const src = iframe.getAttribute('src');
    const height = parseHeight(iframe.getAttribute('height'));
    const heightMobile = parseHeight(
        iframe.getAttribute('height-mobile')
    );

    const hasHeight = height || heightMobile;
    const isYoutube = isYoutubeUrl(src);

    if (!hasHeight && !isYoutube) return null;

    return build(
        html,
        src,
        heightMobile ?? height ?? 300
    );
};

const fromDiv = (html, div) => {
    if (!div) return null;

    const height = parseHeight(div.getAttribute('height'));
    const heightMobile = parseHeight(
        div.getAttribute('height-mobile')
    );

    if (!height && !heightMobile) return null;

    return build(html, null, heightMobile ?? height);
};

const fromHtml = html => {
    if (!html) return null;

    const root = parse(html);

    return (
        fromIframe(html, root.querySelector('iframe')) ||
        fromDiv(html, root.querySelector('div'))
    );
};



export function CardAnexo([articleData]) {
    const url = trimIfNotEmpty(get(articleData, 'url'));
    const alto = get(articleData, 'alto');
    const html = cleanHtmlAttributes(get(articleData, 'html'));

    return (
        fromUrl(url, alto) ||
        fromHtml(html) ||
        null
    );
}


export default CardAnexo;
