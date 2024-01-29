import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';

import getToken from '../../../../../private/common/utils/getToken';
import { checkCarouselsRoofBookmark, unfillBookmarks } from '../iconHelper';

const deleteBookmark = async bookmarkIds => {
    // TODO: should use useClientLibs
    const token = getToken();
    const accessToken = getToken('access-token');

    if (!token || !accessToken || !bookmarkIds) return [];

    const results = await Promise.all(
        bookmarkIds.map(async ({ bookmarkId = '', bookmarkTypeId = '' }) => {
            if (!bookmarkId) {
                console.error(
                    `Error al guardar nota ${bookmarkTypeId}, id del Bookmark requerido`
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
                console.error(
                    `Error al guardar nota ${bookmarkTypeId}, status: ${response.status}`
                );
                return null;
            }

            return bookmarkTypeId;
        })
    );

    return results.filter(
        result => typeof result === 'string' && result.length
    );
};

const fetchDeleteBookmark = async bookmarkedArticles => {
    const responses = await deleteBookmark(bookmarkedArticles);

    if (responses.length) {
        const bookmarkedItems =
            JSON.parse(localStorage.getItem('bookmarkedItems')) || [];

        localStorage.setItem(
            'bookmarkedItems',
            JSON.stringify(
                bookmarkedItems.filter(
                    article => !responses.includes(article.bookmarkTypeId)
                )
            )
        );

        unfillBookmarks(responses);

        if (responses.length === bookmarkedArticles.length) {
            window.LN.observable.publish('addToast', {
                variant: 'success',
                title: 'Guardado!',
                message: `Fueron eliminados los articulos guardados`
            });
        } else {
            window.LN.observable.publish('addToast', {
                variant: 'danger',
                title: 'Error!',
                message: `Algunos articulos fallaron al ser eliminados, intente nuevamente`
            });
        }

        checkCarouselsRoofBookmark();
    } else {
        window.LN.observable.publish('addToast', {
            variant: 'danger',
            title: 'Error!',
            message: `No fue posible eliminar los articulos guardados`
        });
    }
};

export default fetchDeleteBookmark;
