import get from './get';

export const getIdCollectionFromGC = ({ globalContent = {}, defaultValue }) => {
    const { acumuladoGeneral = {}, node_type: nodeType } = globalContent;

    if (!nodeType) return undefined;

    return nodeType === 'tags'
        ? acumuladoGeneral.collectionForTag
        : get(acumuladoGeneral, 'id_collection_promo_items', defaultValue);
};

export const getFirstChainItem = (renderables = []) => {
    const firstChain = renderables.find(
        ({ type: chainType, props }) =>
            (chainType === 'Ln_Caja_Manual' ||
                chainType === 'Ln_Caja_Collection') &&
            !get(props, 'customFields.hideCaja')
    );

    if (!firstChain) return {};

    const type = get(firstChain, 'type', '');
    const layout = get(firstChain, 'props.customFields.layout', '');

    // TODO: Cambiar types para cajas LN10, actualizar imageConfig cuando se carguen articulos LN10 en caja manual
    if (type === 'Ln_Caja_Manual' && layout !== 'grillaVideo1') {
        const {
            noteId,
            imageId = '',
            hideImage = false
        } = get(firstChain, 'children[0].props.customFields', {});

        return !hideImage
            ? {
                  articleId: noteId,
                  imageId,
                  imageConfig: 'featuredFocalIzquierdo'
              }
            : {};
    }

    if (type === 'Ln_Caja_Collection')
        return {
            collectionId: get(
                firstChain,
                'props.customFields.idCollection',
                ''
            ),
            initialPosition: get(
                firstChain,
                'props.customFields.initialPosition',
                0
            ),
            isFocal: layout.includes('focal'),
            imageConfig: 'm'
        };

    return {};
};

export const verifyChainsBeforeGrid = (renderables = []) => {
    const sectionChildrens = [];

    renderables.forEach(({ collection, children }) => {
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

const getImageConfig = idCollectionApertura =>
    idCollectionApertura ? 'newAperturaAcu' : 'newBoxArticles';

export const getDataPreloadAcu = (idCollectionApertura, nodeType) => ({
    nodeType: idCollectionApertura ? '' : nodeType,
    collectionId: idCollectionApertura || '',
    imageConfig: getImageConfig(idCollectionApertura)
});

const SECTIONS_EXCLUDED_FROM_PRELOAD_ACU = [
    '/ultimas-noticias',
    '/deportes',
    '/economia/dolar'
];

export const excludePreloadAcu = ({
    nodeType = '',
    id = '',
    hasFeatureAcumuladoApertura,
    idCollectionApertura,
    hasChainBeforeGrid
}) =>
    nodeType === 'section' &&
    !SECTIONS_EXCLUDED_FROM_PRELOAD_ACU.includes(id) &&
    (!hasFeatureAcumuladoApertura ||
        (!idCollectionApertura && hasChainBeforeGrid));
