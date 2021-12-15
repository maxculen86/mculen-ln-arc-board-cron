import htmlText from './htmlText';

const text = (nodo, dataNota) => {
    if (!nodo) return null;

    return htmlText(nodo.content);
};
export default text;
