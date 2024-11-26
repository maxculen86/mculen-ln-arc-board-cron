import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';

export const validateCarruselChildren = ({ children = [], childProps }) => {
    const rules = [
        {
            validation: children.length < 5,
            message: `Advertencia. Se requiere la carga de ${5 - children.length} items de carrusel.`
        },
        {
            validation: childProps.some(
                ({ type }) => !['LN-10/itemCarrusel'].includes(type)
            ),
            message:
                'La Chain LN10 Caja Carrusel sólo admite features del tipo LN10 Item Carrusel'
        }
    ];

    return pageBuilderValidator(rules);
};
