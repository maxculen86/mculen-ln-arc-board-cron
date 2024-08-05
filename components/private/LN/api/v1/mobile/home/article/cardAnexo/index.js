import { parse } from 'node-html-parser';
import get from '../../../../../../../common/utils/get';

export const CardAnexo = article => {
    const url = get(article[0], 'url', null);
    const alto = get(article[0], 'alto', null);
    const html = get(article[0], 'html', null);

    if (url && alto) return [{ src: url, url, alto }];

    if (html) {
        const root = parse(html);
        const structure = root.structure;
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

            const height = heightAttribute ? parseInt(heightAttribute) : null;
            const heightMobile = heightMobileAttribute
                ? parseInt(heightMobileAttribute)
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
};

const validateYoutubeUrl = url => {
    const isYoutubeUrlRegex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(isYoutubeUrlRegex)) {
        return url.match(isYoutubeUrlRegex)[1];
    }
    return false;
};

export default CardAnexo;
