import htmlText from './htmlText';

const text = data => {
    const valor = htmlText(data.content);
    if (!valor) return null;
    return {
        _t: 'p',
        valor: valor
    };
};

text.type = 'text';

export default text;
