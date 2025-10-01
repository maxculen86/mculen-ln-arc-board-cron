export const getNotaCardsAperturaData = globalContent => {
    const {
        headlines: { basic: title = '' } = {},
        subheadlines: { basic: subtitle = '' } = {},
        description: { basic: description = '' } = {},
        credits: { by: authors = [] } = {},
        first_publish_date: publishDate,
        label
    } = globalContent || {};

    const dataMeta = {
        publishDate,
        authors,
        label
    };

    const dataContent = {
        title,
        subtitle,
        description
    };

    return {
        dataMeta,
        dataContent
    };
};
