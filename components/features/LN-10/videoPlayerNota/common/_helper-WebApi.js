import getStreams from '../../../../private/LN/common/utils/getStreams';
import getSources from '../../../../private/LN/common/utils/getSourcesJw';
import pageBuilderValidator from '../../../../private/common/utils/pageBuilderValidator';

const validateVideoPlayerNota = ({
    noteId,
    video,
    videoId,
    variant,
    layout,
    variantsDisabled = []
}) => {
    const { streams, sources } = video || {};
    const { filesize } =
        getStreams(streams, '>') || getSources(sources, '>') || {};
    const maxVideoSize = 3145728; // 3MB
    const oneMegabyte = 1048576;

    const rules = [
        {
            validation: !noteId || !noteId.trim(),
            message: 'El campo noteId es obligatorio.'
        },
        {
            validation: variantsDisabled.includes(variant),
            message: `La variante "${variant}" no está permitida para este feature.`
        },
        {
            validation: videoId && video === null,
            message: 'El ID del video es incorrecto.'
        },
        {
            validation:
                filesize &&
                !['grilla1', 'grillaVideo1', 'bn_player_horizontal'].includes(
                    layout
                ) &&
                filesize > maxVideoSize,
            message: `El video supera los 3 MB. Tamaño actual: ${(
                filesize / oneMegabyte
            ).toFixed(2)} MB`
        }
    ];

    return pageBuilderValidator(rules);
};

export default validateVideoPlayerNota;
