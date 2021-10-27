import { OPTA_WIDGET_URL } from 'fusion:environment';
import getEmbedHref from '../../../../../../../common/utils/getEmbedHref';

const html = (nodo, dataNota) => {
    if (!nodo || !nodo.content) return null;
    const { _id: notaId } = dataNota;
    const { _id: contentId, content } = nodo;
    const hrefRegex = new RegExp('(?<=</?)([^ >/]+)');
    const htmlTag = hrefRegex.exec(nodo.content)[1];

    const resp = {
        _t: 'ext'
    };

    switch (htmlTag) {
        case 'iframe':
            resp.src = getEmbedHref('src', content).trim();
            resp.id = 'ifrme';
            break;
        case 'opta-widget':
            resp.src = `${OPTA_WIDGET_URL}/${contentId}/${notaId}/?_website=la-nacion-ar&outputType=opta`;
            resp.id = 'html';
            break;
        default:
            resp.id = 'html';
            resp.src = content;
            break;
    }

    return {
        _t: 'p',
        valor: resp
    };
};

html.type = 'raw_html';

export default html;
