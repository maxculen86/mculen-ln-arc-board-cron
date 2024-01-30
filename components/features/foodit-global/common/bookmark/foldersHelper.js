import getBookmarkGroups from './api/getBookmarkGroups';
import safeJSONParse from '../../../private-global/common/utils/safeJSONParse';

export const loadBookmarkFolders = async () => {
    const { data = [] } = await getBookmarkGroups();
    localStorage.setItem('bookmarkFolders', JSON.stringify(data));

    return localStorage.getItem('bookmarkFolders');
};

export const addStorageFolder = newFolder => {
    const folders = safeJSONParse(localStorage.getItem('bookmarkFolders'));

    if (
        !folders ||
        !folders.some(folder => folder.bookmarkGroup === newFolder)
    ) {
        localStorage.setItem(
            'bookmarkFolders',
            JSON.stringify([...folders, { bookmarkGroup: newFolder }])
        );
    }

    return null;
};
