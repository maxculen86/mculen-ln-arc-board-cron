import htmlContent from '../../../../common/nota/cuerpo/elements/htmlContent';

const html = (nodo, notaId) => {
    return htmlContent(nodo, notaId);
};
html.type = 'raw_html';

export default html;
