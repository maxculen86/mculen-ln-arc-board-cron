import postIngredientsList from '../../../common/shoppingList/api/postIngredientsList';
import { SITE_FOODIT } from 'fusion:environment';
import {
    addToast,
    addErrorToast,
    TOAST
} from '../../../common/bookmark/api/_helper';
import addEventToDataLayer from '../../../../../private/LN/common/utils/addEventToDataLayer';
import deleteIngredientList from '../../../common/shoppingList/api/deleteIngredientList';

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

        return response.bookmarkId;
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

export const ingredientsListReduce = (accumulator, currentList) => {
    if (currentList.typeList === 'ingredientes')
        return [...accumulator, currentList];

    const filteredItems = currentList.items.filter(
        item => item.includeInShoppingList
    );

    if (filteredItems.length)
        return [
            ...accumulator,
            {
                ...currentList,
                items: filteredItems
            }
        ];

    return accumulator;
};

export const handleIgredientListButton = async ({
    isSuscriptor,
    title,
    articleId,
    bookmarkId,
    setBookmarkId,
    ingredientsLists
}) => {
    if (isSuscriptor) {
        addEventToDataLayer({
            event: 'e_linkclick',
            category: 'interaction',
            label: 'receta',
            action: bookmarkId ? 'eliminar de la lista' : 'agregar a la lista',
            title,
            articleId
        });

        if (bookmarkId) {
            const { status } = await deleteIngredientList(
                bookmarkId,
                null,
                title
            );
            status === '200' && setBookmarkId(null);
        } else {
            const newBookmarkId = await saveIngredientsList({
                text: title,
                sections: ingredientsLists.reduce(ingredientsListReduce, []),
                id: articleId
            });
            newBookmarkId && setBookmarkId(newBookmarkId);
        }
    } else {
        window.LN.observable.publish('openModal', {});
    }
};
