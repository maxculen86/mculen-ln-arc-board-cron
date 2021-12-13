import get from 'lodash.get';
import htmlText from './htmlText';
import { removeEmptyItems } from '../../../../common/utils/responseCleaner';

const quote = (nodo, dataNota) => {
    if (!nodo) return null;

    const textCita = get(nodo, 'content_elements');
    if (!textCita || !textCita.length) return null;

    const items = [];

    textCita.forEach(e => {
        items.push(htmlText(e.content));
    });

    if (nodo.subtype === 'pullquote') {
        const authorQuote = get(nodo, 'citation.content');
        if (authorQuote) items.push(htmlText(authorQuote));
    }

    const resp = removeEmptyItems(items);

    return resp.length > 0 ? resp.join('\n') : null;
};
export default quote;
