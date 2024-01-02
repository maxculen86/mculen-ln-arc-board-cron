import { OPTA_WIDGET_URL } from 'fusion:environment';
import getEmbedHref from '../../../../../../../common/utils/getEmbedHref';
import BackendLnError from '../../../../../common/models/backendLnError';
import { enumTypeError } from '../../../../../common/enums/enumTypeError';

const html = (nodo, notaId) => {
    if (!nodo || !nodo.content) return null;
    const { _id: contentId, content } = nodo;
    const hrefRegex = new RegExp('(?<=</?)([^ >/]+)');
    const htmlTag = hrefRegex.exec(nodo.content)[1];

    const resp = {
        _t: 'ext'
    };
    switch (htmlTag) {
        case 'iframe':
            const src = getEmbedHref('src', content);
            if (!src) {
                console.error(
                    new BackendLnError(
                        `StoryId: ${notaId} - Iframe content: ${JSON.stringify(
                            nodo || {}
                        )}`,
                        enumTypeError.storyContentError
                    )
                );
                return null;
            }
            resp.src = src.trim();
            resp.id = 'ifrme';
            resp.arc_content = nodo;
            break;
        case 'opta-widget':
            resp.src = `${OPTA_WIDGET_URL}/${contentId}/${notaId}/?_website=la-nacion-ar&outputType=opta`;
            resp.id = 'html';
            resp.arc_content = nodo;
            break;
        default:
            resp.id = 'html';
            resp.src = content;
            resp.arc_content = nodo;
            break;
    }

    return resp;
};

html.type = 'raw_html';

export default html;
