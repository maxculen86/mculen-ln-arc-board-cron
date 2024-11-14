import { addToast, TOAST, addErrorToast } from '../bookmark/api/_helper';

export const transformObjectToText = ({ text = '', sections = [] }) => {
    if (!sections.length) return '';

    const sectionDetails = sections
        .map(({ items = [], titleList = '' }) => {
            const itemsText = items.length
                ? items
                      .map(
                          ({ fullIngredientString = '' }) =>
                              `\t-${fullIngredientString}`
                      )
                      .join('\n')
                : '';

            return titleList ? `\t${titleList}:\n${itemsText}` : itemsText;
        })
        .join('\n\n');

    return `${text}\n\n${sectionDetails}`;
};

export const formatShoppingList = shoppingList =>
    shoppingList.reduce(
        (prev, currentList) =>
            `${prev}${transformObjectToText(currentList)}\n\n`,
        ''
    );

export const copyListToClipboard = async text => {
    try {
        await navigator.clipboard.writeText(text);
        addToast({
            variant: TOAST.SUCCESS.VARIANT,
            title: TOAST.SUCCESS.TITLE,
            message: TOAST.SUCCESS.MESSAGE.COPY_INGREDIENTS
        });
    } catch (error) {
        addErrorToast();
    }
};

export const shareList = async text => {
    if (navigator.share) {
        try {
            await navigator.share({
                text
            });
        } catch (error) {
            addErrorToast();
        }
    } else {
        addErrorToast();
    }
};
