export const getNotaCardsData = globalContent => {
    const { headlines, subheadlines, description, contentElements } =
        globalContent || {};

    return {
        title: headlines?.basic || '',
        subtitle: subheadlines?.basic || '',
        description: description?.basic || '',
        contentElements: contentElements || []
    };
};
