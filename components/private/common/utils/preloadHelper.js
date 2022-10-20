import get from './get';

export const getIdCollectionFromGC = (globalContent = {}, defaultValue) => {
    const { acumuladoGeneral = {}, node_type: nodeType } = globalContent;

    if (!nodeType) return undefined;

    return nodeType === 'tags'
        ? acumuladoGeneral.collectionForTag
        : get(acumuladoGeneral, 'id_collection_promo_items', defaultValue);
};

export const verifyChainsBeforeGrid = (renderables = []) => {
    const sectionChildrens = [];

    renderables.forEach(({ collection, children, type }) => {
        if (collection === 'sections') {
            const cleanElements = children.map(child => ({
                type: child.type,
                collection: child.collection
            }));

            sectionChildrens.push(...cleanElements);
        }
    });

    const firstChainIndex = sectionChildrens.findIndex(
        item => item.collection === 'chains'
    );

    const gridIndex = sectionChildrens.findIndex(
        item => item.type === 'LN-acumulado/grillaNotas'
    );

    return (
        (firstChainIndex !== -1 && firstChainIndex < gridIndex) ||
        gridIndex === -1
    );
};

export const haveFeatureAcumuladoApertura = (renderables = []) =>
    renderables.find(
        ({ collection, type }) =>
            collection === 'features' && type === 'LN-acumulado/apertura'
    ) || false;

export const getDataPreloadAcu = (idCollectionApertura, nodeType) => {
    return {
        nodeType: idCollectionApertura ? '' : nodeType,
        collectionId: idCollectionApertura || '',
        imageConfig: idCollectionApertura ? 'aperturaAcu' : 'boxArticles'
    };
};
