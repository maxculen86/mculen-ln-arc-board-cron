import get from './get';

const getIdCollectionFromGC = (globalContent = {}, defaultValue) => {
    const { acumuladoGeneral = {}, node_type: nodeType } = globalContent;

    if (!nodeType) return undefined;

    return nodeType === 'tags'
        ? acumuladoGeneral.collectionForTag
        : get(acumuladoGeneral, 'id_collection_promo_items', defaultValue);
};

export default getIdCollectionFromGC;
