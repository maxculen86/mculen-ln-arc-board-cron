import { NormalModuleReplacementPlugin } from 'webpack';
import get from '../../../../../../../common/utils/get';
import { parse } from 'node-html-parser';

export const CardAnexo = article => {
    const url = get(article[0], 'url', null);
    const alto = get(article[0], 'alto', null);

    if (url && alto) return [{ src: url, url, alto }];

    const html = get(article[0], 'html', null);

    if (html) {
        const structure = parse(html).structure;

        if (structure.includes('iframe')) {
            const root = parse(html);
            const iFrameElement = root.querySelector('iframe');
            const srcAtributte = iFrameElement.getAttribute('src');
            const heightAtributte =
                iFrameElement.getAttribute('height') ?? null;
            const heightMobileAttribute =
                iFrameElement.getAttribute('height-mobile') ?? null;

            if (
                !heightAtributte &&
                !heightMobileAttribute &&
                !validateYoutubeUrl(srcAtributte)
            )
                return null;

            const height = heightAtributte ? parseInt(heightAtributte) : null;
            const heightMobile = heightMobileAttribute
                ? parseInt(heightMobileAttribute)
                : null;

            if (
                !heightAtributte &&
                !heightMobileAttribute &&
                validateYoutubeUrl(srcAtributte)
            )
                return [
                    {
                        src: html,
                        alto: 300
                    }
                ];

            if (heightAtributte || heightMobileAttribute)
                return [
                    {
                        src: html,
                        alto: heightMobile ?? height
                    }
                ];
        }

        if (structure.includes('div')) {
            const root = parse(html);
            const divElement = root.querySelector('div');

            if (!divElement) {
                return null;
            }

            const heightAttribute = divElement.getAttribute('height') ?? null;
            const heightMobileAttribute =
                divElement.getAttribute('height-mobile') ?? null;

            if (!heightAttribute && !heightMobileAttribute) return null;

            const height = heightAttribute ? parseInt(heightAttribute) : null;
            const heightMobile = heightMobileAttribute
                ? parseInt(heightMobileAttribute)
                : null;

            return [
                {
                    src: html,
                    alto: heightMobile ?? height
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
