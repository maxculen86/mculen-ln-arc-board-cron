import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import { addErrorToast, addToast, TOAST } from './_helper';
import { getAuthTokens } from '../../../../../private/common/auth/helper/loginHelper';

async function deleteWeeklyMenu({ bookmarkId }) {
    const { token, accessToken } = await getAuthTokens();

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
        console.error(`Error al eliminar menu, status: ${response.status}`);
        console.error(`Error al eliminar menu, message: ${response.message}`);
        addErrorToast();
        return { message: response.message, status: response.status };
    }
    addToast({
        variant: TOAST.SUCCESS.VARIANT,
        title: TOAST.SUCCESS.TITLE,
        message: `${TOAST.SUCCESS.MESSAGE.DELETE_MENU}`
    });

    return { bookmarkId, status: '200' };
}
export default deleteWeeklyMenu;
