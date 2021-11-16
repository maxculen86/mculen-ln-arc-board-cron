import get from 'lodash.get';

const quote = (nodo, dataNota) => {
    if (!nodo) return null;

    const textCita = get(nodo, 'content_elements');
    if (!textCita || !textCita.length) return null;

    const resp = {
        _t: nodo.subtype === 'pullquote' ? 'textual' : 'des',
        valor: []
    };

    textCita.forEach(e => {
        resp.valor.push(e.content);
    });

    if (nodo.subtype === 'pullquote') {
        const authorQuote = get(nodo, 'citation.content');
        if (authorQuote) resp.valor.push({ _t: 'fue', valor: authorQuote });
    }

    return {
        _t: 'p',
        valor: resp
    };
};
export default quote;
