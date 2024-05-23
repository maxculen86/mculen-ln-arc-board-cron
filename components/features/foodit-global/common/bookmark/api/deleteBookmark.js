import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import { addToast, TOAST, addErrorToast } from './_helper';
import getToken from '../../../../../private/common/utils/getToken';
import addEventToDataLayer from '../../../../../private/LN/common/utils/addEventToDataLayer';
import { fillBookmarks } from '../iconHelper';

const deleteBookmark = async bookmarks => {
    // TODO: should use useClientLibs
    const token = getToken();
    const accessToken = getToken('access-token');

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
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

            if (!response.ok) {
                addEventToDataLayer({
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

const fetchDeleteBookmark = async (bookmarkedArticles, setUserBookmarks) => {
    const { successfullResponses, failureResponses } = await deleteBookmark(
        bookmarkedArticles
    );

    if (successfullResponses && successfullResponses.length) {
        if (setUserBookmarks) {
            setUserBookmarks(previousBookmarks =>
                previousBookmarks.filter(
                    ({ bookmarkTypeId }) =>
                        !successfullResponses.includes(bookmarkTypeId)
                )
            );
        } else {
            const bookmarkedItems =
                JSON.parse(localStorage.getItem('bookmarkedItems')) || [];

            localStorage.setItem(
                'bookmarkedItems',
                JSON.stringify(
                    bookmarkedItems.filter(
                        article =>
                            !successfullResponses.includes(
                                article.bookmarkTypeId
                            )
                    )
                )
            );
        }

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
        fillBookmarks(failureResponses);
    }
};

export default fetchDeleteBookmark;
