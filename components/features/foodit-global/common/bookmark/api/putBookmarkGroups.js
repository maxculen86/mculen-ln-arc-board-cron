import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';

import getToken from '../../../../../private/common/utils/getToken';

const putBookmarkGroups = async (bookmarkGroupOld, bookmarkGroupNew) => {
    // TODO: should use useClientLibs
    const token = getToken();
    const accessToken = getToken('access-token');

    if (!token || !accessToken || !bookmarkGroupOld || !bookmarkGroupNew)
        return null;

    try {
        const response = await fetch(
            `${PERSONALIZACION_API_FOODIT}bookmarks-groups`,
            {
                method: 'PUT',
                headers: {
                    'X-Token': token,
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    bookmarkGroupOld,
                    bookmarkGroupNew
                })
            }
        );

        if (!response.ok) {
            console.error(
                `No se pudo renombrar la carpeta ${bookmarkGroupOld}, HTTP error! status: ${response.status}`
            );
            return null;
        }

        return bookmarkGroupNew;
    } catch (error) {
        console.error(`Error al realizar la solicitud PUT:`, error);
        return null;
    }
};

export default putBookmarkGroups;
