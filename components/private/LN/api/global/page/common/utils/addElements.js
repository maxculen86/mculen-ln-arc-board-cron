export const addElementByPosition = (elements, typeElement, configElements) => {
    //const element = getBannerbyPosition(layoutPage);

    elements &&
        elements.length > 0 &&
        configElements &&
        typeof configElements === 'object' &&
        Object.keys(configElements).map(x => {
            const elementAdd = configElements[x];
            const indexToSetBanner = elements.findIndex(
                e =>
                    e &&
                    e.originPosition &&
                    e.originPosition.toString() === x.toString()
            );

            if (indexToSetBanner && elementAdd) {
                switch (elementAdd.position) {
                    case 'start':
                        elements.splice(indexToSetBanner, 0, elementAdd);
                        break;
                    case 'bottom':
                        elements.splice(indexToSetBanner + 1, 0, elementAdd);
                        break;
                    default:
                        // elements.push(banner);
                        break;
                }
            }
            return true;
        });

    return elements;
};

export const addElementsByKey = (
    configElementToAdd,
    valueKeyFrom,
    keyToFind,
    elements
) => {
    const elementsWithIndex =
        elements &&
        elements.map((el, index) => {
            return {
                index,
                ...el
            };
        });
    if (configElementToAdd && valueKeyFrom && keyToFind && elements) {
        const elementsToAdd = Array.isArray(configElementToAdd)
            ? configElementToAdd
            : [configElementToAdd];

        const elementsSectionTo = elementsWithIndex.filter(
            x => x[keyToFind] === configElementToAdd[keyToFind]
        );

        // console.log(elementsToAdd);
        // console.log(elementsSectionTo);

        if (
            Array.isArray(elementsToAdd) &&
            Array.isArray(elementsSectionTo) &&
            elementsToAdd.length > 0 &&
            elementsSectionTo.length > 0
        ) {
            // Set index to add Elements
            let indexSectionToFirst = elementsSectionTo[0].index;
            let indexSectionToLast =
                elementsSectionTo[elementsSectionTo.length - 1].index + 1;

            switch (configElementToAdd.position) {
                case 'start':
                    elementsToAdd.forEach(elementAdd => {
                        elements.splice(indexSectionToFirst, 0, elementAdd);
                        indexSectionToFirst += 1;
                    });
                    break;
                case 'bottom':
                    elementsToAdd.forEach(elementAdd => {
                        elements.splice(indexSectionToLast, 0, elementAdd);
                        indexSectionToLast += 1;
                    });

                    break;

                default:
                    break;
            }
        }
    }

    return elements;
};

export const addElement = (elementFrom, elementAdd, position) => {
    const elements = [];
    if (elementFrom && elementAdd) {
        switch (position) {
            case 'start':
                elements.push(elementAdd);
                elements.push(elementFrom);
                break;
            case 'bottom':
                elements.push(elementFrom);
                elements.push(elementAdd);

                break;

            default:
                break;
        }
    }

    return elements;
};

export default addElementByPosition;
