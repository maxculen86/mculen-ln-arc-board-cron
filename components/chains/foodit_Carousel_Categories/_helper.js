import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';

export const validateCarouselCategory = ({ children = [] }) => {
    const rules = [
        {
            validation: children.length !== 8,
            message: 'Se requiere un minimo y maximo de 8 articulos'
        }
    ];

    return pageBuilderValidator(rules);
};
