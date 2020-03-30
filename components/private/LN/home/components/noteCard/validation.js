/* eslint-disable import/prefer-default-export */
export const validateNoteCard = (
    isOpening,
    belongsTo,
    title,
    imageId,
    subhead
) => {
    if (isOpening && belongsTo === 'apertura' && (!title || !imageId)) {
        return {
            type: 'warning',
            message:
                'El título e imagen son obligatorios para un artículo de apertura'
        };
    }
    if (!(title && (imageId || subhead))) {
        return {
            type: 'warning',
            message:
                'La nota debe contar con una imagen o bajada y con un título'
        };
    }
    return null;
};
