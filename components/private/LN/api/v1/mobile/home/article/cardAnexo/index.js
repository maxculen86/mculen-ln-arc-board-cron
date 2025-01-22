import { parse } from 'node-html-parser';
import get from '../../../../../../../common/utils/get';
import trimIfNotEmpty from '../../../../../../../common/utils/trimIfNotEmpty';
import cleanHtmlAttributes from '../../../../../../../common/utils/cleanHtmlAttributes';

const validateYoutubeUrl = url => {
    const isYoutubeUrlRegex =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(isYoutubeUrlRegex)) {
        return url.match(isYoutubeUrlRegex)[1];
    }
    return false;
};

function excludeAnexo(url) {
    const excludedUrls = [
        'https://carrousel.lanacion.com.ar/web_stories/',
        'https://especialess3.lanacion.com.ar/ComercialLN/carrousel/'
    ];
    return excludedUrls.some(excludedUrl => url.includes(excludedUrl));
}

export function CardAnexo([articleData]) {
    const alto = get(articleData, 'alto', null);
    const url = trimIfNotEmpty(get(articleData, 'url', null));
    const html = cleanHtmlAttributes(get(articleData, 'html', null));

    if (url && alto && !excludeAnexo(url)) return [{ src: url, url, alto }];

    if (html) {
        const root = parse(html);
        const { structure } = root;
        const isIframe = structure.includes('iframe');
        const isDiv = structure.includes('div');

        if (isIframe || isDiv) {
            const element = isIframe
                ? root.querySelector('iframe')
                : root.querySelector('div');

            if (!element) return null;

            const srcAtributte = element.getAttribute('src');
            const heightAttribute = element.getAttribute('height') ?? null;
            const heightMobileAttribute =
                element.getAttribute('height-mobile') ?? null;

            const height = heightAttribute
                ? parseInt(heightAttribute, 10)
                : null;
            const heightMobile = heightMobileAttribute
                ? parseInt(heightMobileAttribute, 10)
                : null;

            if (isIframe) {
                if (
                    !heightAttribute &&
                    !heightMobileAttribute &&
                    !validateYoutubeUrl(srcAtributte)
                ) {
                    return null;
                }

                return [
                    {
                        src: html,
                        url: trimIfNotEmpty(srcAtributte),
                        alto: heightMobile ?? height ?? 300
                    }
                ];
            }

            if (isDiv) {
                if (!heightAttribute && !heightMobileAttribute) return null;

                return [
                    {
                        src: html,
                        alto: heightMobile ?? height
                    }
                ];
            }
        }
    }

    return null;
}

export default CardAnexo;
