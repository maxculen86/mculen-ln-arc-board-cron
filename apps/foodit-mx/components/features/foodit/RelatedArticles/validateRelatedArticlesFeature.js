import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

export const validateRelatedArticlesFeature = ({
    articleList,
    customMaxArticles,
    minArticles,
    articles = [],
    layout,
    filterBy,
    idSectionOrAuthor
}) => {
    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation:
                (filterBy === 'author' || filterBy === 'section') &&
                !idSectionOrAuthor,
            message:
                'Para filtro por autor o sección se requiere que ingrese un ID'
        },
        {
            validation: customMaxArticles < minArticles,
            message: `El mínimo de artículos debe ser de ${minArticles}`
        },
        {
            validation: !articleList,
            message: `Cargando articulos ...`
        },
        {
            validation: !articles || !articles.length,
            message: `No se encontraron notas para el filtro seleccionado`
        },
        {
            validation: articles.length < minArticles,
            message: `Se requieren un minimo de ${minArticles} articulos`
        }
    ];

    return pageBuilderValidator(rules);
};
