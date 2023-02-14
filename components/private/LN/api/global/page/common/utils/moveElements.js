import get from '../../../../../../common/utils/get';

export const moveElementsByKey = (
    configElementToMove,
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
    if (configElementToMove && valueKeyFrom && keyToFind && elements) {
        const elementsSectionFrom = elementsWithIndex.filter(
            x => x[keyToFind] === valueKeyFrom
        );
        const elementsSectionTo = elementsWithIndex.filter(
            x => x[keyToFind] === configElementToMove[keyToFind]
        );

        // console.log(elementsSectionFrom);
        // console.log(elementsSectionTo);

        if (
            Array.isArray(elementsSectionFrom) &&
            Array.isArray(elementsSectionTo) &&
            elementsSectionFrom.length > 0 &&
            elementsSectionTo.length > 0
        ) {
            const isDirectionToBottom =
                elementsSectionFrom[0].index < elementsSectionTo[0].index;

            // Init index to Set in direction bottom to top
            let indexSectionToFirst = elementsSectionTo[0].index;
            let indexSectionToLast =
                elementsSectionTo[elementsSectionTo.length - 1].index + 1;

            // Init index to Set in direction top to bottom
            if (isDirectionToBottom) {
                indexSectionToFirst = elementsSectionTo[0].index - 1;
                indexSectionToLast =
                    elementsSectionTo[elementsSectionTo.length - 1].index;
            }

            switch (configElementToMove.position) {
                case 'bottom':
                    elementsSectionFrom.forEach(elementToMove => {
                        elements.splice(elementToMove.index, 1);
                        elements.splice(indexSectionToLast, 0, elementToMove);
                        indexSectionToLast += 1;
                    });

                    break;
                case 'start':
                    elementsSectionFrom.forEach(elementToMove => {
                        elements.splice(elementToMove.index, 1);
                        elements.splice(indexSectionToFirst, 0, elementToMove);
                        indexSectionToFirst += 1;
                    });
                    break;
                default:
                    break;
            }
        }
    }

    return elements;
};

export const moveElementByKey = (
    configElementToMove,
    valueKeyFrom,
    keyToFind,
    elements
) => {
    if (configElementToMove && valueKeyFrom && keyToFind && elements) {
        const indexSectionTo = elements.findIndex(
            x => x[keyToFind] === configElementToMove[keyToFind]
        );

        const indexSectionFrom = elements.findIndex(
            x => x[keyToFind] === valueKeyFrom
        );

        const isDirectionToBottom = indexSectionFrom < indexSectionTo;

        if (indexSectionFrom > -1 && indexSectionTo > -1) {
            const elementToMove = elements[indexSectionFrom];
            if (elementToMove) {
                elements.splice(indexSectionFrom, 1);
                switch (configElementToMove.position) {
                    case 'bottom':
                        if (isDirectionToBottom) {
                            elements.splice(indexSectionTo, 0, elementToMove);
                        } else {
                            elements.splice(
                                indexSectionTo + 1,
                                0,
                                elementToMove
                            );
                        }

                        break;
                    case 'start':
                        if (isDirectionToBottom) {
                            elements.splice(
                                indexSectionTo - 1,
                                0,
                                elementToMove
                            );
                        } else {
                            elements.splice(indexSectionTo, 0, elementToMove);
                        }

                        break;
                    default:
                        break;
                }
            }
        }
    }

    return elements;
};

export const moveElementByPosition = (
    elements,
    configToMoveElement,
    keyToFindElement
) => {
    configToMoveElement &&
        Array.isArray(configToMoveElement) &&
        configToMoveElement.map(x => {
            const indexFrom =
                elements &&
                elements.findIndex(
                    e => x && e && get(e, keyToFindElement, null) === x.keyFrom
                );
            const indexTo =
                elements &&
                elements.findIndex(
                    e => x && e && get(e, keyToFindElement, null) === x.keyTo
                );
            if (indexTo > -1 && indexFrom > -1) {
                const articleRemoved = elements.splice(indexFrom, 1);
                elements.splice(indexTo, 0, articleRemoved[0]);
            }

            return true;
        });
    return elements;
};

const setPositionArticlesbyDiagramation = (
    articles,
    positionsArticlesbyDiagramation,
    keyDiagramation
) => {
    const configMoveArticlesbyDiagramation =
        positionsArticlesbyDiagramation &&
        positionsArticlesbyDiagramation[keyDiagramation];

    configMoveArticlesbyDiagramation &&
        Array.isArray(configMoveArticlesbyDiagramation) &&
        configMoveArticlesbyDiagramation.map(x => {
            const indexFromSetArticle =
                articles &&
                articles.findIndex(
                    e =>
                        x &&
                        e &&
                        get(e, 'additionalProperties.originPosition', null) ===
                            x.keyFrom
                );
            const indexToSetArticle =
                articles &&
                articles.findIndex(
                    e =>
                        x &&
                        e &&
                        get(e, 'additionalProperties.originPosition', null) ===
                            x.keyTo
                );
            if (indexToSetArticle > -1 && indexFromSetArticle > -1) {
                const articleRemoved = articles.splice(indexFromSetArticle, 1);
                articles.splice(indexToSetArticle, 0, articleRemoved[0]);
            }

            return true;
        });
    return articles;
};

export default setPositionArticlesbyDiagramation;
