import htmlText from './htmlText';

const text = (nodo, dataNota) => {
    if (!nodo) return null;

    const valor = htmlText(nodo.content);
    if (!valor) return null;
    return {
        _t: 'p',
        valor
    };
};

export default text;
