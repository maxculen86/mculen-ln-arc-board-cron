/* eslint-disable no-underscore-dangle */

/**
 * Process list items and add them to ordered content
 * @param {Array} items - The list items to process
 * @param {Array} orderedContent - The array to add processed items to
 * @param {Set} processedSteps - Set of already processed step contents
 */
export function processListItems(orderedContent, processedSteps, items = []) {
    items.forEach(listItem => {
        const stepContent = listItem.content;
        if (stepContent && !processedSteps.has(stepContent)) {
            orderedContent.push({
                type: 'step',
                content: stepContent
            });
            processedSteps.add(stepContent);
        }
    });
}

/**
 * Process custom preparation content
 * @param {Array} contentElements - The global content elements
 * @param {string} idPreparacionElement - ID of the preparation element
 * @param {boolean} includePhotos - Flag to include photos
 * @param {Array} orderedContent - The array to add processed items to
 * @param {Set} processedSteps - Set of already processed step contents
 */
export function processCustomPreparacion(
    contentElements,
    idPreparacionElement,
    includePhotos,
    orderedContent,
    processedSteps
) {
    const currentIndex = contentElements.findIndex(
        content => content?._id === idPreparacionElement
    );

    const nextPreparacionIndex = contentElements.findIndex(
        (element, index) =>
            index > currentIndex && element?.subtype === 'custom-preparacion'
    );

    const endIndex =
        nextPreparacionIndex !== -1
            ? nextPreparacionIndex
            : contentElements.length;

    for (let i = currentIndex + 1; i < endIndex; i += 1) {
        const element = contentElements[i];

        if (
            i > currentIndex + 1 &&
            element?.type === 'list' &&
            !includePhotos
        ) {
            break;
        }

        if (element?.type === 'list' && element.items) {
            processListItems(orderedContent, processedSteps, element.items);
        }

        if (includePhotos && element?.type === 'image' && element.url) {
            orderedContent.push({
                type: 'image',
                id: element._id || `img-${i}`,
                url: element.url || '',
                caption: element.caption || ''
            });
        }
    }
}

/**
 * Process the preparation content and return ordered content items
 * @param {Object} data - The component data
 * @param {Array} contentElements - Global content elements
 * @param {string} idPreparacionElement - ID of the preparation element
 * @param {Array} configItems - Items from config
 * @param {boolean} includePhotos - Flag to include photos
 * @returns {Object} Object containing the ordered content
 */
export function processPreparacionContent(
    data,
    contentElements,
    idPreparacionElement,
    configItems = [],
    includePhotos = false
) {
    const orderedContent = [];
    const processedSteps = new Set();

    if (configItems.length > 0) {
        configItems.forEach(item => {
            orderedContent.push({
                type: 'step',
                content: item
            });
            processedSteps.add(item);
        });
    }

    if (data?.type === 'header') {
        orderedContent.push({
            type: 'header',
            content: data.content,
            level: data.level || 3
        });
        return { orderedContent };
    }

    if (
        data?.type === 'list' &&
        data?.items &&
        data?.subtype !== 'custom-preparacion'
    ) {
        processListItems(orderedContent, processedSteps, data.items);
        return { orderedContent };
    }

    if (includePhotos && data?.type === 'image' && data?.url) {
        orderedContent.push({
            type: 'image',
            id: data._id || 'img',
            url: data.url || '',
            caption: data.caption || ''
        });
        return { orderedContent };
    }

    if (data?.subtype === 'custom-preparacion') {
        processCustomPreparacion(
            contentElements,
            idPreparacionElement,
            includePhotos,
            orderedContent,
            processedSteps
        );
    }

    return { orderedContent };
}

/**
 * Check if content has custom preparation
 * @param {Array} contentElements - Global content elements
 * @returns {boolean} Whether content has custom preparation
 */
export function hasCustomPreparacion(contentElements) {
    return contentElements.some(
        element => element?.subtype === 'custom-preparacion'
    );
}

/**
 * Check if current element is the first preparation body
 * @param {Array} contentElements - Global content elements
 * @param {string} idPreparacionElement - ID of the preparation element
 * @returns {boolean} Whether this is the first preparation body
 */
export function isFirstPreparacionBody(contentElements, idPreparacionElement) {
    return (
        contentElements.findIndex(
            content => content?._id === idPreparacionElement
        ) === 0
    );
}
