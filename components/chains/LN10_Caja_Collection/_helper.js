import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';
import getChildrenBySection from '../../private/LN/common/utils/LN10/getChildrenBySection';
import sectionValidation from '../../layouts/config/LN10-Home.config.json';

export const validateChain = ({
    idCollection,
    articles = [],
    layout,
    renderables = [],
    chainId,
    isInBreakings
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
            validation: renderables.find(
                ({ props }) =>
                    props.customFields &&
                    props.customFields.chainStyle === 'exclusiveSub' &&
                    props.id !== chainId
            ),
            message: 'Ya existe una caja collection exclusivo suscriptor'
        },
        {
            validation: !isInBreakings,
            message:
                'La caja collection exclusivo suscriptor debe estar dentro de las secciones Breaking 1 y Breaking 2'
        }
    ];

    return pageBuilderValidator(rules);
};

export const getBreakingChildren = renderables =>
    ['Breaking_1', 'Breaking_2']
        .map(breakingName =>
            getChildrenBySection({
                renderables,
                section: {
                    title: breakingName,
                    validation: sectionValidation
                }
            })
        )
        .flat();
