export const setSource = ({
    sectionId,
    tagId,
    authorId,
    distributorId,
    sectionsIds,
    collectionId
}) => {
    if (sectionId || tagId || authorId || distributorId || sectionsIds)
        return 'acuArticlesSourceV2';

    if (collectionId) return 'collectionsSource';

    return null;
};
