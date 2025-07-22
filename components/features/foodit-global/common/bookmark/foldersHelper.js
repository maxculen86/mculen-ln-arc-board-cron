import getBookmarkGroups from './api/getBookmarkGroups';
import safeJSONParse from '../../../private-global/common/utils/safeJSONParse';
import { INGREDIENTS_BOOKMARK_GROUP } from './api/postIngredientsList';
import {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
} from '../MenuSemanal/helpers/daysIds';

export const loadBookmarkFolders = async () => {
    const daysIds = [
        SUNDAY,
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY
    ];
    const { data = [] } = await getBookmarkGroups();
    localStorage.setItem(
        'bookmarkFolders',
        JSON.stringify(
            data.filter(
                ({ bookmarkCount, bookmarkGroup }) =>
                    bookmarkCount > 0 &&
                    bookmarkGroup !== INGREDIENTS_BOOKMARK_GROUP &&
                    !daysIds.includes(bookmarkGroup)
            )
        )
    );

    return localStorage.getItem('bookmarkFolders');
};

export const addStorageFolder = newFolder => {
    const folders =
        safeJSONParse(localStorage.getItem('bookmarkFolders')) || [];

    const existingFolderIndex = folders.findIndex(
        folder => folder.bookmarkGroup === newFolder
    );

    if (existingFolderIndex >= 0) {
        folders[existingFolderIndex].bookmarkCount += 1;
    } else {
        const newFolderEntry = {
            bookmarkGroup: newFolder,
            bookmarkCount: 1
        };
        folders.push(newFolderEntry);
    }

    localStorage.setItem('bookmarkFolders', JSON.stringify(folders));

    window.dispatchEvent(
        new CustomEvent('bookmarkFoldersChanged', {
            detail: { action: 'add', folderName: newFolder, folders }
        })
    );

    return folders;
};

export const removeFromStorageFolder = folderName => {
    const folders =
        safeJSONParse(localStorage.getItem('bookmarkFolders')) || [];

    const existingFolderIndex = folders.findIndex(
        folder => folder.bookmarkGroup === folderName
    );

    if (existingFolderIndex >= 0) {
        folders[existingFolderIndex].bookmarkCount -= 1;

        if (folders[existingFolderIndex].bookmarkCount <= 0) {
            folders.splice(existingFolderIndex, 1);
        }

        localStorage.setItem('bookmarkFolders', JSON.stringify(folders));

        window.dispatchEvent(
            new CustomEvent('bookmarkFoldersChanged', {
                detail: { action: 'remove', folderName, folders }
            })
        );
    }

    return folders;
};
