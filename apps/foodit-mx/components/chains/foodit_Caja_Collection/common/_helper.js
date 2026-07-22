import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import get from '../../../private/common/utils/get';

export const validateChainFoodit = ({
    minArticles,
    idCollection,
    articles = [],
    layout
}) => {
    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation: !idCollection,
            message: 'Se requiere el id de la colección'
        },
        {
            validation: idCollection && (!articles || !articles.length),
            message: `La colección ${idCollection} no encontró notas`
        },
        {
            validation: articles.length < minArticles,
            message: `Se requieren un minimo de ${minArticles} articulos`
        }
    ];

    return pageBuilderValidator(rules);
};

export const isElementInPosition = config => {
    if (config) {
        // Por defecto, busca el primer elemento del primer bloque si no se especifica las posiciones.
        const {
            positionElement = 0,
            positionBlock = 0,
            tree = {},
            id = ''
        } = config;

        const childrenBlock = get(
            tree,
            `children[${positionBlock}].children`,
            []
        );

        return get(childrenBlock[positionElement], 'props.id') === id;
    }

    return false;
};

export const getIdCollection = ({
    isStatic = false,
    inViewport = false,
    idCollection = '',
    isAdmin = false,
    isWithOutLazyLoad = false
} = {}) => {
    const isValidId = idCollection && idCollection.trim();
    const isRenderWithOutLazy = isStatic || isWithOutLazyLoad;

    if (isValidId && isRenderWithOutLazy) {
        return idCollection;
    }

    return (inViewport && idCollection) || (isAdmin && idCollection) || null;
};
