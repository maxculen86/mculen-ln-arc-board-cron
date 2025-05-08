/* eslint-disable no-underscore-dangle */
export const SHOPPING_LIST_EVENTS = {
    BOOKMARK_ADDED: 'shopping-list-bookmark-added',
    BOOKMARK_REMOVED: 'shopping-list-bookmark-removed',
    BOOKMARK_UPDATED: 'shopping-list-bookmark-updated'
};

// TODO: crear función genérica emitBookmarkEvent para evitar duplicación de código
export const emitBookmarkAdded = (articleId, bookmarkId) => {
    const event = new CustomEvent(SHOPPING_LIST_EVENTS.BOOKMARK_ADDED, {
        detail: { articleId, bookmarkId },
        bubbles: true
    });
    window.dispatchEvent(event);
};

export const emitBookmarkRemoved = (articleId, bookmarkId) => {
    const event = new CustomEvent(SHOPPING_LIST_EVENTS.BOOKMARK_REMOVED, {
        detail: { articleId, bookmarkId },
        bubbles: true
    });
    window.dispatchEvent(event);
};

export const emitBookmarkUpdated = (articleId, bookmarkId) => {
    const event = new CustomEvent(SHOPPING_LIST_EVENTS.BOOKMARK_UPDATED, {
        detail: { articleId, bookmarkId },
        bubbles: true
    });
    window.dispatchEvent(event);
};

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
