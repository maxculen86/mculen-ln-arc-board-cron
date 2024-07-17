import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';

import getToken from '../../../../../private/common/utils/getToken';
import addEventToDataLayer from '../../../../../private/LN/common/utils/addEventToDataLayer';

const getBookmarkByArticleId = async (bookmarkType = 'article', articleId) => {
    // TODO: should use useClientLibs
    const token = getToken();
    const accessToken = getToken('access-token');

    if (!token || !accessToken || !articleId) return {};

    try {
        const response = await fetch(
            `${PERSONALIZACION_API_FOODIT}bookmarks-type/${bookmarkType}/${articleId}`,
            {
                method: 'GET',
                headers: {
                    'X-Token': token,
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return await response.json();
    } catch (error) {
        console.error('Error al realizar la solicitud GET:', error);
        return {};
    }
};

export default getBookmarkByArticleId;
