import get from '../../../../../../common/utils/get';

export const segmentSectionbyDiagramation = (
    elements,
    sectionbyDiagramation
) => {
    if (!elements || !Array.isArray(elements)) {
        return elements;
    }
    const elementsValidate = [];

    elements &&
        elements.forEach(e => {
            if (e && e.information) {
                const diagramation = get(e.information, 'layout', null);
                // Finds the section that contains a component or feature with layout included in the sectionbyDiagramation variable
                if (
                    e.articles &&
                    Array.isArray(e.articles) &&
                    sectionbyDiagramation.includes(diagramation)
                ) {
                    // Find position from structure how as {information, articles[{},{},{},{},articles]}
                    const subElementNoIncludeIndex = e.articles.findIndex(
                        x => x && x.articles && Array.isArray(x.articles)
                    );
                    if (subElementNoIncludeIndex >= 0) {
                        const subElement = {
                            ...e,
                            articles: [
                                ...e.articles.filter(
                                    x => x && !Array.isArray(x.articles)
                                )
                            ]
                        };
                        elementsValidate.push(subElement);

                        e.articles
                            .filter(x => x && Array.isArray(x.articles))
                            .forEach(elem => {
                                const elemArray = [];
                                const subElementArray = {
                                    ...elem,
                                    information: {
                                        ...get(elem, 'information', null),
                                        hideCaja: get(
                                            subElement.information,
                                            'hideCaja',
                                            null
                                        )
                                    }
                                };
                                elemArray.push(subElementArray);

                                const subElementLayout = segmentSectionbyDiagramation(
                                    elemArray,
                                    sectionbyDiagramation
                                );

                                if (
                                    subElementLayout &&
                                    subElementLayout.length &&
                                    subElementLayout.length > 0
                                ) {
                                    let positionSubSection =
                                        elementsValidate.length - 1;
                                    positionSubSection =
                                        positionSubSection >= 0
                                            ? positionSubSection
                                            : 0;
                                    // Place the position of the feature as a section according to the visual order on the web
                                    if (subElementNoIncludeIndex > 0) {
                                        elementsValidate.push(
                                            subElementLayout[0]
                                        );
                                    } else {
                                        elementsValidate.splice(
                                            positionSubSection,
                                            0,
                                            subElementLayout[0]
                                        );
                                    }
                                }
                            });
                    } else {
                        elementsValidate.push(e);
                    }
                } else {
                    elementsValidate.push(e);
                }
            } else {
                elementsValidate.push(e);
            }
        });
    return elementsValidate;
};

export default segmentSectionbyDiagramation;
