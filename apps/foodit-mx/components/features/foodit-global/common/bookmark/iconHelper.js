export const BOOKMARK_FILLED = 'bookmark-filled';
export const BOOKMARK_PLUS = 'bookmark-plus';

const updateIconHref = (icon, shouldFill) => {
    const href = icon.getAttribute('href');
    const newHref = shouldFill
        ? href
              ?.replace('bookmark', BOOKMARK_FILLED)
              .replace('critical', 'default')
        : href
              ?.replace(BOOKMARK_FILLED, 'bookmark')
              .replace('default', 'critical');
    icon.setAttribute('href', newHref);
};

const updateButtonText = (button, shouldFill) => {
    const targetText = shouldFill ? 'Guardado' : 'Guardar';

    const textNodes = Array.from(button.childNodes).filter(
        node =>
            node.nodeType === Node.TEXT_NODE ||
            node.nodeType === Node.ELEMENT_NODE
    );

    const lastNode = textNodes[textNodes.length - 1];

    if (lastNode.nodeType === Node.TEXT_NODE) {
        lastNode.nodeValue = targetText;
    } else {
        lastNode.innerText = targetText;
    }
};

const processButton = (button, shouldFill) => {
    const svgElement = button.querySelector('svg');
    if (svgElement) {
        const icon = svgElement.querySelector('use');
        if (icon) {
            const href = icon.getAttribute('href');
            if (
                (shouldFill && !href.includes(BOOKMARK_FILLED)) ||
                (!shouldFill && href.includes(BOOKMARK_FILLED))
            ) {
                updateIconHref(icon, shouldFill);
            }
        }
    }
    updateButtonText(button, shouldFill);
};

const checkBookmarksInCarousel = carousel => {
    const recipes = carousel.querySelectorAll('[data-id]');

    const allFilled = Array.from(recipes).every(recipe => {
        const iconElement = recipe.querySelector('svg use');
        const iconHref = iconElement ? iconElement.getAttribute('href') : '';
        return iconHref.endsWith(`#${BOOKMARK_FILLED}`);
    });

    const collectionIcon = carousel.querySelector(
        '[data-collectionid] svg use'
    );
    const collectionText = carousel.querySelector('[data-collectionid] span');

    if (collectionText) {
        collectionText.innerText = allFilled ? 'Guardado' : 'Guardar todo';
    }
    if (collectionIcon) {
        const href = collectionIcon.getAttribute('href') ?? '';
        const newHref = allFilled
            ? href.replace(BOOKMARK_PLUS, BOOKMARK_FILLED)
            : href.replace(BOOKMARK_FILLED, BOOKMARK_PLUS);
        collectionIcon.setAttribute('href', newHref);
    }
};

const checkCarouselsRoofBookmark = () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(checkBookmarksInCarousel);
};

export const toggleBookmarks = (articleIds, shouldFill = true) => {
    const elements = Array.from(document.querySelectorAll('button[data-id]'));

    articleIds.forEach(bookmarkTypeId => {
        const buttons = elements.filter(
            el => el.getAttribute('data-id') === bookmarkTypeId
        );
        buttons.forEach(button => processButton(button, shouldFill));
    });

    checkCarouselsRoofBookmark();
};
