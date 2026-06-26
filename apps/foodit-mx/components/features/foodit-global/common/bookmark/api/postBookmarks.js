import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import { getAuthTokens } from '../../../../../private/common/auth/helper/loginHelper';
import { toggleBookmarks } from '../iconHelper';
import { addErrorToast, addToast, TOAST } from './_helper';
import { addStorageFolder } from '../foldersHelper';
import safeJSONParse from '../../../../private-global/common/utils/safeJSONParse';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';

const postBookmarks = async (articlesDetails, folderName = '') => {
    const { token, accessToken } = await getAuthTokens();

    if (!token || !accessToken) return [];

    const results = await Promise.all(
        articlesDetails.map(async ({ content = {}, primarySection = '' }) => {
            const { id, canonical_url: canonicalUrl } = content;

            if (!id || !canonicalUrl || !primarySection || !folderName) {
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

                addEventToDataLayerV2({
                    event: 'erros_ms',
                    type: 'failed_request',
                    detail: 'post_bookmark',
                    code: response.status,
                    notificationsCategory: 'guardar_nota'
                });

                return { bookmarkTypeId: id };
            }

            return response.json();
        })
    );

    const { successfullResponses, failureResponses } = results.reduce(
        (acum, response) => {
            if (response.bookmarkId) {
                acum.successfullResponses.push(response);
            } else {
                acum.failureResponses.push(response);
            }
            return acum;
        },
        { successfullResponses: [], failureResponses: [] }
    );

    return { successfullResponses, failureResponses };
};

const saveBookmarks = async (articlesDetails, nameFolder) => {
    const { successfullResponses, failureResponses } = await postBookmarks(
        articlesDetails,
        nameFolder
    );

    if (successfullResponses && successfullResponses.length) {
        addStorageFolder(nameFolder);

        successfullResponses.forEach(({ bookmarkTypeId, bookmarkId }) => {
            const bookmarkedArticles = safeJSONParse(
                localStorage.getItem('bookmarkedItems')
            );
            localStorage.setItem(
                'bookmarkedItems',
                JSON.stringify([
                    ...bookmarkedArticles,
                    { bookmarkTypeId, bookmarkId, bookmarkGroup: nameFolder }
                ])
            );
        });

        if (successfullResponses.length === articlesDetails.length) {
            addToast({
                variant: TOAST.SUCCESS.VARIANT,
                title: TOAST.SUCCESS.TITLE,
                message:
                    articlesDetails.length > 1
                        ? TOAST.SUCCESS.MESSAGE.SAVE_COLLECTION
                        : TOAST.SUCCESS.MESSAGE.SAVE_ARTICLE
            });
        } else {
            addErrorToast();
        }
    } else {
        addErrorToast();
    }

    if (failureResponses && failureResponses.length) {
        toggleBookmarks(
            failureResponses.map(response => response.bookmarkTypeId),
            false
        );
    }
};

export default saveBookmarks;
