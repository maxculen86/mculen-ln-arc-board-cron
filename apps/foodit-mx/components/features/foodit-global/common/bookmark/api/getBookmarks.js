import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';

const getBookmarks = async (token, accessToken, bookmarkType = 'article') => {
    if (!token || !accessToken) return {};

    try {
        const response = await fetch(
            `${PERSONALIZACION_API_FOODIT}bookmarks/?bookmarkType=${bookmarkType}&size=150`,
            {
                method: 'GET',
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
                detail: 'get_bookmarks',
                code: response.status,
                notificationsCategory: 'obtener_notas_guardadas'
            });

            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al realizar la solicitud GET:', error);
        return {};
    }
};

export default getBookmarks;
