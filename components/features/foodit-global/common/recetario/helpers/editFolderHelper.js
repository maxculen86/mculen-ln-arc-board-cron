import { TOAST, addToast } from '../../bookmark/api/_helper';
import putBookmarkGroups from '../../bookmark/api/putBookmarkGroups';

export const renameFolder = async ({
    oldFolderName,
    newFolderName,
    setUserBookmarks,
    setSelectedItem
}) => {
    const bookmarkGroupNew = await putBookmarkGroups(
        oldFolderName,
        newFolderName
    );

    if (bookmarkGroupNew) {
        setUserBookmarks(prevBookmarkList =>
            prevBookmarkList.map(bookmark =>
                bookmark?.bookmarkGroup === oldFolderName
                    ? {
                          ...bookmark,
                          bookmarkGroup: bookmarkGroupNew
                      }
                    : bookmark
            )
        );

        setSelectedItem(prevSelectedItem => ({
            ...prevSelectedItem,
            id: bookmarkGroupNew
        }));

        addToast({
            variant: TOAST.SUCCESS.VARIANT,
            title: TOAST.SUCCESS.TITLE,
            message: TOAST.SUCCESS.MESSAGE.RENAME_COLLECTION
        });
    } else {
        addToast({
            variant: TOAST.ERROR.VARIANT,
            title: TOAST.ERROR.TITLE,
            message: TOAST.ERROR.MESSAGE.GENERIC
        });
    }
};
