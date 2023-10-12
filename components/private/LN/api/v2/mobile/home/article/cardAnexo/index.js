import get from '../../../../../../../common/utils/get';
import { parse } from 'node-html-parser';

export const CardAnexo = article => {
    const url = get(article[0], 'url', null);
    const alto = get(article[0], 'alto', null);

    if (url && alto) return [{ src: url, url, alto }];

    const html = get(article[0], 'html', null);

    if (html) {
        const htmlNode = parse(html).firstChild;
        const srcAtributte = htmlNode.getAttribute('src');
        if (srcAtributte && validateYoutubeUrl(srcAtributte)) {
            return [
                {
                    src: srcAtributte,
                    alto: 300
                }
            ];
        }
    }

    return null;
};

const validateYoutubeUrl = url => {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
        return url.match(p)[1];
    }
    return false;
};

export default CardAnexo;
