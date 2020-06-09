import get from 'lodash.get';

const quote = data => {
    const textCita = get(data, 'content_elements');
    if (!textCita && !textCita.length) return null;

    const resp = {
        _t: data.subtype == 'pullquote' ? 'textual' : 'des',
        valor: []
    };

    textCita.forEach(e => {
        resp.valor.push(e.content);
    });

    if (data.subtype == 'pullquote') {
        const authorQuote = get(data, 'citation.content');
        if (authorQuote) resp.valor.push({ _t: 'fue', valor: authorQuote });
    }

    return {
        _t: 'p',
        valor: resp
    };
};

quote.type = 'quote';

export default quote;
