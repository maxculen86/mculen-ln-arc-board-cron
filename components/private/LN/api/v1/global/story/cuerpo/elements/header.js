import htmlText from '../../../../common/story/cuerpo/elements/htmlText';

const header = (nodo, dataNota) => {
    if (!nodo) return null;

    const valor = htmlText(nodo.content);

    if (!valor) return null;

    return {
        _t: `sub${nodo.level}`,
        valor
    };
};

export default header;
