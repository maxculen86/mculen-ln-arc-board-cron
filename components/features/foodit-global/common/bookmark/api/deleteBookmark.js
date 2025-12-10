import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import { addToast, TOAST, addErrorToast } from './_helper';
import { getAuthTokens } from '../../../../../private/common/auth/helper/loginHelper';
import { toggleBookmarks } from '../iconHelper';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';
import { removeFromStorageFolder } from '../foldersHelper';
import {
    safeGetJSON,
    safeSetJSON
} from '../../../../../private/LN/common/utils/safeLocalStorageHelpers';

const deleteBookmark = async bookmarks => {
    const { token, accessToken } = await getAuthTokens();

    if (!token || !accessToken || !bookmarks) return [];

    const results = await Promise.all(
        bookmarks.map(async ({ bookmarkId = '', bookmarkTypeId = '' }) => {
            if (!bookmarkId || !bookmarkTypeId) {
                console.error(
                    `Error al eliminar nota ${bookmarkTypeId}, id del Bookmark requerido`
                );
                return null;
            }

            const response = await fetch(
                `${PERSONALIZACION_API_FOODIT}bookmarks/${bookmarkId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'X-Token': token,
                        Authorization: accessToken
                    }
                }
            );

            if (!response.ok) {
                addEventToDataLayerV2({
                    event: 'erros_ms',
                    type: 'failed_request',
                    detail: 'delete_bookmark',
                    code: response.status,
                    notificationsCategory: 'eliminar_nota_guardada'
                });

                console.error(
                    `Error al eliminar nota ${bookmarkTypeId}, status: ${response.status}`
                );
                return { bookmarkTypeId, bookmarkId };
            }

            return { bookmarkTypeId, bookmarkId, success: true };
        })
    );

    const { successfullResponses, failureResponses } = results.reduce(
        (acum, response) => {
            if (response && response.success) {
                acum.successfullResponses.push({
                    bookmarkTypeId: response.bookmarkTypeId,
                    bookmarkId: response.bookmarkId
                });
            } else if (response) {
                acum.failureResponses.push({
                    bookmarkTypeId: response.bookmarkTypeId,
                    bookmarkId: response.bookmarkId
                });
            }
            return acum;
        },
        { successfullResponses: [], failureResponses: [] }
    );

    return { successfullResponses, failureResponses };
};

const setClientSideBookmarks = ({
    successfullResponses,
    setUserBookmarks,
    setSelectedItem,
    userBookmarksQuantity
}) => {
    const deletedBookmarkIds = new Set(
        successfullResponses.map(response => response.bookmarkId)
    );

    setUserBookmarks(previousBookmarks =>
        previousBookmarks.filter(
            bookmark => !deletedBookmarkIds.has(bookmark.bookmarkId)
        )
    );

    if (setSelectedItem && userBookmarksQuantity)
        setSelectedItem(({ id: prevId, quantity: prevQuantity }) => {
            const quantity = prevQuantity - successfullResponses.length;

            return quantity > 0
                ? {
                      id: prevId,
                      quantity
                  }
                : {
                      id: 'Todas',
                      quantity:
                          userBookmarksQuantity - successfullResponses.length
                  };
        });
};

const setLocalStorageBookmarks = successfullResponses => {
    const bookmarkedItems = safeGetJSON('bookmarkedItems', []);

    const deletedBookmarkIds = new Set(
        successfullResponses.map(response => response.bookmarkId)
    );

    const filteredItems = bookmarkedItems.filter(
        article => !deletedBookmarkIds.has(article.bookmarkId)
    );

    safeSetJSON('bookmarkedItems', filteredItems);
};

const updateFolderCountsAfterDelete = (
    successfullResponses,
    bookmarkedArticles,
    allBookmarks
) => {
    successfullResponses.forEach(({ bookmarkId }) => {
        let deletedBookmark = null;

        if (bookmarkedArticles && Array.isArray(bookmarkedArticles)) {
            deletedBookmark = bookmarkedArticles.find(
                bookmark =>
                    bookmark.bookmarkId === bookmarkId && bookmark.bookmarkGroup
            );
        }

        if (!deletedBookmark && allBookmarks && Array.isArray(allBookmarks)) {
            deletedBookmark = allBookmarks.find(
                bookmark => bookmark.bookmarkId === bookmarkId
            );
        }

        if (!deletedBookmark) {
            const bookmarkedItems = safeGetJSON('bookmarkedItems', []);
            deletedBookmark = bookmarkedItems.find(
                bookmark => bookmark.bookmarkId === bookmarkId
            );
        }

        if (deletedBookmark?.bookmarkGroup) {
            removeFromStorageFolder(deletedBookmark.bookmarkGroup);
        } else {
            console.error('No bookmarkGroup found for bookmark:', bookmarkId);
        }
    });
};

const getDeleteToastMessage = bookmarkInfo => {
    if (!bookmarkInfo) return null;

    if (bookmarkInfo.variant === 'note') {
        return `La nota ${bookmarkInfo.name} se quitó de tu colección.`;
    }

    if (bookmarkInfo.variant === 'recipe') {
        return `La receta ${bookmarkInfo.name} se quitó de tu colección.`;
    }

    return null;
};

const showDeleteSuccessToast = bookmarkInfo =>
    addToast({
        variant: TOAST.SUCCESS.VARIANT,
        title: TOAST.SUCCESS.TITLE,
        message:
            getDeleteToastMessage(bookmarkInfo) ||
            TOAST.SUCCESS.MESSAGE.DELETE_ARTICLE
    });

const handleSuccessfulDeletion = ({
    successfullResponses,
    bookmarkedArticles,
    allBookmarks,
    setUserBookmarks,
    setSelectedItem,
    userBookmarksQuantity
}) => {
    updateFolderCountsAfterDelete(
        successfullResponses,
        bookmarkedArticles,
        allBookmarks
    );

    setLocalStorageBookmarks(successfullResponses);

    if (setUserBookmarks) {
        setClientSideBookmarks({
            successfullResponses,
            setUserBookmarks,
            setSelectedItem,
            userBookmarksQuantity
        });
    }
};

const handleFailureToggle = (failureResponses, setUserBookmarks) => {
    if (!setUserBookmarks && failureResponses?.length) {
        const failureTypeIds = failureResponses.map(
            response => response.bookmarkTypeId
        );
        toggleBookmarks(failureTypeIds, true);
    }
};

const fetchDeleteBookmark = async (
    bookmarkedArticles,
    setUserBookmarks = null,
    setSelectedItem = null,
    userBookmarksQuantity = 0,
    bookmarkInfo = null,
    allBookmarks = null
) => {
    const { successfullResponses, failureResponses } =
        await deleteBookmark(bookmarkedArticles);

    if (!successfullResponses?.length) {
        addErrorToast();
        handleFailureToggle(failureResponses, setUserBookmarks);
        return false;
    }

    handleSuccessfulDeletion({
        successfullResponses,
        bookmarkedArticles,
        allBookmarks,
        setUserBookmarks,
        setSelectedItem,
        userBookmarksQuantity
    });

    if (successfullResponses.length === bookmarkedArticles.length) {
        showDeleteSuccessToast(bookmarkInfo);
    } else {
        addErrorToast();
    }

    handleFailureToggle(failureResponses, setUserBookmarks);

    return true;
};

export default fetchDeleteBookmark;
