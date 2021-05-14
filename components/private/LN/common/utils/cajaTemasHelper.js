/* eslint-disable no-underscore-dangle */
import PropTypes from 'fusion:prop-types';
import config from '../../../../../properties/sites/la-nacion-ar';
import get from '../../../common/utils/get';
import { formatText } from '../../../common/utils/sectionUtils';
import useGlobalProviderAcu from '../../acumulado/hooks/useGlobalProviderAcu';

const featuredRules = {
    cajaCollection: {
        hideInitialPosition: false,
        hideIdCollection: false,
        hideHideCaja: false,
        groupName: 'Ajuste Collection',
        layouts: {
            focalLeft3: 'Focal Izquierdo',
            focalRight2: 'Focal Derecho',
            author3: 'Opinión',
            notaColorRosa3: 'Vertical 3 color Rosa',
            notaColorVerde3: 'Vertical 3 color Verde',
            grilla1: 'Grilla 1',
            grilla2: 'Grilla 2',
            grilla3: 'Grilla 3',
            grilla6: 'Grilla 6',
            grilla9: 'Grilla 9'
        },
        defaultLayout: 'grilla3'
    },
    cajaManual: {
        hideInitialPosition: true,
        hideIdCollection: true,
        hideHideCaja: false,
        groupName: 'Ajuste Manual',
        layouts: {
            focalLeft3: 'Focal Izquierdo',
            focalRight2: 'Focal Derecho',
            author3: 'Opinión',
            notaColorRosa3: 'Vertical 3 color Rosa',
            notaColorVerde3: 'Vertical 3 color Verde',
            grilla1: 'Grilla 1',
            grilla2: 'Grilla 2',
            grilla3: 'Grilla 3',
            grilla6: 'Grilla 6',
            grilla9: 'Grilla 9'
        },
        defaultLayout: 'focalLeft3'
    },
    cajaOpinion: {
        hideInitialPosition: true,
        hideIdCollection: false,
        hideHideCaja: false,
        groupName: 'Ajuste Collection',
        layouts: {
            opinion4: 'Home Opinion'
        },
        defaultLayout: 'opinion4'
    },
    cajaEditoriales: {
        hideInitialPosition: true,
        hideIdCollection: false,
        hideHideCaja: false,
        groupName: 'Ajuste Collection',
        layouts: {
            editoriales2: 'Home Editoriales'
        },
        defaultLayout: 'editoriales2'
    }
};

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

export const getCommonProps = props => {
    const {
        customFields: { layout = 'grilla3', backgroundColor },
        renderables = [],
        id: idFeature,
        globalContent: { name, acumuladoGeneral } = {}
    } = props;

    const { cajaTemaConfig = {} } = config || {};
    const { collectionsInPage = [] } = useGlobalProviderAcu() || {};
    const notesQuantity = (layout && Number(layout.slice(-1))) || 3;
    const bgColor =
        backgroundColor === 'default' || backgroundColor === null
            ? ''
            : '--bgcolor ';
    const classCondition = (layout && cajaTemaConfig[layout].className) || '';

    const position =
        renderables
            .filter(ren => ren.collection === 'chains')
            .filter(
                chain =>
                    get(chain, 'props.customFields.hideCaja', false) !== true
            )
            .findIndex(chain => chain.props.id === idFeature) || 0;

    const sectionName = `${formatText(name === 'LA NACION' ? '' : `${name}_`)}`;
    const showDatalayerMark = get(acumuladoGeneral, 'usa_datalayer', 'false');

    return {
        collectionsInPage,
        notesQuantity,
        bgColor,
        classCondition,
        position:
            showDatalayerMark !== 'false' &&
            `0${Number(position) + 1}`.slice(-2),
        sectionName
    };
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

export const calculateSizeOfCollection = (collections, notesQuantity) => {
    const totalArticlesInCollections = collections.reduce(
        (total, currentValue) => {
            return total + currentValue.articles.length;
        },
        0
    );
    const totalArticlesToAsk = notesQuantity + totalArticlesInCollections;
    return totalArticlesToAsk < 20 ? totalArticlesToAsk : 20;
};

export const isInApertura = (tree = {}, idFeature) => {
    const sectionApertura = get(tree, 'children[4].children', []);
    return sectionApertura.find(child => child.props.id === idFeature);
};

export const validateoutItem = itemNota => {
    const regex = new RegExp(`/video/`);
    const results = regex.exec(itemNota.url_nota);
    if (results) return false;

    return true;
};
export const cajaTemasCustomsFields = featuredName => {
    return {
        idCollection: PropTypes.string.tag({
            label: 'ID',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: featuredRules[featuredName].groupName,
            hidden: featuredRules[featuredName].hideIdCollection
        }).isRequired,
        layout: PropTypes.oneOf(
            Object.keys(featuredRules[featuredName].layouts)
        ).tag({
            label: 'Diagramación',
            defaultValue: featuredRules[featuredName].defaultLayout,
            description: 'Cambiar el diseño de la caja',
            group: featuredRules[featuredName].groupName,
            labels: featuredRules[featuredName].layouts
        }).isRequired,
        // Se Pidió ocultarlo de momento. User Story[73305]
        // backgroundColor: PropTypes.oneOf([
        //     'default',
        //     '--bgpink',
        //     '--bgblue',
        //     '--bgred',
        //     '--bgteal',
        //     '--bggrey'
        // ]).tag({
        //     label: 'Color de Fondo',
        //     defaultValue: 'default',
        //     description: 'Cambiar el color de fondo de la caja',
        //     group: featuredRules[featuredName].groupName,
        //     labels: {
        //         default: 'Sin Fondo',
        //         '--bgpink': 'Rosa',
        //         '--bgblue': 'Celeste LN',
        //         '--bgred': 'Rojo',
        //         '--bgteal': 'Verde',
        //         '--bggrey': 'Gris'
        //     }
        // }),
        initialPosition: PropTypes.number.tag({
            label: 'N° de nota inicial',
            description: 'Indicar a partir de que nota desea mostrar',
            defaultValue: 1,
            group: featuredRules[featuredName].groupName,
            hidden: featuredRules[featuredName].hideInitialPosition
        }).isRequired,
        hideCaja: PropTypes.boolean.tag({
            name: 'Ocultar Caja',
            description: 'Marque para ocultar la caja',
            defaultValue: false,
            group: featuredRules[featuredName].groupName,
            hidden: featuredRules[featuredName].hideHideCaja
        }),
        url: PropTypes.url.tag({
            label: 'Link',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo'
        }),
        imageId: PropTypes.string.tag({
            name: 'Logo',
            description: 'Ingrese aquí el id de Photo Center de la imagen',
            defaultValue: '',
            group: 'Techo'
        }),
        title: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí el título de la caja de temas',
            defaultValue: '',
            group: 'Techo'
        }),
        hideTitle: PropTypes.boolean.tag({
            name: 'Ocultar techo',
            description: 'Marque para ocultar el techo',
            defaultValue: true,
            group: 'Techo'
        })
    };
};

/*
const isInAnotherCollection = (idArticle, collections) => {
    const rto = collections.find(collect =>
        collect.articles.some(artCol => artCol._id === idArticle)
    );
    return rto || false;
};

const isNotRecommend = article => {
    const { label = {} } = article;
    const { recomendar = {} } = label;
    return recomendar.text === 'No';
};

export const getArticlesToShow = (
    articles = [],
    collections = [],
    initialPosition,
    notesQuantity
) => {
    const articlesRecomended = articles.filter(art => !isNotRecommend(art));

    const articlesFiltered = articlesRecomended.filter(
        art => isInAnotherCollection(art._id, collections) === false
    );

    const articlesToShow = articlesFiltered
        ? articlesFiltered.slice(
              initialPosition - 1,
              initialPosition - 1 + notesQuantity
          )
        : [];
    return articlesToShow;
};
*/
