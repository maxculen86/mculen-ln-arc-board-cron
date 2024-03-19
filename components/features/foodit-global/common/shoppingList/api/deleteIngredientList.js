import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import getToken from '../../../../../private/common/utils/getToken';

const deleteIngredientList = async (bookmarkId, setShoppingList) => {
    // TODO: should use useClientLibs
    const token = getToken();
    const accessToken = getToken('access-token');

    if (!token || !accessToken || !bookmarkId) return null;

    try {
        const response = await fetch(
            `${PERSONALIZACION_API_FOODIT}bookmarks/${bookmarkId}`,
            {
                method: 'DELETE',
                headers: {
                    'X-Token': token,
                    Authorization: accessToken
                }
            }
        );

        if (!response.ok) {
            console.error(
                `Error al eliminar ingredientes, status: ${response.status}`
            );
            return { bookmarkId, status: response.status };
        }

        setShoppingList(shoppingList => {
            return shoppingList.filter(
                article => article.bookmarkId !== bookmarkId
            );
        });

        return { bookmarkId, status: '200' };
    } catch (error) {
        console.error('Error al realizar la solicitud DELETE:', error);
        return null;
    }
};

export default deleteIngredientList;
