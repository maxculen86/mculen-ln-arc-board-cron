import get from 'lodash.get';

const quote = dataQuote => {
    if (!dataQuote) return null;

    const textCita = get(dataQuote, 'content_elements');
    if (!textCita || !textCita.length) return null;

    const resp = {
        _t: dataQuote.subtype === 'pullquote' ? 'textual' : 'des',
        valor: []
    };

    textCita.forEach(e => {
        resp.valor.push(e.content);
    });

    if (dataQuote.subtype === 'pullquote') {
        const authorQuote = get(dataQuote, 'citation.content');
        if (authorQuote) resp.valor.push({ _t: 'fue', valor: authorQuote });
    }

    return {
        _t: 'p',
        valor: resp
    };
};

quote.type = 'quote';

export default quote;
