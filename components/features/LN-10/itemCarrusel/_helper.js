import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

export const validateItemCarrusel = ({ video, videoId }) => {
    const rules = [
        {
            validation: !videoId,
            message: 'Advertencia. El campo Video es obligatorio'
        },
        {
            validation: videoId && video === null,
            message: 'Advertencia. El ID del video es incorrecto'
        }
    ];

    return pageBuilderValidator(rules);
};
