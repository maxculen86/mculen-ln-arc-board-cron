import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import { getAuthTokens } from '../../../../../private/common/auth/helper/loginHelper';
import { addErrorToast, addToast, TOAST } from './_helper';
import { transformArticleFoodit } from '../../utils/notaFooditHelper';
import { getShortestImage } from '../../../../../private/LN/common/utils/mediaHelper';

export const INGREDIENTS_BOOKMARK_GROUP = '0c470be489a8782dda8265b77d0dfcd4';

const postWeeklyMenu = async ({ article, food, day }) => {
    const { token, accessToken } = await getAuthTokens();
    const {
        title,
        mobileTitle,
        articleId,
        canonicalUrl,
        primarySection,
        image: { resized_urls: resizedUrl },
        variant,
        tag
    } = article;

    if ((!token || !accessToken || !articleId || !day, !food)) return null;

    try {
        const response = await fetch(
            `${PERSONALIZACION_API_FOODIT}bookmarks/`,
            {
                method: 'POST',
                headers: {
                    'X-Token': token,
                    Authorization: accessToken
                },
                body: JSON.stringify({
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
                        title: mobileTitle || title,
                        variant,
                        tag
                    }
                })
            }
        );

        if (!response.ok) {
            console.error(
                `No se pudo guardar ${articleId} en menu semanal, HTTP error! status: ${response.status}`
            );
            return {
                bookmarkTypeId: articleId,
                bookmarkId: response.bookmarkId
            };
        }

        return await response.json();
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

        return response.bookmarkId;
    }
    addErrorToast();
    return '';
};

export default saveMenu;
