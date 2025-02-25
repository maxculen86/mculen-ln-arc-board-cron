import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import { addToast, TOAST, addErrorToast } from './_helper';
import { getAuthTokens } from '../../../../../private/common/auth/helper/loginHelper';
import { toggleBookmarks } from '../iconHelper';
import safeJSONParse from '../../../../private-global/common/utils/safeJSONParse';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';

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
                return { bookmarkTypeId };
            }

            return { bookmarkTypeId, bookmarkId };
        })
    );

    const { successfullResponses, failureResponses } = results.reduce(
        (acum, response) => {
            if (response.bookmarkId) {
                acum.successfullResponses.push(response.bookmarkTypeId);
            } else {
                acum.failureResponses.push(response.bookmarkTypeId);
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
    setUserBookmarks(previousBookmarks =>
        previousBookmarks.filter(
            ({ bookmarkTypeId }) =>
                !successfullResponses.includes(bookmarkTypeId)
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
    const bookmarkedItems = safeJSONParse(
        localStorage?.getItem('bookmarkedItems'),
        []
    );

    localStorage?.setItem(
        'bookmarkedItems',
        JSON.stringify(
            bookmarkedItems.filter(
                article =>
                    !successfullResponses.includes(article.bookmarkTypeId)
            )
        )
    );
};

const fetchDeleteBookmark = async (
    bookmarkedArticles,
    setUserBookmarks,
    setSelectedItem,
    userBookmarksQuantity = 0
) => {
    const { successfullResponses, failureResponses } =
        await deleteBookmark(bookmarkedArticles);

    if (successfullResponses && successfullResponses.length) {
        if (setUserBookmarks)
            setClientSideBookmarks({
                successfullResponses,
                setUserBookmarks,
                setSelectedItem,
                userBookmarksQuantity
            });
        else setLocalStorageBookmarks(successfullResponses);

        if (successfullResponses.length === bookmarkedArticles.length) {
            addToast({
                variant: TOAST.SUCCESS.VARIANT,
                title: TOAST.SUCCESS.TITLE,
                message: TOAST.SUCCESS.MESSAGE.DELETE_ARTICLE
            });
        } else {
            addErrorToast();
        }
    } else {
        addErrorToast();
    }

    if (!setUserBookmarks && failureResponses && failureResponses.length) {
        toggleBookmarks(failureResponses, true);
    }
};

export default fetchDeleteBookmark;
