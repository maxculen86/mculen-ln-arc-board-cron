import dataLayerScriptNota from '../../../LN/nota/dataLayer/dataLayerScriptNota';

const generico = {
    id: '0',
    nombre: 'Default',
    execute: (name, ...args) => {
        return generico[name] && generico[name](...args);
    },
    getDataLayer: globalContent => {
        return dataLayerScriptNota(globalContent);
    }
};

export default generico;
