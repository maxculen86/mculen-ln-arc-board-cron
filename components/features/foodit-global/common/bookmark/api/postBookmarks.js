import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';

import getToken from '../../../../../private/common/utils/getToken';
import { checkCarouselsRoofBookmark, fillBookmarks } from '../iconHelper';
import { addStorageFolder } from '../foldersHelper';
import safeJSONParse from '../../../../private-global/common/utils/safeJSONParse';

const postBookmarks = async (articlesDetails, folderName = '') => {
    // TODO: should use useClientLibs
    const token = getToken();
    const accessToken = getToken('access-token');

    if (!token || !accessToken) return [];

    const results = await Promise.all(
        articlesDetails.map(async ({ content = {}, primarySection = '' }) => {
            const { id } = content;

            if (!id || !primarySection || !folderName) {
                console.error(
                    `No se pudo guardar, HTTP error! status: 401, datos requeridos insuficientes`
                );
                return {};
            }

            const response = await fetch(
                `${PERSONALIZACION_API_FOODIT}bookmarks/`,
                {
                    method: 'POST',
                    headers: {
                        'X-Token': token,
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        bookmarkParent: primarySection,
                        bookmarkType: 'article',
                        bookmarkTypeId: id,
                        bookmarkGroup: folderName,
                        bookmarkContent: {
                            ...content
                        }
                    })
                }
            );

            if (!response.ok) {
                console.error(
                    `No se pudo guardar ${id}, HTTP error! status: ${response.status}`
                );
                return {};
            }

            return await response.json();
        })
    );

    return results.filter(result => result.bookmarkId);
};

const saveBookmarks = async (articlesDetails, nameFolder, newFolder) => {
    const responses = await postBookmarks(articlesDetails, nameFolder);

    if (responses && responses.length) {
        if (newFolder) addStorageFolder(nameFolder);

        fillBookmarks(responses.map(response => response.bookmarkTypeId));

        responses.forEach(({ bookmarkTypeId, bookmarkId }) => {
            const bookmarkedArticles = safeJSONParse(
                localStorage.getItem('bookmarkedItems')
            );
            localStorage.setItem(
                'bookmarkedItems',
                JSON.stringify([
                    ...bookmarkedArticles,
                    { bookmarkTypeId, bookmarkId }
                ])
            );
        });

        if (responses.length === articlesDetails.length) {
            window.LN.observable.publish('addToast', {
                variant: 'success',
                title: 'Guardado!',
                message: `Se guardaron los articulos en la carpeta ${nameFolder}`
            });
        } else {
            window.LN.observable.publish('addToast', {
                variant: 'danger',
                title: 'Error!',
                message: `Hubo un error al guardar algunos de los artículos en la carpeta ${nameFolder}`
            });
        }

        checkCarouselsRoofBookmark();
    } else {
        window.LN.observable.publish('addToast', {
            variant: 'danger',
            title: 'Error!',
            message: `No fue posible guardar los articulos en la carpeta ${nameFolder}`
        });
    }
};

export default saveBookmarks;
