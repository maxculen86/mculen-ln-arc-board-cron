const CUSTOM_PREPARACION = 'custom-preparacion';

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

export function processCustomPreparacion(
    contentElements,
    idPreparacionElement,
    includePhotos,
    orderedContent,
    processedSteps
) {
    const currentIndex = contentElements.findIndex(content => {
        if (!content) return false;
        const { _id: id } = content;
        return id === idPreparacionElement;
    });

    const nextPreparacionIndex = contentElements.findIndex(
        (element, index) =>
            index > currentIndex && element?.subtype === CUSTOM_PREPARACION
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
            const { _id: id = `img-${i}` } = element;
            orderedContent.push({
                type: 'image',
                id,
                url: element.url || '',
                caption: element.caption || ''
            });
        }
    }
}

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
        data?.subtype !== CUSTOM_PREPARACION
    ) {
        processListItems(orderedContent, processedSteps, data.items);
        return { orderedContent };
    }

    if (includePhotos && data?.type === 'image' && data?.url) {
        const { _id: id = 'img' } = data;
        orderedContent.push({
            type: 'image',
            id,
            url: data.url || '',
            caption: data.caption || ''
        });
        return { orderedContent };
    }

    if (data?.subtype === CUSTOM_PREPARACION) {
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

export function hasCustomPreparacion(contentElements) {
    return contentElements.some(
        element => element?.subtype === CUSTOM_PREPARACION
    );
}

export function isFirstPreparacionBody(contentElements, idPreparacionElement) {
    return (
        contentElements
            .filter(content => content?.subtype === CUSTOM_PREPARACION)
            .findIndex(content => {
                const { _id: id } = content;
                return id === idPreparacionElement;
            }) === 0
    );
}
