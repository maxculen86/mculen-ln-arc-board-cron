import get from './get';

export const getIdCollectionFromGC = ({ globalContent = {}, defaultValue }) => {
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

const getImageConfig = (isLoadWithPicture, idCollectionApertura) => {
    if (isLoadWithPicture) {
        return idCollectionApertura ? 'newAperturaAcu' : 'newBoxArticles';
    }

    return idCollectionApertura ? 'aperturaAcu' : 'boxArticles';
};

export const getDataPreloadAcu = (
    idCollectionApertura,
    nodeType,
    isLoadWithPicture = false
) => {
    return {
        nodeType: idCollectionApertura ? '' : nodeType,
        collectionId: idCollectionApertura || '',
        // TODO: Sacar funcion getImageConfig y agregar el imageConfig respectivo una vez se implemente carga con picture en todos los acumulados
        imageConfig: getImageConfig(isLoadWithPicture, idCollectionApertura)
    };
};

export const excludePreloadAcu = ({
    nodeType = '',
    id = '',
    hasFeatureAcumuladoApertura,
    idCollectionApertura,
    hasChainBeforeGrid
}) => {
    return (
        nodeType === 'section' &&
        id !== '/ultimas-noticias' &&
        (!hasFeatureAcumuladoApertura ||
            (!idCollectionApertura && hasChainBeforeGrid))
    );
};
