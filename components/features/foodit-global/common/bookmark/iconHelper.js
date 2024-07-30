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

export const fillBookmarks = articleIds => {
    const elements = Array.from(document.querySelectorAll('svg'));

    articleIds.forEach(bookmarkTypeId => {
        const articleIdElements = elements.flatMap(el =>
            Array.from(el.querySelectorAll(`[data-id="${bookmarkTypeId}"] use`))
        );

        const svg = articleIdElements.map(el => el.closest('svg'));

        svg.forEach(svgElement => {
            const icon = svgElement.querySelector('use');
            if (!icon) return;

            const href = icon.getAttribute('href');
            if (href.includes(BOOKMARK_FILLED)) return;

            const newHref = href
                .replace('bookmark', BOOKMARK_FILLED)
                .replace('critical', 'default');

            icon.setAttribute('href', newHref);
        });
    });

    checkCarouselsRoofBookmark();
};

export const unfillBookmarks = articleIds => {
    const elements = Array.from(document.querySelectorAll('svg'));

    articleIds.forEach(bookmarkTypeId => {
        const articleIdElements = elements.flatMap(el =>
            Array.from(el.querySelectorAll(`[data-id="${bookmarkTypeId}"] use`))
        );

        const svg = articleIdElements.map(el => el.closest('svg'));

        svg.forEach(svgElement => {
            const icon = svgElement.querySelector('use');
            if (!icon) return;

            const href = icon.getAttribute('href');
            const newHref = href
                .replace(BOOKMARK_FILLED, 'bookmark')
                .replace('default', 'critical');

            icon.setAttribute('href', newHref);
        });
    });

    checkCarouselsRoofBookmark();
};
