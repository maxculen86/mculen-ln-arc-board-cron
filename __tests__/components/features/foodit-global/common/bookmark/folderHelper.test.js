import getBookmarkGroups from '../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarkGroups';
import {
    loadBookmarkFolders,
    addStorageFolder
} from '../../../../../../components/features/foodit-global/common/bookmark/foldersHelper';

jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/api/getBookmarkGroups',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

describe('Bookmark Functions', () => {
    const mockLocalStorage = (() => {
        let store = {};
        return {
            getItem: jest.fn(key => store[key] || null),
            setItem: jest.fn((key, value) => {
                store[key] = value.toString();
            }),
            clear: jest.fn(() => {
                store = {};
            })
        };
    })();

    beforeEach(() => {
        mockLocalStorage.getItem.mockClear();
        mockLocalStorage.setItem.mockClear();

        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
            writable: true
        });
    });

    describe('loadBookmarkFolders', () => {
        it('should save data from getBookmarkGroups to localStorage', async () => {
            getBookmarkGroups.mockResolvedValueOnce({
                data: [
                    { bookmarkGroup: 'test', bookmarkCount: 3 },
                    { bookmarkGroup: 'test2', bookmarkCount: 4 },
                    { bookmarkGroup: 'test2', bookmarkCount: 0 }
                ]
            });
            await loadBookmarkFolders();
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'bookmarkFolders',
                JSON.stringify([
                    { bookmarkGroup: 'test', bookmarkCount: 3 },
                    { bookmarkGroup: 'test2', bookmarkCount: 4 }
                ])
            );
        });

        it('should handle an empty array from getBookmarkGroups', async () => {
            getBookmarkGroups.mockResolvedValueOnce({ data: [] });
            await loadBookmarkFolders();
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'bookmarkFolders',
                JSON.stringify([])
            );
        });

        it('should handle errors from getBookmarkGroups', async () => {
            getBookmarkGroups.mockRejectedValueOnce(new Error('Test Error'));
            await expect(loadBookmarkFolders()).rejects.toThrow('Test Error');
        });
    });

    describe('addStorageFolder', () => {
        it('should add a new bookmark group when localStorage is empty', () => {
            addStorageFolder('newFolder');
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'bookmarkFolders',
                JSON.stringify([{ bookmarkGroup: 'newFolder' }])
            );
        });

        it('should not add a bookmark group that already exists', () => {
            localStorage.setItem(
                'bookmarkFolders',
                JSON.stringify([{ bookmarkGroup: 'existingFolder' }])
            );
            localStorage.setItem.mockClear();
            addStorageFolder('existingFolder');
            expect(localStorage.setItem).not.toHaveBeenCalledWith(
                'bookmarkFolders',
                expect.anything()
            );
        });

        it('should add a new bookmark group to existing ones', () => {
            localStorage.setItem(
                'bookmarkFolders',
                JSON.stringify([{ bookmarkGroup: 'existingFolder' }])
            );
            addStorageFolder('newFolder');
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'bookmarkFolders',
                JSON.stringify([
                    { bookmarkGroup: 'existingFolder' },
                    { bookmarkGroup: 'newFolder' }
                ])
            );
        });
    });
});
