import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

export const validateBannerReceta = ({ title, url, imageId, image }) => {
    const rules = [
        {
            validation: !imageId,
            message: 'El campo ID de la imagen promocional es obligatorio.'
        },
        {
            validation: !image,
            message: 'El ID de la imagen es incorrecto.'
        },
        {
            validation: !title,
            message:
                'El campo Título para el banner promocional es obligatorio.'
        },
        {
            validation: !url,
            message: 'El campo URL de redireccionamiento es obligatorio.'
        }
    ];

    return pageBuilderValidator(rules);
};
