/* eslint-disable no-underscore-dangle */
export const SHOPPING_LIST_EVENTS = {
    BOOKMARK_ADDED: 'shopping-list-bookmark-added',
    BOOKMARK_REMOVED: 'shopping-list-bookmark-removed',
    BOOKMARK_UPDATED: 'shopping-list-bookmark-updated'
};

const emitBookmarkEvent = (eventType, articleId, bookmarkId) => {
    const event = new CustomEvent(eventType, {
        detail: { articleId, bookmarkId },
        bubbles: true
    });
    window.dispatchEvent(event);
};

export const emitBookmarkAdded = (articleId, bookmarkId) =>
    emitBookmarkEvent(
        SHOPPING_LIST_EVENTS.BOOKMARK_ADDED,
        articleId,
        bookmarkId
    );

export const emitBookmarkRemoved = (articleId, bookmarkId) =>
    emitBookmarkEvent(
        SHOPPING_LIST_EVENTS.BOOKMARK_REMOVED,
        articleId,
        bookmarkId
    );

export const emitBookmarkUpdated = (articleId, bookmarkId) =>
    emitBookmarkEvent(
        SHOPPING_LIST_EVENTS.BOOKMARK_UPDATED,
        articleId,
        bookmarkId
    );

export const BookmarkCache = {
    _cache: new Map(),

    get: articleId => BookmarkCache._cache.get(articleId),

    set: (articleId, bookmarkId) => {
        BookmarkCache._cache.set(articleId, bookmarkId);
        return bookmarkId;
    },

    remove: articleId => {
        BookmarkCache._cache.delete(articleId);
    },

    has: articleId => BookmarkCache._cache.has(articleId)
};
