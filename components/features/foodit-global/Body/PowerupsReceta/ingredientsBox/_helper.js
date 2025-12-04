import postIngredientsList from '../../../common/bookmark/api/postIngredientsList';
import {
    addToast,
    addErrorToast,
    TOAST
} from '../../../common/bookmark/api/_helper';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';
import deleteIngredientList from '../../../common/bookmark/api/deleteIngredientList';

export const saveIngredientsList = async ({
    text,
    sections,
    id,
    portions,
    canonicalUrl
}) => {
    const response = await postIngredientsList({
        text,
        sections,
        id,
        portions,
        canonicalUrl
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
    portions,
    canonicalUrl
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
                portions,
                canonicalUrl
            });
            if (newBookmarkId) {
                setBookmarkId(newBookmarkId);
            }
        }
    } else {
        window?.LN?.observable?.publish('openModal', {});
    }
};

const parseFraction = value => {
    if (!value) return 0;

    const str = value.toString().trim();
    const normalNumber = parseFloat(str);

    if (!Number.isNaN(normalNumber) && !str.includes('/')) {
        return normalNumber;
    }

    if (str.includes('/')) {
        const parts = str.split(' ');
        let wholeNumber = 0;
        let fractionPart = str;

        if (parts.length === 2) {
            [wholeNumber, fractionPart] = [parseFloat(parts[0]) || 0, parts[1]];
        }

        const [numerator, denominator] = fractionPart.split('/');
        if (numerator && denominator) {
            const num = parseFloat(numerator) || 0;
            const den = parseFloat(denominator) || 1;
            return wholeNumber + num / den;
        }
    }

    return 0;
};

const formatToFraction = decimal => {
    if (decimal === 0) return '0';

    if (decimal === Math.floor(decimal)) {
        return decimal.toString();
    }

    const wholeNumber = Math.floor(decimal);
    const decimalPart = decimal - wholeNumber;

    const fractions = [
        { decimal: 0.25, fraction: '1/4' },
        { decimal: 0.5, fraction: '1/2' },
        { decimal: 0.75, fraction: '3/4' }
    ];

    const match = fractions.find(
        ({ decimal: decValue }) => Math.abs(decimalPart - decValue) < 0.001
    );
    if (match) {
        return wholeNumber > 0
            ? `${wholeNumber} ${match.fraction}`
            : match.fraction;
    }

    return decimal.toFixed(1);
};

const parseNumericParam = (value, defaultValue = 0) => {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? defaultValue : parsed;
};

export function modifyPortionsQuantity({
    ingredientsArray = [],
    currentPortion = 0,
    defaultPortion = 1
}) {
    const ROUND_TO = 0.5;

    const validCurrentPortion = parseNumericParam(currentPortion, 0);
    const validDefaultPortion = parseNumericParam(defaultPortion, 1);

    return ingredientsArray?.map(list => ({
        ...list,
        items: list?.items?.map(item => {
            const {
                amount,
                abbreviation = '',
                ingredient = '',
                fullIngredientString
            } = item || {};

            const originalAmount = parseFraction(amount);
            const newAmount =
                (validCurrentPortion * originalAmount) / validDefaultPortion;
            const roundedAmount = Math.round(newAmount / ROUND_TO) * ROUND_TO;

            const safeAmount = Number.isNaN(roundedAmount) ? 0 : roundedAmount;

            const formattedQuantity = formatToFraction(safeAmount);
            const fullText = `${abbreviation} de ${ingredient}`;
            const updatedIngredientString = `${formattedQuantity} ${fullText}`;

            return {
                ...item,
                amount: safeAmount,
                fullIngredientString:
                    amount && safeAmount > 0
                        ? updatedIngredientString
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

export const registerShoppingListEventListeners = (
    articleId,
    bookmarkId,
    setLocalBookmarkId,
    events
) => {
    const handlers = {
        [events.BOOKMARK_ADDED]: event => {
            const { articleId: eventArticleId, bookmarkId: eventBookmarkId } =
                event.detail || {};
            if (
                eventArticleId === articleId &&
                eventBookmarkId !== bookmarkId
            ) {
                setLocalBookmarkId(eventBookmarkId);
            }
        },
        [events.BOOKMARK_REMOVED]: event => {
            const { articleId: eventArticleId } = event.detail || {};
            if (eventArticleId === articleId && bookmarkId !== null) {
                setLocalBookmarkId(null);
            }
        },
        [events.BOOKMARK_UPDATED]: event => {
            const { articleId: eventArticleId, bookmarkId: eventBookmarkId } =
                event.detail || {};
            if (eventArticleId === articleId) {
                setLocalBookmarkId(eventBookmarkId);
            }
        }
    };

    Object.entries(handlers).forEach(([eventType, handler]) => {
        window.addEventListener(eventType, handler);
    });

    return () => {
        Object.entries(handlers).forEach(([eventType, handler]) => {
            window.removeEventListener(eventType, handler);
        });
    };
};
