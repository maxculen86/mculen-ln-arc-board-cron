import htmlText from '../../../../../common/elements/story/cuerpo/elements/htmlText';

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
