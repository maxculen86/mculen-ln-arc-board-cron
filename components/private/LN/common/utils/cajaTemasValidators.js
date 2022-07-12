/* eslint-disable no-underscore-dangle */
import get from '../../../common/utils/get';
import getStreams from './getStreams';

export const validateFeature = (idCollection, articles, layout) => {
    const message =
        (!layout && 'Se requiere que seleccione una diagramación') ||
        (!idCollection &&
            'Se requiere el id de la colección de la caja de temas') ||
        (idCollection &&
            (!articles || articles.length === 0) &&
            `La colección ${idCollection} no encontró notas`);

    return message && { type: 'warning', message };
};

const setMinimum = layout => {
    const options = {
        grillaUltimasNoticias: 4,
        default: Number(layout.slice(-1)) || 3
    };

    return options[layout] || options.default;
};

export const validateChainManual = (
    childrenProps,
    layout,
    isInApertura,
    isVideoBackground,
    containsHTML
) => {
    const LN_COMMON_ARTICLE = 'LN-common/articulo';
    const LN_TIMELINE = 'LN-acumulado/timeline';
    const COLLECTION_FEATURES = 'features';

    const isTimeline = layout === 'grillaUltimasNoticias';
    const minimum = setMinimum(layout);
    const childrenArticles = childrenProps.filter(
        child =>
            child.collection === COLLECTION_FEATURES &&
            child.type === LN_COMMON_ARTICLE
    );
    const childrenPropsLength = get(childrenArticles, 'length');

    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation:
                !isTimeline &&
                childrenProps.some(
                    x =>
                        !(
                            x.collection === COLLECTION_FEATURES &&
                            x.type === LN_COMMON_ARTICLE
                        )
                ),
            message:
                'El Chain Caja Manual sólo admite Features del tipo LN Artículo'
        },
        {
            validation:
                isVideoBackground &&
                !['grilla1', 'grillaVideo1'].includes(layout),
            message:
                'Con vídeo background solo se permite la diagramación Grilla 1 o Grilla 1 - Video'
        },
        {
            validation: childrenPropsLength < minimum,
            message: `Se requiere la carga de ${minimum -
                childrenPropsLength} artículo${
                minimum - childrenPropsLength > 1 ? 's' : ''
            }`
        },
        {
            validation: ['grilla6', 'grilla9'].includes(layout) && isInApertura,
            message: 'No se permite esta diagramación'
        },
        {
            validation: containsHTML && layout !== 'grillaVideo1',
            message: 'Esta diagramación no permite iframe HTML'
        },
        {
            validation:
                isTimeline &&
                !childrenProps.find(
                    x =>
                        x.collection === COLLECTION_FEATURES &&
                        x.type === LN_TIMELINE
                ),
            message: 'Esta diagramación requiere el feature LN Timeline'
        }
    ];

    const message = get(
        rules.find(x => x.validation),
        'message',
        null
    );

    return message && { type: 'warning', message };
};

export const validateArticleFeature = (
    id,
    content,
    image,
    video,
    layout,
    imageId,
    videoId
) => {
    const { streams } = video || {};
    const { filesize } = getStreams(streams, '>') || '';
    const maxVideoSize = 3000000;
    const oneMegabyte = 1048576;

    const rules = [
        {
            validation: !id,
            message: 'El campo Id de la Nota es obligatorio.'
        },
        {
            validation: !content,
            message: 'El ID de la nota es incorrecto.'
        },
        {
            validation: imageId && image === null,
            message: 'El ID de la imagen es incorrecto.'
        },
        {
            validation: videoId && video === null,
            message: 'El ID del video es incorrecto.'
        },
        {
            validation:
                filesize &&
                !['grilla1', 'grillaVideo1'].includes(layout) &&
                filesize > maxVideoSize,
            message: `El tamaño del video debe ser inferior a 3 MB. Peso actual ${(
                filesize / oneMegabyte
            ).toFixed(2)} MB`
        }
    ];
    const message = get(
        rules.find(({ validation }) => validation),
        'message',
        null
    );
    return message && { type: 'warning', message };
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

    return currentCollection.articles
        ? currentCollection.articles.slice(
              initialPosition,
              initialPosition + notesQuantity
          )
        : [];
};
