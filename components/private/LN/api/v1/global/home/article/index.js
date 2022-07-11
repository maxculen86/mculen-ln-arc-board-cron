const index = (articleSourceNota, articleImage, props) => {
    if (!articleSourceNota) {
        return null;
    }
    const {
        noteId,
        title,
        authors,
        lead,
        chapita,
        opinion
    } = props.customFields;

    const additionalProperties = {
        noteId,
        title,
        authors,
        lead,
        chapita,
        opinion,
        image: articleImage || null
    };
    return { ...articleSourceNota, additionalProperties };
};
export default index;
