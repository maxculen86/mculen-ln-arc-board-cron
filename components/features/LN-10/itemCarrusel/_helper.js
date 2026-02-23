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

export const pickPreferredMp4 = (sources = []) => {
    const mp4Sources = sources.filter(
        source => source?.type === 'video/mp4' && source?.file
    );

    const preferredLabels = ['540p', '360p'];
    const preferredSource = preferredLabels.reduce((foundSource, label) => {
        if (foundSource) return foundSource;
        return mp4Sources.find(source => source?.label === label) || null;
    }, null);

    return preferredSource?.file || mp4Sources[0]?.file || '';
};
