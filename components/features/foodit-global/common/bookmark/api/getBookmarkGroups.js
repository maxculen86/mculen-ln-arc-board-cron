import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';

import getToken from '../../../../../private/common/utils/getToken';
import addEventToDataLayer from '../../../../../private/LN/common/utils/addEventToDataLayer';

const getBookmarkGroups = async () => {
    // TODO: should use useClientLibs
    const token = getToken();
    const accessToken = getToken('access-token');

    if (!token || !accessToken) return [];

    try {
        const response = await fetch(
            `${PERSONALIZACION_API_FOODIT}bookmarks-groups/?size=1000`,
            {
                method: 'GET',
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
                detail: 'get_bookmark_groups',
                code: response.status,
                notificationsCategory: 'obtener_carpetas'
            });

            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error al realizar la solicitud GET:', error);
        return {};
    }
};

export default getBookmarkGroups;
