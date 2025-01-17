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
        if (navigator?.clipboard) {
            await navigator.clipboard.writeText(text);
            addToast({
                variant: TOAST.SUCCESS.VARIANT,
                title: TOAST.SUCCESS.TITLE,
                message: TOAST.SUCCESS.MESSAGE.COPY_INGREDIENTS
            });
            return;
        }

        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Make the textarea invisible
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
            addToast({
                variant: TOAST.SUCCESS.VARIANT,
                title: TOAST.SUCCESS.TITLE,
                message: TOAST.SUCCESS.MESSAGE.COPY_INGREDIENTS
            });
        } else {
            throw new Error('execCommand copy failed');
        }
    } catch (error) {
        console.error('Error copying to clipboard:', error);
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
