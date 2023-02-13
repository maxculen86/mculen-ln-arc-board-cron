const index = (articleSourceNota, articleImage, articleVideo, props) => {
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
        variant
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
        variant
    };
    return { ...articleSourceNota, additionalProperties };
};
export default index;
