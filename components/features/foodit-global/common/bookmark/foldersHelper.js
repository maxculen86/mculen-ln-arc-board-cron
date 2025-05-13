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

export const loadBookmarkFolders = async (accessToken, token) => {
    const daysIds = [
        SUNDAY,
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY
    ];
    const { data = [] } = await getBookmarkGroups(accessToken, token);
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
