import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';

import getToken from '../../../../../private/common/utils/getToken';

const getBookmarkGroups = async () => {
    // TODO: should use useClientLibs
    const token = getToken();
    const accessToken = getToken('access-token');

    if (!token || !accessToken) return [];

    try {
        const response = await fetch(
            `${PERSONALIZACION_API_FOODIT}bookmarks-groups/?size=25`,
            {
                method: 'GET',
                headers: {
                    'X-Token': token,
                    Authorization: accessToken
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error al realizar la solicitud POST:', error);
        return {};
    }
};

export default getBookmarkGroups;
