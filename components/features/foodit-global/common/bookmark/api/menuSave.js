import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import { getAuthTokens } from '../../../../../private/common/auth/helper/loginHelper';
import { addErrorToast, addToast, TOAST } from './_helper';
import { transformArticleFoodit } from '../../utils/notaFooditHelper';
import { getShortestImage } from '../../../../../private/LN/common/utils/mediaHelper';

const postWeeklyMenu = async ({ article, food, day }) => {
    const { token, accessToken } = await getAuthTokens();
    const {
        title,
        articleId,
        canonicalUrl,
        primarySection,
        image: { resized_urls: resizedUrl },
        variant,
        tag
    } = article;

    if (!token || !accessToken || !articleId || !day || !food) {
        console.error('[postWeeklyMenu] Missing required fields:', {
            token: !!token,
            accessToken: !!accessToken,
            articleId,
            day,
            food
        });
        return null;
    }

    const payload = {
        bookmarkType: 'weeklyMenu',
        bookmarkTypeId: `${articleId}-${day}-${food}`,
        bookmarkGroup: day,
        bookmarkParent: primarySection,
        bookmarkContent: {
            id: articleId,
            image: {
                resized_urls: resizedUrl,
                url: getShortestImage(resizedUrl)
            },
            canonical_url: canonicalUrl,
            food,
            title,
            variant,
            tag
        }
    };

    try {
        const response = await fetch(
            `${PERSONALIZACION_API_FOODIT}bookmarks/`,
            {
                method: 'POST',
                headers: {
                    'X-Token': token,
                    Authorization: accessToken
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(
                `No se pudo guardar ${articleId} en menu semanal, HTTP error! status: ${response.status}`,
                errorBody
            );
            return null;
        }

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.error(`Error al realizar la solicitud POST:`, error);
        return null;
    }
};

export const saveMenu = async ({ article, selectedDay, selectedFood }) => {
    const articleTransformed = transformArticleFoodit(article);

    const response = await postWeeklyMenu({
        article: articleTransformed,
        food: selectedFood,
        day: selectedDay
    });

    if (response && response.bookmarkId) {
        addToast({
            variant: TOAST.SUCCESS.VARIANT,
            title: TOAST.SUCCESS.TITLE,
            message: TOAST.SUCCESS.MESSAGE.SAVE_MENU
        });

        return response;
    }

    addErrorToast();
    return '';
};

export default saveMenu;
