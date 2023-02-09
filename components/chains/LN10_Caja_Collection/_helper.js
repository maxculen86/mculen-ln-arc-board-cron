import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';

export const validateChain = ({ idCollection, articles = [], layout }) => {
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
        }
    ];

    return pageBuilderValidator(rules);
};

export default validateChain;
