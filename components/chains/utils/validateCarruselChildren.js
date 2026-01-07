import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';

export const validateCarruselChildren = ({
    children = [],
    childProps,
    allowedChildren = [],
    isHorizontal = false
}) => {
    const rules = [
        {
            validation: children.length < 5,
            message: `Advertencia. Se requiere la carga de ${5 - children.length} items de carrusel${isHorizontal ? ' horizontal' : ''}.`
        },
        {
            validation: childProps.some(
                ({ type }) => !allowedChildren.includes(type)
            ),
            message: `La Chain ${isHorizontal ? 'LN10 Caja Carrusel Horizontal' : 'LN10 Caja Carrusel'} sólo admite features del tipo ${allowedChildren[0]}`
        }
    ];

    return pageBuilderValidator(rules);
};
