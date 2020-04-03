/* eslint-disable import/prefer-default-export */
export const validateNoteCard = (
    isOpening,
    belongsTo,
    title,
    imageId,
    subhead,
    content
) => {
    let error;
    if (isOpening && belongsTo === 'apertura' && (!title || !imageId)) {
        error = {
            type: 'warning',
            message:
                'El título e imagen son obligatorios para un artículo de apertura'
        };
    }
    if (!(title && (imageId || subhead))) {
        error = {
            type: 'warning',
            message:
                'La nota debe contar con una imagen o bajada y con un título'
        };
    }
    if (!content) {
        error = {
            type: 'warning',
            message: 'No se encontró contenido'
        };
    }
    return error;
};
