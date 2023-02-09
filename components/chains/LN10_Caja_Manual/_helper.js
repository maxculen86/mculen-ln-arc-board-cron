import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';

export const setQuantityByLayout = ({ layout = '' } = {}) => {
    const options = {
        bnGrilla4: 4,
        bnGrilla8: 8,
        default: Number(layout.slice(-1)) || 3
    };

    return options[layout] || options.default;
};

// TODO: Agrupar validaciones comunes entre chains

export const validateCajaManual = (layout, childProps) => {
    const LN_COMMON_ARTICLE = 'LN-10/article';
    const COLLECTION_FEATURES = 'features';
    const minimum = setQuantityByLayout(layout);

    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation: childProps < minimum,
            message: `Se requiere la carga de ${minimum - childProps} artículo${
                minimum - childProps > 1 ? 's' : ''
            }`
        },
        {
            validation: childProps.some(
                ({ collection, type }) =>
                    !(
                        collection === COLLECTION_FEATURES &&
                        [LN_COMMON_ARTICLE].includes(type)
                    )
            ),
            message:
                'La Chain LN10 Caja Manual sólo admite features del tipo LN10 Artículo'
        }
    ];

    return pageBuilderValidator(rules);
};
