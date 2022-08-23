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
        opinion,
        html
    } = props.customFields;

    const additionalProperties = {
        noteId,
        title,
        authors,
        lead,
        chapita,
        opinion,
        image: articleImage || null,
        html
    };

    return { ...articleSourceNota, additionalProperties };
};
export default index;
