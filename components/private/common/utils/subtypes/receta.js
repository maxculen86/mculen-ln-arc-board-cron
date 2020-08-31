/* eslint-disable import/no-cycle */
import dataLayerScriptReceta from '../../../LN/nota/dataLayer/dataLayerScriptReceta';
import generico from './generico';

const receta = {
    id: '7',
    nombre: 'Receta',
    execute: (name, ...args) => {
        return (
            (receta[name] && receta[name](...args)) ||
            (generico[name] && generico[name](...args))
        );
    },
    getDataLayer: () => {
        return dataLayerScriptReceta;
    }
};

export default receta;
