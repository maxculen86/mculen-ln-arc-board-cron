import htmlContent from '../../../../../common/elements/story/cuerpo/elements/htmlContent';

const html = (nodo, notaId) => {
    const valorNodo = htmlContent(nodo, notaId);
    if (valorNodo) {
        return {
            _t: 'p',
            valor: valorNodo
        };
    }
    return null;
};
export default html;
