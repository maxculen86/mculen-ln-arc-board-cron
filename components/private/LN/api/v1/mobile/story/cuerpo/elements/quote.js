import get from '../../../../../../../common/utils/get';
import { validateValueText } from '../../../../common/utils/validateValue';

const quote = (nodo, dataNota) => {
    if (!nodo) return null;

    const textCita = get(nodo, 'content_elements');
    if (!textCita || !textCita.length) return null;

    const resp = {
        _t: nodo.subtype,
        value: textCita[0].content
    };
    if (validateValueText(resp.value)) return null;
    if (nodo.subtype === 'pullquote') {
        const authorQuote = get(nodo, 'citation.content');
        if (authorQuote) resp.author = authorQuote;
    }

    return resp;
};

export default quote;
