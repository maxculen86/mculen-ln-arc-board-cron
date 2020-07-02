import htmlText from './htmlText';

const text = dataText => {
    if (!dataText) return null;

    const valor = htmlText(dataText.content);
    if (!valor) return null;
    return {
        _t: 'p',
        valor: valor
    };
};

text.type = 'text';

export default text;
