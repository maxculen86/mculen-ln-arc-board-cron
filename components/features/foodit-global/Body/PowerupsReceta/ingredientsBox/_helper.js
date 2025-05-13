import { SITE_FOODIT } from 'fusion:environment';
import postIngredientsList from '../../../common/bookmark/api/postIngredientsList';
import {
    addToast,
    addErrorToast,
    TOAST
} from '../../../common/bookmark/api/_helper';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';
import deleteIngredientList from '../../../common/bookmark/api/deleteIngredientList';

export const saveIngredientsList = async ({ text, sections, id, portions }) => {
    const response = await postIngredientsList({
        text,
        sections,
        id,
        portions
    });

    if (response && response.bookmarkId) {
        addToast({
            variant: TOAST.SUCCESS.VARIANT,
            title: TOAST.SUCCESS.TITLE,
            message: TOAST.SUCCESS.MESSAGE.SAVE_INGREDIENTS
        });

        return response.bookmarkId;
    }
    addErrorToast();
    return '';
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

export const handleIngredientListButton = async ({
    isSuscriptor,
    title,
    articleId,
    bookmarkId,
    setBookmarkId,
    ingredientsLists,
    portions
}) => {
    if (isSuscriptor) {
        addEventToDataLayerV2({
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
            if (status === '200') {
                setBookmarkId(null);
            }
        } else {
            const newBookmarkId = await saveIngredientsList({
                text: title,
                sections: ingredientsLists.reduce(ingredientsListReduce, []),
                id: articleId,
                portions
            });
            if (newBookmarkId) {
                setBookmarkId(newBookmarkId);
            }
        }
    } else {
        window?.LN?.observable?.publish('openModal', {});
    }
};

export function modifyPortionsQuantity({
    ingredientsArray = [],
    currentPortion = 0,
    defaultPortion = 1
}) {
    const roundTo = 0.5;

    return ingredientsArray?.map(list => ({
        ...list,
        items: list?.items?.map(item => {
            const { amount, abbreviation, ingredient, fullIngredientString } =
                item || {};
            const originalAmount = parseFloat(amount) || 0;

            const newAmount =
                (currentPortion * originalAmount) / defaultPortion;
            const roundedAmount = Math.round(newAmount / roundTo) * roundTo;
            const quantityNumber = `${roundedAmount === Math.floor(roundedAmount) ? roundedAmount : roundedAmount.toFixed(1)}`;
            const fullText = `${abbreviation} de ${ingredient}`;

            const fullIngredientStringUpdated = `${String(Number(quantityNumber) || '')} ${fullText}`;

            return {
                ...item,
                amount: roundedAmount,
                fullIngredientString: amount
                    ? fullIngredientStringUpdated
                    : fullIngredientString
            };
        })
    }));
}

export const isItemInShoppingList = (shoppingList, articleId, bookmarkId) => {
    if (!shoppingList || !shoppingList.length) return false;

    if (bookmarkId) {
        return shoppingList.some(
            item => item.id === articleId && item.bookmarkId === bookmarkId
        );
    }
    return shoppingList.some(item => item.id === articleId);
};
