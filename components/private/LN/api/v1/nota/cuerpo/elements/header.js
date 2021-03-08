import htmlText from './htmlText';

const header = (nodo, dataNota) => {
    if (!nodo) return null;

    const valor = htmlText(nodo.content);

    if (!valor) return null;

    return {
        _t: `sub${nodo.level}`,
        valor
    };
};

header.type = 'header';

export default header;
