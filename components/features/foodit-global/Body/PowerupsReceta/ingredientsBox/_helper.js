import postIngredientsList from '../../../common/shoppingList/api/postIngredientsList';
import { SITE_FOODIT } from 'fusion:environment';

export const saveIngredientsList = async ({ text, sections, id }) => {
    const response = await postIngredientsList({ text, sections, id });

    if (response && response.bookmarkId) {
        window.LN.observable.publish('addToast', {
            variant: 'success',
            title: 'Guardado!',
            message: `Los ingredientes han sido añadidos a la lista de compras`
        });
    } else {
        window.LN.observable.publish('addToast', {
            variant: 'danger',
            title: 'Error!',
            message: `No se a podido añadir los ingredientes a la lista de compras`
        });
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
