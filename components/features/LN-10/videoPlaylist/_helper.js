import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

export const validateVideoPlaylist = ({ playlistData, playlistId }) => {
    const rules = [
        {
            validation: !playlistId,
            message: 'Advertencia. El campo ID de playlist de JW es obligatorio'
        },
        {
            validation: playlistId && !playlistData,
            message: 'Advertencia. El ID del playlist es incorrecto'
        }
    ];

    return pageBuilderValidator(rules);
};
