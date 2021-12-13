import htmlText from './htmlText';

const header = (nodo, dataNota) => {
    if (!nodo) return null;

    return htmlText(nodo.content);
};

export default header;
