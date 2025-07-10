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

const updateFolderCountsAfterDelete = (successfullResponses, allBookmarks) => {
    successfullResponses.forEach(({ bookmarkId }) => {
        const deletedBookmark = allBookmarks?.find(
            bookmark => bookmark.bookmarkId === bookmarkId
        );

        if (deletedBookmark?.bookmarkGroup) {
            removeFromStorageFolder(deletedBookmark.bookmarkGroup);
        }
    });
};

const fetchDeleteBookmark = async (
    bookmarkedArticles,
    setUserBookmarks,
    setSelectedItem,
    userBookmarksQuantity = 0,
    bookmarkInfo = null,
    allBookmarks = null
) => {
    const { successfullResponses, failureResponses } =
        await deleteBookmark(bookmarkedArticles);

    if (successfullResponses && successfullResponses.length) {
        if (allBookmarks) {
            updateFolderCountsAfterDelete(successfullResponses, allBookmarks);
        }

        setLocalStorageBookmarks(successfullResponses);

        if (setUserBookmarks) {
            setClientSideBookmarks({
                successfullResponses,
                setUserBookmarks,
                setSelectedItem,
                userBookmarksQuantity
            });
        }

        if (successfullResponses.length === bookmarkedArticles.length) {
            let toastMessage;

            if (bookmarkInfo) {
                if (bookmarkInfo.variant === 'note') {
                    toastMessage = `La nota ${bookmarkInfo.name} se quitó de tu colección.`;
                } else if (bookmarkInfo.variant === 'recipe') {
                    toastMessage = `La receta ${bookmarkInfo.name} se quitó de tu colección.`;
                }
            }

            addToast({
                variant: TOAST.SUCCESS.VARIANT,
                title: TOAST.SUCCESS.TITLE,
                message: toastMessage || TOAST.SUCCESS.MESSAGE.DELETE_ARTICLE
            });
        } else {
            addErrorToast();
        }
    } else {
        addErrorToast();
    }

    if (!setUserBookmarks && failureResponses && failureResponses.length) {
        const failureTypeIds = failureResponses.map(
            response => response.bookmarkTypeId
        );
        toggleBookmarks(failureTypeIds, true);
    }

    return successfullResponses?.length > 0;
};

export default fetchDeleteBookmark;
