import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';

const getBookmarkByArticleId = async ({
    articleId,
    token,
    accessToken,
    bookmarkType = 'article'
} = {}) => {
    if (!token || !accessToken || !articleId) return {};

    try {
        const response = await fetch(
            `${PERSONALIZACION_API_FOODIT}bookmarks-type/${bookmarkType}/${articleId}`,
            {
                method: 'GET',
                headers: {
                    'X-Token': token,
                    Authorization: accessToken
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
