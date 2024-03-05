export const createSummaryList = bookmarks => {
    if (!Array.isArray(bookmarks) || !bookmarks.length) return [];

    const groupCounts = new Map();

    bookmarks.forEach(({ bookmarkGroup }) => {
        const group = bookmarkGroup;
        groupCounts.set(group, (groupCounts.get(group) || 0) + 1);
    });

    const summaryList = Array.from(groupCounts, ([group, count]) => ({
        id: group,
        text: `${group} (${count})`,
        quantity: count
    }));

    summaryList.unshift({
        id: 'Todas',
        text: `Todas (${bookmarks.length})`,
        quantity: bookmarks.length
    });

    return summaryList;
};
