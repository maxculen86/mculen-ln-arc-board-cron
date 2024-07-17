import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';

import getToken from '../../../../../private/common/utils/getToken';
import get from '../../../../../private/common/utils/get';

export const INGREDIENTS_BOOKMARK_GROUP = '0c470be489a8782dda8265b77d0dfcd4';

const postIngredientsList = async content => {
    // TODO: should use useClientLibs
    const token = getToken();
    const accessToken = getToken('access-token');

    const articleId = get(content, 'id');

    if (!token || !accessToken || !articleId) return null;

    try {
        const response = await fetch(
            `${PERSONALIZACION_API_FOODIT}bookmarks/`,
            {
                method: 'POST',
                headers: {
                    'X-Token': token,
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    bookmarkType: 'ingredientList',
                    bookmarkTypeId: articleId,
                    bookmarkGroup: INGREDIENTS_BOOKMARK_GROUP,
                    bookmarkParent: INGREDIENTS_BOOKMARK_GROUP,
                    bookmarkContent: {
                        ...content
                    }
                })
            }
        );

        if (!response.ok) {
            console.error(
                `No se pudo guardar ${articleId}, HTTP error! status: ${response.status}`
            );
            return {
                bookmarkTypeId: articleId,
                bookmarkId: response.bookmarkId
            };
        }

        return await response.json();
    } catch (error) {
        console.error(`Error al realizar la solicitud POST:`, error);
        return null;
    }
};

export default postIngredientsList;
