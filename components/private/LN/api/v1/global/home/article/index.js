const index = (articleSourceNota, articleImage, articleVideo, props) => {
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
    } = props?.customFields;

    const additionalProperties = {
        noteId,
        title,
        authors,
        lead,
        chapita,
        opinion,
        image: articleImage || null,
        video: articleVideo || null,
        html
    };
    return { ...articleSourceNota, additionalProperties };
};
export default index;
