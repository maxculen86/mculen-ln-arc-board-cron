export const findBookmarkById = (bookmarksArray, bookmarkId) => {
    const foundBookmark = bookmarksArray.find(
        bookmark => bookmark.bookmarkId === bookmarkId
    );

    if (!foundBookmark) return null;

    return {
        variant: foundBookmark.bookmarkContent?.variant || null,
        bookmarkId: foundBookmark.bookmarkId,
        name:
            foundBookmark.bookmarkContent?.headlines?.basic ||
            foundBookmark.bookmarkContent?.headlines?.mobile
    };
};
