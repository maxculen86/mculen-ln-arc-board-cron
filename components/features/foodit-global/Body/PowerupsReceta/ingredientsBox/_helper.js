import postIngredientsList from '../../../common/shoppingList/api/postIngredientsList';
import { SITE_FOODIT } from 'fusion:environment';
import {
    addToast,
    addErrorToast,
    TOAST
} from '../../../common/bookmark/api/_helper';

export const saveIngredientsList = async ({ text, sections, id }) => {
    const response = await postIngredientsList({ text, sections, id });
    // TODO: hacer dinamico el message con el nombre de la receta que se elimina de la lista de compras
    // `${recipeName} ${TOAST.SUCCESS.MESSAGE.SAVE_INGREDIENTS}`

    if (response && response.bookmarkId) {
        addToast({
            variant: TOAST.SUCCESS.VARIANT,
            title: TOAST.SUCCESS.TITLE,
            message: TOAST.SUCCESS.MESSAGE.SAVE_INGREDIENTS
        });
    } else {
        addErrorToast();
    }
};

export const moreInfoElements = [
    {
        iconName: 'percent',
        text: 'Guía de equivalencias',
        url: `${SITE_FOODIT}/guia-de-cocina/guia-de-equivalencias-nid16042024/`
    },
    {
        iconName: 'swap-box',
        text: 'Guía de sustitutos de ingredientes',
        url: `${SITE_FOODIT}/guia-de-cocina/guia-de-sustituciones-nid16042024/`
    }
];
