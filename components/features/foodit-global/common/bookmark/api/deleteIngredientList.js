import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import { TOAST, addErrorToast, addToast } from './_helper';
import { getAuthTokens } from '../../../../../../auth/helper/loginHelper';

const deleteIngredientList = async (
    bookmarkId,
    setShoppingList,
    title = ''
) => {
    const { token, accessToken } = await getAuthTokens();

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
            addErrorToast();
            return { bookmarkId, status: response.status };
        }

        setShoppingList
            ? setShoppingList(shoppingList => {
                  return shoppingList.filter(
                      article => article.bookmarkId !== bookmarkId
                  );
              })
            : addToast({
                  variant: TOAST.SUCCESS.VARIANT,
                  title: TOAST.SUCCESS.TITLE,
                  message: `${title} ${TOAST.SUCCESS.MESSAGE.DELETE_INGREDIENTS}`
              });

        return { bookmarkId, status: '200' };
    } catch (error) {
        console.error('Error al realizar la solicitud DELETE:', error);
        return null;
    }
};

export default deleteIngredientList;
