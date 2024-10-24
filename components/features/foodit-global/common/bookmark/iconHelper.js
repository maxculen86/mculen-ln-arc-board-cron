export const BOOKMARK_FILLED = 'bookmark-filled';
export const BOOKMARK_PLUS = 'bookmark-plus';

const checkBookmarksInCarousel = carousel => {
    const recipes = carousel.querySelectorAll('[data-id]');

    const allFilled = Array.from(recipes).every(recipe => {
        const iconElement = recipe.querySelector('svg use');
        const iconHref = iconElement ? iconElement.getAttribute('href') : '';
        return iconHref.endsWith('#bookmark-filled');
    });

    const collectionIcon = carousel.querySelector(
        '[data-collectionid] svg use'
    );
    if (collectionIcon) {
        const href = collectionIcon.getAttribute('href');
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
    // Encuentra todos los botones que tienen un atributo data-id
    const elements = Array.from(document.querySelectorAll('button[data-id]'));

    articleIds.forEach(bookmarkTypeId => {
        // Encuentra los botones que coinciden con el data-id del artículo
        const buttons = elements.flatMap(el =>
            el.getAttribute('data-id') === bookmarkTypeId ? [el] : []
        );

        buttons.forEach(button => {
            // Cambiar el ícono SVG dentro del botón
            const svgElement = button.querySelector('svg');
            if (svgElement) {
                const icon = svgElement.querySelector('use');
                if (!icon) return;

                const href = icon.getAttribute('href');

                if (shouldFill) {
                    if (href.includes(BOOKMARK_FILLED)) return;
                    const newHref = href
                        .replace('bookmark', BOOKMARK_FILLED)
                        .replace('critical', 'default');
                    icon.setAttribute('href', newHref);
                } else {
                    if (!href.includes(BOOKMARK_FILLED)) return;
                    const newHref = href
                        .replace(BOOKMARK_FILLED, 'bookmark')
                        .replace('default', 'critical');
                    icon.setAttribute('href', newHref);
                }
            }

            const textNode = Array.from(button.childNodes).find(
                node =>
                    node.nodeType === Node.TEXT_NODE &&
                    node.nodeValue.trim() ===
                        (shouldFill ? 'Guardar' : 'Guardado')
            );
            if (textNode) {
                textNode.nodeValue = shouldFill ? 'Guardado' : 'Guardar';
            }
        });
    });

    checkCarouselsRoofBookmark();
};
