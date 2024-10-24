import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

export const validateCardCategory = ({
    title = '',
    image = '',
    url = '',
    imageUrl
}) => {
    const rules = [
        {
            validation: !title,
            message: 'Se requiere un titulo'
        },
        {
            validation: !image,
            message: 'Se requiere el id de una imagen'
        },
        {
            validation: !url,
            message: `Se requiere una url`
        },
        {
            validation: !imageUrl,
            message: 'No se encontro imagen'
        }
    ];

    return pageBuilderValidator(rules);
};
