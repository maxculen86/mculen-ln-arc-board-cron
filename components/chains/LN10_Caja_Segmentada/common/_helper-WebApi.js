import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

export const validateChain = (
    { idCollection, segment, articles = [] },
    shouldValidateCollectionArticles = false
) => {
    const idCollectionTrimmed = idCollection?.trim();
    const rules = [
        {
            validation: !idCollectionTrimmed,
            message: 'Se requiere el id de la colección'
        },
        {
            validation: !segment,
            message: 'Se requiere configurar el id del segmento'
        },
        {
            validation:
                shouldValidateCollectionArticles &&
                idCollectionTrimmed &&
                (!articles || !articles.length),
            message: `La colección ${idCollectionTrimmed} no encontró notas`
        }
    ];

    return pageBuilderValidator(rules);
};
