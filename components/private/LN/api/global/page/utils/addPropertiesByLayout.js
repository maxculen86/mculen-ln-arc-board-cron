import get from '../../../../../common/utils/get';
import { moveElementByPosition } from '../common/utils/moveElements';

const addPropertiesByLayout = (
    sectionChildren,
    elements,
    diagramations,
    positionsArticlesbyDiagramation
) => {
    // Add properties to  Chain Manual o Chain Collection
    const setInformationInFeature = (render, children, idRenderParent) => {
        return {
            ...render,
            information: {
                ...get(render, 'information', null),
                nameFeature: get(children, 'type', null),
                idRender: get(children, 'props.id', null),
                idRenderParent
            }
        };
    };

    // Add properties to articles from Chain Manual o Chain Collection
    const setInformationInArticle = (
        article,
        childrenArticle,
        sectionChildrenItem,
        configDiagramationChild,
        nameIndexforDiagrmation
    ) => {
        if (childrenArticle && childrenArticle.collection === 'features') {
            // Applies to cases of Chains that have LN Articles and Timeline
            if (get(article, 'information', null) != null) {
                return setInformationInFeature(
                    article,
                    childrenArticle,
                    get(sectionChildrenItem, 'props.id', null)
                );
            }
        }
        // Applies to common cases of Chains that only have LN Articles or only articles
        return {
            ...article,
            additionalProperties: {
                ...get(article, 'additionalProperties', null),
                originPosition: nameIndexforDiagrmation,
                diseno: configDiagramationChild,
                nameFeature: childrenArticle && childrenArticle.type,
                idRender: get(childrenArticle, 'props.id', null)
            }
        };
    };

    const newElements =
        elements &&
        Array.isArray(elements) &&
        elements.map((e, i) => {
            if (e == null) {
                return e;
            }
            const sectionChildrenItem = sectionChildren[i];
            if (
                sectionChildrenItem &&
                sectionChildrenItem.collection === 'chains'
            ) {
                let configDiagramation = null;
                let configMoveArticlesbyDiagramation = null;
                const informationChain = get(e, 'information', null);
                //  Get the diagramation according to the layout of the box
                if (informationChain) {
                    configDiagramation = get(
                        diagramations,
                        informationChain.layout,
                        null
                    );
                    configMoveArticlesbyDiagramation =
                        positionsArticlesbyDiagramation &&
                        positionsArticlesbyDiagramation[
                            informationChain.layout
                        ];
                }

                return {
                    ...e,
                    information: {
                        ...informationChain,
                        nameChain: sectionChildrenItem.type,
                        idRender: get(sectionChildrenItem, 'props.id', null)
                    },
                    articles:
                        Array.isArray(e.articles) &&
                        moveElementByPosition(
                            e.articles.map((a, index) => {
                                // Add properties of the chain's children such as layouts and important fields
                                const childrenArticle =
                                    sectionChildrenItem.children[index];
                                const nameIndexforDiagrmation = 'T'.concat(
                                    (index + 1).toString()
                                );

                                // Matches the diagrmation of the article or child
                                const configDiagramationChild =
                                    configDiagramation &&
                                    configDiagramation[nameIndexforDiagrmation];

                                return setInformationInArticle(
                                    a,
                                    childrenArticle,
                                    sectionChildrenItem,
                                    configDiagramationChild,
                                    nameIndexforDiagrmation
                                );
                            }),
                            configMoveArticlesbyDiagramation,
                            'additionalProperties.originPosition'
                        )
                };
            }
            if (
                sectionChildrenItem &&
                sectionChildrenItem.collection === 'features'
            ) {
                return setInformationInFeature(e, sectionChildrenItem);
            }
            return e;
        });
    return newElements;
};

export default addPropertiesByLayout;
