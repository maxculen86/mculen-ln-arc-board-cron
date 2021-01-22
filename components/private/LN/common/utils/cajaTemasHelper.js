/* eslint-disable no-underscore-dangle */
import PropTypes from 'fusion:prop-types';
import config from '../../../../../properties/sites/la-nacion-ar';

const featuredRules = {
    cajaTemaCollections: {
        hideInitialPosition: false
    },
    cajaTemaAutomatic: {
        hideInitialPosition: true
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
        globalContent
    } = props;

    const { cajaTemaCss = {} } = config || {};
    const { collectionsInPage = [] } = globalContent || {};
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
              initialPosition - 1,
              initialPosition - 1 + notesQuantity
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
    collections,
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

export const cajaTemasCustomsFields = featuredName => {
    return {
        idCollection: PropTypes.string.tag({
            label: 'ID',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: 'Ajuste Collection'
        }).isRequired,
        layout: PropTypes.oneOf([
            'focalLeft3',
            'author3',
            'notaColorAzul3',
            'notaColorRojo3',
            'notaColorRosa3',
            'notaColorVerde3',
            'grilla3',
            'grilla6',
            'grilla9'
        ]).tag({
            label: 'Diagramación',
            defaultValue: 'grilla3',
            description: 'Cambiar el diseño de la caja',
            group: 'Ajuste Collection',
            labels: {
                grilla3: 'Grilla 3',
                grilla6: 'Grilla 6',
                grilla9: 'Grilla 9',
                focalLeft3: 'Focal Izquierdo',
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
            defaultValue: false,
            group: 'Techo'
        })
    };
};
