import get from '../../../../components/private/common/utils/get';

const scriptDataLayerNota = document.getElementById('scriptDataLayerNota');

const id = scriptDataLayerNota.getAttribute('data-id');
const valor = scriptDataLayerNota.getAttribute('data-valor');
const pageType = scriptDataLayerNota.getAttribute('data-page-type');
const subtype = JSON.parse(scriptDataLayerNota.getAttribute('data-subtype'));

window.dataLayer = window.dataLayer || [];

const metarefresh = localStorage.getItem('CDmetaRefresh');
const countNotas = localStorage.getItem('countNotas');

const metarefreshValue = metarefresh != null ? 'yes' : 'no';
const countNotasValue = countNotas || '0';
const isListenable = get(window, 'Fusion.globalContent.isListenable', false)
    ? 'si'
    : 'no';

if (metarefreshValue === 'yes') {
    localStorage.removeItem('CDmetaRefresh');
}

const dataLayerObj = {
    metarefresh: metarefreshValue,
    pagetype: pageType,
    subtype: (subtype && subtype.nombre && subtype.nombre.toLowerCase()) || '',
    valor,
    nota_id: id,
    notasLeidas: countNotasValue,
    contiene_audio: isListenable
};

window.dataLayer.push(dataLayerObj);
