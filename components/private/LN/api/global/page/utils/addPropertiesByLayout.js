import get from '../../../../../common/utils/get';
import { moveElementByPosition } from '../common/utils/moveElements';

// Set field diseno of config Diagramation and validate many fields
const setDiagramationInArticle = (configDiagramation, additionalProperties) => {
    if (!configDiagramation) {
        return null;
    }
    const configDiagramationValidate = configDiagramation;
    const { variant = 'regular' } = additionalProperties;

    if (['author', 'liveblogEnVivo'].includes(variant)) {
        configDiagramationValidate.imagePosition = null;
    }
    return configDiagramationValidate;
};

// Get configs Diagramations
const configsDiagramationFromInformation = (
    box,
    diagramations,
    positionsArticlesbyDiagramation
) => {
    let configDiagramation = null;
    let configMoveArticlesbyDiagramation = null;
    const informationBox = get(box, 'information', null);
    //  Get the diagramation according to the layout of the box
    if (informationBox && informationBox.layout) {
        configDiagramation = get(diagramations, informationBox.layout, null);
        configMoveArticlesbyDiagramation =
            positionsArticlesbyDiagramation &&
            positionsArticlesbyDiagramation[informationBox.layout];
    }
    return {
        configDiagramation,
        configMoveArticlesbyDiagramation
    };
};

// Add properties to  Chain Manual o Chain Collection
const setInformationInChain = (render, children) => {
    return {
        ...render,
        information: {
            ...get(render, 'information', null),
            nameChain: get(children, 'type', null),
            idRender: get(children, 'props.id', null)
        }
    };
};

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
    nameIndexforDiagrmation,
    diagramations,
    positionsArticlesbyDiagramation
) => {
    if (childrenArticle && childrenArticle.collection === 'features') {
        // Applies to cases of Chains that have LN Articles and Timeline
        if (get(article, 'information', null) != null) {
            const subBoxItem = setInformationInFeature(
                article,
                childrenArticle,
                get(sectionChildrenItem, 'props.id', null)
            );
            const {
                configDiagramation,
                configMoveArticlesbyDiagramation
            } = configsDiagramationFromInformation(
                article,
                diagramations,
                positionsArticlesbyDiagramation
            );
            subBoxItem.articles = addPropertiesChilds(
                get(subBoxItem, 'articles', []),
                null,
                configDiagramation,
                configMoveArticlesbyDiagramation,
                diagramations,
                positionsArticlesbyDiagramation
            );
            return subBoxItem;
        }
    }

    const element = article;

    // Applies to add properties to articles inside nested boxes such as opinion
    if (element && element.articles && Array.isArray(element.articles)) {
        const {
            configDiagramation,
            configMoveArticlesbyDiagramation
        } = configsDiagramationFromInformation(
            element,
            diagramations,
            positionsArticlesbyDiagramation
        );

        element.articles = addPropertiesInArticles(
            element.articles,
            sectionChildrenItem,
            configDiagramation,
            configMoveArticlesbyDiagramation,
            diagramations,
            positionsArticlesbyDiagramation
        );
    }

    // Applies to common cases of Chains that only have LN Articles or only articles
    return {
        ...element,
        additionalProperties: {
            ...get(article, 'additionalProperties', null),
            originPosition: nameIndexforDiagrmation,
            diseno: setDiagramationInArticle(
                configDiagramationChild,
                get(article, 'additionalProperties', {})
            ),
            nameFeature: get(childrenArticle, 'type', null),
            idRender: get(childrenArticle, 'props.id', null)
        }
    };
};

const addPropertiesChilds = (
    articles,
    sectionChildrenItem,
    configDiagramation,
    configMoveArticlesbyDiagramation,
    diagramations,
    positionsArticlesbyDiagramation
) => {
    return moveElementByPosition(
        articles.map((a, index) => {
            // Add properties of the chain's children such as layouts and important fields
            const childrenArticle =
                sectionChildrenItem &&
                sectionChildrenItem.children &&
                sectionChildrenItem.children[index];
            const nameIndexforDiagrmation = 'T'.concat((index + 1).toString());

            // Matches the diagrmation of the article or child
            const configDiagramationChild =
                configDiagramation &&
                configDiagramation[nameIndexforDiagrmation];

            return setInformationInArticle(
                a,
                childrenArticle,
                sectionChildrenItem,
                configDiagramationChild,
                nameIndexforDiagrmation,
                diagramations,
                positionsArticlesbyDiagramation
            );
        }),
        configMoveArticlesbyDiagramation,
        'additionalProperties.originPosition'
    );
};

const addPropertiesInArticles = (
    articles,
    sectionChildrenItem,
    configDiagramation,
    configMoveArticlesbyDiagramation,
    diagramations,
    positionsArticlesbyDiagramation
) => {
    return (
        Array.isArray(articles) &&
        addPropertiesChilds(
            articles,
            sectionChildrenItem,
            configDiagramation,
            configMoveArticlesbyDiagramation,
            diagramations,
            positionsArticlesbyDiagramation
        )
    );
};

// childrenArticle, childs' chain, feature LN/article or common/timeline
// sectionChildrenItem, chain LN_Caja_MAnual or feature accord position
// sectionChildren, rendereables
const addPropertiesByLayout = (
    sectionChildren,
    elements,
    diagramations,
    positionsArticlesbyDiagramation,
    isSubBox = false
) => {
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
                ['chains', 'features'].includes(sectionChildrenItem.collection)
            ) {
                const {
                    configDiagramation,
                    configMoveArticlesbyDiagramation
                } = configsDiagramationFromInformation(
                    e,
                    diagramations,
                    positionsArticlesbyDiagramation
                );
                let boxElement = {};
                if (sectionChildrenItem.collection === 'chains') {
                    boxElement = setInformationInChain(e, sectionChildrenItem);
                }
                if (sectionChildrenItem.collection === 'features') {
                    boxElement = setInformationInFeature(
                        e,
                        sectionChildrenItem
                    );
                }

                if (e && e.articles && Array.isArray(e.articles)) {
                    boxElement.articles = addPropertiesInArticles(
                        e.articles,
                        sectionChildrenItem,
                        configDiagramation,
                        configMoveArticlesbyDiagramation,
                        diagramations,
                        positionsArticlesbyDiagramation
                    );
                }
                return boxElement;
            }
            return e;
        });
    return newElements;
};

export default addPropertiesByLayout;
