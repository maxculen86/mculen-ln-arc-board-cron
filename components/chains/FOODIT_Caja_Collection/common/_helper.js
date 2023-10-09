import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

export const validateChainFoodit = ({
    minArticles,
    maxArticles,
    idCollection,
    articles = [],
    layout,
    renderables = [],
    chainId
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
