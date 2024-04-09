const scriptDataLayerNota = document.getElementById('scriptDataLayerNota');

const _id = scriptDataLayerNota.getAttribute('data-id');
const valor = scriptDataLayerNota.getAttribute('data-valor');
const pageType = scriptDataLayerNota.getAttribute('data-page-type');
const pageTypeText = scriptDataLayerNota.getAttribute('data-page-type-text');
const subtype = JSON.parse(scriptDataLayerNota.getAttribute('data-subtype'));

window.dataLayer = window.dataLayer || [];

const metarefresh = localStorage.getItem('CDmetaRefresh');
const countNotas = localStorage.getItem('countNotas');

const _metarefresh = metarefresh != null ? 'yes' : 'no';
const _countNotas = countNotas || '0';

if (_metarefresh === 'yes') {
    localStorage.removeItem('CDmetaRefresh');
}

const _dataLayer = {
    metarefresh: _metarefresh,
    pagetype: pageType,
    subtype: (subtype && subtype.nombre && subtype.nombre.toLowerCase()) || '',
    valor: valor,
    nota_id: _id
};

if (pageTypeText === 'nota') {
    _dataLayer.notasLeidas = _countNotas;
}

window.dataLayer.push(_dataLayer);
