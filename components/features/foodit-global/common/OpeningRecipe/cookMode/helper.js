function getImageUrl(element) {
    if (element?.type === 'image' && element.url) {
        return element.url;
    }
    return null;
}

function getPreviousTitle(contentElements, currentIndex) {
    for (let i = currentIndex - 1; i >= 0; i -= 1) {
        const el = contentElements[i];

        if (el?.type !== 'image') {
            if (el?.type === 'header' && el?.level === 4) {
                return el?.content;
            }
            break;
        }
    }
    return null;
}

function extractStepsFromLists(contentElements) {
    if (!Array.isArray(contentElements)) return [];

    let prepIndex = -1;
    for (let i = 0; i < contentElements.length; i += 1) {
        const el = contentElements[i];
        if (
            el?.type === 'header' &&
            el?.content?.toLowerCase().includes('preparación')
        ) {
            prepIndex = i;
            break;
        }
    }

    if (prepIndex === -1) return [];

    const steps = [];

    for (let i = prepIndex + 1; i < contentElements.length; i += 1) {
        const el = contentElements[i];

        if (el?.type === 'header' && el?.level <= 3) break;

        const imageUrl = getImageUrl(el);
        if (imageUrl) {
            if (steps.length > 0) {
                steps[steps.length - 1].image = imageUrl;
            }
        } else if (el?.type === 'list' && el?.items?.length > 0) {
            const title = getPreviousTitle(contentElements, i);
            el.items.forEach(item => {
                steps.push({
                    step: steps.length + 1,
                    title,
                    description:
                        typeof item?.content === 'string' ? item.content : '',
                    image: null
                });
            });
        }
    }

    return steps;
}

function findFirstCustomPreparacionIndex(contentElements) {
    return contentElements.findIndex(
        el => el?.subtype === 'custom-preparacion'
    );
}

function assignImagesToCustomPrepSteps(
    contentElements,
    startIndex,
    customPrepSteps
) {
    for (let i = startIndex + 1; i < contentElements.length; i += 1) {
        const el = contentElements[i];
        if (el?.subtype === 'custom-preparacion') break;

        const imageUrl = getImageUrl(el);
        if (imageUrl) {
            const stepWithoutImage = customPrepSteps.find(step => !step.image);
            if (stepWithoutImage) {
                stepWithoutImage.image = imageUrl;
            }
        }
    }
}

export function extractSteps(contentElements) {
    if (!Array.isArray(contentElements)) return [];

    let stepCounter = 0;
    const customPrepSteps = [];

    contentElements.forEach(el => {
        if (el?.subtype === 'custom-preparacion') {
            const { titleList = '', items = [] } = el?.embed?.config || {};
            items.forEach(description => {
                stepCounter += 1;
                customPrepSteps.push({
                    step: stepCounter,
                    title: titleList || null,
                    description:
                        typeof description === 'string' ? description : '',
                    image: null
                });
            });
        }
    });

    if (customPrepSteps.length > 0) {
        const firstPrepIndex = findFirstCustomPreparacionIndex(contentElements);
        if (firstPrepIndex !== -1) {
            assignImagesToCustomPrepSteps(
                contentElements,
                firstPrepIndex,
                customPrepSteps
            );
        }
        return customPrepSteps;
    }

    return extractStepsFromLists(contentElements);
}

export function extractIngredients(contentElements) {
    if (!Array.isArray(contentElements)) return [];

    return contentElements.reduce((acc, el) => {
        const subtype = el?.subtype;
        if (
            subtype === 'foodit-ingredientes' ||
            subtype === 'custom-ingrediente'
        ) {
            const items = el?.embed?.config?.items || [];
            return [
                ...acc,
                ...items.map(item =>
                    typeof item === 'string'
                        ? item
                        : item.fullIngredientString || item.ingredient || ''
                )
            ];
        }
        return acc;
    }, []);
}
