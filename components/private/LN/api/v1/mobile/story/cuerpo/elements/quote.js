import get from 'lodash.get';

const quote = (nodo, dataNota) => {
    if (!nodo) return null;

    const textCita = get(nodo, 'content_elements');
    if (!textCita || !textCita.length) return null;

    const resp = {
        _t: nodo.subtype,
        value: textCita[0].content
    };
    if (!(typeof resp.value === 'string' || resp.value instanceof String))
        return null;

    if (nodo.subtype === 'pullquote') {
        const authorQuote = get(nodo, 'citation.content');
        if (authorQuote) resp.author = authorQuote;
    }

    return resp;
};

export default quote;
