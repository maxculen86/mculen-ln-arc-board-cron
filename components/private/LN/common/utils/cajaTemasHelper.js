/* eslint-disable no-underscore-dangle */
import PropTypes from 'fusion:prop-types';
import config from '../../../../../properties/sites/la-nacion-ar';
import get from '../../../common/utils/get';
import { GlobalContext } from '../../acumulado/context/globalContextAcu';
import useGlobalProviderAcu from '../../acumulado/hooks/useGlobalProviderAcu';

const featuredRules = {
    cajaCollection: {
        hideInitialPosition: false,
        hideIdCollection: false,
        hideHideCaja: false
    },
    cajaManual: {
        hideInitialPosition: true,
        hideIdCollection: true,
        hideHideCaja: true
    }
};

export const validateFeature = (idCollection, articles, message) => {
    let error;
    if (!idCollection)
        error = {
            type: 'warning',
            message: 'Se requiere el id de la colección de la caja de temas'
        };

    if (idCollection && articles.length === 0)
        error = {
            type: 'warning',
            message
        };
    return error;
};

export const getCommonProps = props => {
    const {
        customFields: { layout = '', backgroundColor },
    } = props;
    const { cajaTemaCss = {} } = config || {};
    const { collectionsInPage = [] } = useGlobalProviderAcu();
    const notesQuantity = layout.slice(-1);
    const bgColor =
        backgroundColor === 'default' || backgroundColor === null
            ? ''
            : '--bgcolor ';
    const classCondition = cajaTemaCss[layout];

    return {
        collectionsInPage,
        notesQuantity,
        bgColor,
        classCondition
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

export const cajaTemasCustomsFields = featuredName => {
    return {
        idCollection: PropTypes.string.tag({
            label: 'ID',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: 'Ajuste Collection',
            hidden: featuredRules[featuredName].hideIdCollection
        }).isRequired,
        layout: PropTypes.oneOf([
            'focalLeft3',
            'focalRight3',
            'author3',
            'notaColorAzul3',
            'notaColorRojo3',
            'notaColorRosa3',
            'notaColorVerde3',
            'grilla2',
            'grilla3',
            'grilla6',
            'grilla9'
        ]).tag({
            label: 'Diagramación',
            defaultValue: 'grilla3',
            description: 'Cambiar el diseño de la caja',
            group: 'Ajuste Collection',
            labels: {
                grilla2: 'Grilla 2',
                grilla3: 'Grilla 3',
                grilla6: 'Grilla 6',
                grilla9: 'Grilla 9',
                focalLeft3: 'Focal Izquierdo',
                focalRight3: 'Focal Derecho',
                author3: 'Opinión',
                notaColorAzul3: 'Vertical 3 color Azul',
                notaColorRojo3: 'Vertical 3 color Rojo',
                notaColorRosa3: 'Vertical 3 color Rosa',
                notaColorVerde3: 'Vertical 3 color Verde'
            }
        }).isRequired,
        backgroundColor: PropTypes.oneOf([
            'default',
            '--bgpink',
            '--bgblue',
            '--bgred',
            '--bgteal',
            '--bggrey'
        ]).tag({
            label: 'Color de Fondo',
            defaultValue: 'default',
            description: 'Cambiar el color de fondo de la caja',
            group: 'Ajuste Collection',
            labels: {
                default: 'Sin Fondo',
                '--bgpink': 'Rosa',
                '--bgblue': 'Celeste LN',
                '--bgred': 'Rojo',
                '--bgteal': 'Verde',
                '--bggrey': 'Gris'
            }
        }),
        initialPosition: PropTypes.number.tag({
            label: 'N° de nota inicial',
            description: 'Indicar a partir de que nota desea mostrar',
            defaultValue: 1,
            group: 'Ajuste Collection',
            hidden: featuredRules[featuredName].hideInitialPosition
        }).isRequired,
        hideCaja: PropTypes.boolean.tag({
            name: 'Ocultar Caja',
            description: 'Marque para ocultar la caja',
            defaultValue: false,
            group: 'Ajuste Collection',
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
