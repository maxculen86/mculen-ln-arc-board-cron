import { filterBookmarksByArticledIs } from '../../../../../../components/features/foodit-global/common/bookmark/_helper';

const localStorageMock = (function() {
    let store = {};
    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('filterBookmarksByArticledIs', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    test('returns an empty array when no articles are provided', () => {
        expect(filterBookmarksByArticledIs()).toEqual([]);
    });

    test('returns an empty array when articles are provided but no bookmarks are in localStorage', () => {
        const articles = [{ articleId: '1' }, { articleId: '2' }];
        expect(filterBookmarksByArticledIs(articles)).toEqual([]);
    });

    test('returns filtered articles based on bookmarks in localStorage', () => {
        const bookmarks = [{ bookmarkTypeId: '1' }, { bookmarkTypeId: '3' }];
        window.localStorage.setItem(
            'bookmarkedItems',
            JSON.stringify(bookmarks)
        );

        const articles = [
            { articleId: '1' },
            { articleId: '2' },
            { articleId: '3' }
        ];

        expect(filterBookmarksByArticledIs(articles)).toEqual(['1', '3']);
    });

    test('handles incorrect localStorage data format gracefully', () => {
        window.localStorage.setItem('bookmarkedItems', 'not a valid json');
        const articles = [{ articleId: '1' }];
        expect(filterBookmarksByArticledIs(articles)).toEqual([]);
    });
});
