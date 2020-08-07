import dataLayerScriptNota from '../../../LN/nota/dataLayer/dataLayerScriptNota';

const storytelling = {
    id: '5',
    nombre: 'Storytelling',
    getDataLayer: globalContent => {
        return dataLayerScriptNota(globalContent);
    }
}

export default storytelling;
