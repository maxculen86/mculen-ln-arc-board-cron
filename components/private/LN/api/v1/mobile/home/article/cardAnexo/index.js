import get from '../../../../../../../common/utils/get';
import { parse } from 'node-html-parser';

export const CardAnexo = article => {
    const url = get(article[0], 'url', null);
    const alto = get(article[0], 'alto', null);

    if (url && alto) return [{ src: url, url, alto }];

    const html = get(article[0], 'html', null);

    if (html) {
        const htmlNode = parse(html).firstChild;
        const structure = parse(html).structure;

        if (structure.includes('iframe')) {
            const srcAtributte = htmlNode.getAttribute('src');
            if (srcAtributte && validateYoutubeUrl(srcAtributte)) {
                return [
                    {
                        src: srcAtributte,
                        url: srcAtributte,
                        alto: 300
                    }
                ];
            }
        }

        if (structure.includes('div')) {
            const root = parse(html);
            const divElement = root.querySelector('div');

            if (!divElement) {
                return null;
            }

            const highAttribute = divElement.getAttribute('high') ?? null;
            const highMobileAttribute =
                divElement.getAttribute('high-mobile') ?? null;

            if (!highAttribute && !highMobileAttribute) return null;

            const high = highAttribute ? parseInt(highAttribute) : null;
            const highMobile = highMobileAttribute
                ? parseInt(highMobileAttribute)
                : null;

            return [
                {
                    src: html,
                    alto: highMobile ?? high
                }
            ];
        }
    }

    return null;
};

const validateYoutubeUrl = url => {
    const isYoutubeUrlRegex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(isYoutubeUrlRegex)) {
        return url.match(isYoutubeUrlRegex)[1];
    }
    return false;
};

export default CardAnexo;
