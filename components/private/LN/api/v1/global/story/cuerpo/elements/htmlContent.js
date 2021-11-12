import htmlContent from '../../../../common/nota/cuerpo/elements/htmlContent';

const html = (nodo, notaId) => {
    return {
        _t: 'p',
        valor: htmlContent(nodo, notaId)
    };
};

export default html;
