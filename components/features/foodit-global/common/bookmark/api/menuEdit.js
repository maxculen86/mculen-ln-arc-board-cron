import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import { getAuthTokens } from '../../../../../private/common/auth/helper/loginHelper';

async function editMenu({ menuToEdit, day, food, bookmarkId }) {
    const { bookmarkContent, bookmarkParent, bookmarkTypeId } = menuToEdit;
    const { id } = bookmarkContent;
    const { token, accessToken } = await getAuthTokens();

    const deleteMenu = fetch(
        `${PERSONALIZACION_API_FOODIT}bookmarks/${bookmarkId}`,
        {
            method: 'DELETE',
            headers: {
                'X-Token': token,
                Authorization: accessToken
            }
        }
    );

    const postMenu = fetch(`${PERSONALIZACION_API_FOODIT}bookmarks/`, {
        method: 'POST',
        headers: {
            'X-Token': token,
            Authorization: accessToken
        },
        body: JSON.stringify({
            bookmarkType: 'weeklyMenu',
            bookmarkTypeId: `${id}-${day}-${food}`,
            bookmarkGroup: day,
            bookmarkParent,
            bookmarkContent: { ...bookmarkContent, food }
        })
    });
    return Promise.all([deleteMenu, postMenu])
        .then(result => {
            const [deleteResponse, postResponse] = result;
            return Promise.all([deleteResponse.json(), postResponse.json()]);
        })
        .then(([deleteData, postData]) => {
            if (!deleteData?.bookmarkId) {
                console.error(
                    `Error al editar - eliminar menu, message: ${deleteData.message}`
                );
            }

            if (!postData?.bookmarkId) {
                console.error(
                    `No se pudo editar - guardar ${bookmarkTypeId} en menu semanal, HTTP error! message: ${postData.message}`
                );
                return {
                    postDataMessage: postData.message,
                    deleteDataMessage: postData.message
                };
            }
            return postData;
        })
        .catch(error => {
            console.error(`Error al realizar la solicitud editar menu:`, error);
            return null;
        });
}

export default editMenu;
