import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';

export const validateChain = ({
    idCollection,
    articles = [],
    layout,
    renderables = [],
    customFields,
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
            validation: renderables.find(
                ({ props }) =>
                    props.customFields &&
                    props.customFields.chainStyle === 'exclusiveSub' &&
                    props.id !== chainId
            ),
            message:
                'Ya existe una caja collection con estilo exclusivo suscriptor'
        }
    ];

    return pageBuilderValidator(rules);
};

export const chainStyleRules = {
    exclusiveSub: {
        imagePosition: [
            {
                mobile: 'img-top',
                tablet: 'img-top',
                desktop: 'img-top'
            },
            {
                mobile: 'img-right',
                tablet: 'img-top',
                desktop: 'img-top'
            },
            {
                mobile: 'img-right',
                tablet: 'img-none',
                desktop: 'img-none'
            },
            {
                mobile: 'img-right',
                tablet: 'img-top',
                desktop: 'img-top'
            },
            {
                mobile: 'img-right',
                tablet: 'img-none',
                desktop: 'img-none'
            }
        ]
    }
};
