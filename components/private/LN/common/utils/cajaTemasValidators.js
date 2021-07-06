/* eslint-disable no-underscore-dangle */
import PropTypes from 'fusion:prop-types';
import get from '../../../common/utils/get';

export const validateFeature = (idCollection, articles, layout) => {
    const message =
        (!layout && 'Se requiere que seleccione una diagramación') ||
        (!idCollection &&
            'Se requiere el id de la colección de la caja de temas') ||
        (idCollection &&
            articles.length === 0 &&
            `La colección ${idCollection} no encontró notas`);

    return message && { type: 'warning', message };
};

export const validateChainManual = (childrenProps, layout) => {
    const minimun = (layout && Number(layout.slice(-1))) || 3;

    const invalidFeature = childrenProps.some(
        children =>
            !(
                children.collection === 'features' &&
                children.type === 'LN-common/articulo'
            )
    );

    const message =
        (!layout && 'Se requiere que seleccione una diagramación') ||
        (invalidFeature &&
            'El Chain Caja Manual sólo admite Features del tipo LN Artículo') ||
        (get(childrenProps, 'length') < minimun &&
            `Se requiere la carga de ${minimun -
                get(childrenProps, 'length')} artículo${
                minimun - get(childrenProps, 'length') > 1 ? 's' : ''
            }`) ||
        null;

    return message && { type: 'warning', message };
};

export const validateArticleFeature = (id, content) => {
    const error =
        (!id && {
            type: 'warning',
            message: 'El campo Id de la Nota es obligatorio.'
        }) ||
        (!content && {
            type: 'info',
            message: 'Cargando...'
        }) ||
        null;

    return error;
};

export const getCajaTemaConfig = (featureId, renderables, cajaTemaConfig) => {
    const parent = renderables.find(
        elem =>
            elem.collection === 'chains' &&
            elem.type === 'Ln_Caja_Manual' &&
            elem.children &&
            elem.children.some(
                child => child && child.props && child.props.id === featureId
            )
    );
    const index =
        parent &&
        parent.children.findIndex(elem => elem && elem.props.id === featureId);

    const directionFocal =
        parent &&
        parent.props &&
        parent.props.customFields &&
        parent.props.customFields.layout;

    return get(cajaTemaConfig, `${directionFocal}.articles[${index}]`, null);
};

export const getCommonPropsJson = props => {
    const {
        customFields: { layout = '' }
    } = props;
    const { collectionsInPage = [] } = [];
    const notesQuantity = (layout && Number(layout.slice(-1))) || 3;

    return {
        collectionsInPage,
        notesQuantity
    };
};

export const flattenArray = arr1 => {
    return arr1.reduce(
        (acc, val) =>
            Array.isArray(val)
                ? acc.concat(flattenArray(val))
                : acc.concat(val),
        []
    );
};

export const getIdsArticlesFromOtherCollections = (
    renderables,
    collectionsInPage
) => {
    const chainsCollections = renderables.filter(
        ren => ren.collection === 'chains' && ren.type === 'Ln_Caja_Collection'
    );

    const articlesViewables = chainsCollections.map(chain => {
        const layoutChain = get(chain, 'props.customFields.layout', '');
        const position = get(chain, 'props.customFields.initialPosition', 1);
        const arts = getArticlesFromMyCurrentCollection(
            collectionsInPage,
            get(chain, 'props.customFields.idCollection', null),
            Number(position) - 1,
            Number(layoutChain.slice(-1))
        );

        return arts.map(art => art._id);
    });

    return flattenArray(articlesViewables);
};

export const getArticlesFromMyCurrentCollection = (
    collections,
    idCollection,
    initialPosition,
    notesQuantity
) => {
    const currentCollection = collections.find(
        collect => collect.idCollection === idCollection
    );

    if (!currentCollection) return [];

    const articlesFiltered = currentCollection.articles
        ? currentCollection.articles.slice(
              initialPosition,
              initialPosition + notesQuantity
          )
        : [];

    return articlesFiltered;
};
