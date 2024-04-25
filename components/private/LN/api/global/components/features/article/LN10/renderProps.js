export const renderProps = (
    articleSourceNota,
    articleImage,
    articleVideo,
    propsParam,
    configs
) => {
    const props = propsParam;
    if (!articleSourceNota) {
        return null;
    }
    if (!props || !props.customFields) {
        return null;
    }

    const {
        noteId,
        title,
        authors,
        lead,
        chapita,
        opinion,
        html,
        variant,
        chapitaStyle,
        description
    } = props.customFields;

    const additionalProperties = {
        noteId,
        title,
        authors,
        lead,
        chapita,
        opinion,
        image: articleImage || null,
        video: articleVideo || null,
        html,
        variant,
        chapitaStyle,
        description,
        idRender: props.id //  Se usa en un metodo compartido con front para validar articulos de apertura
    };
    return { ...articleSourceNota, additionalProperties };
};
export default renderProps;
