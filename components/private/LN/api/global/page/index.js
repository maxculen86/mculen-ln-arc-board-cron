import get from '../../../../common/utils/get';
import {
    checkIfValid,
    findSectionChildren
} from '../../../../common/utils/validateSectionHome';
import {
    checkIfValid as checkIfValid10,
    findSectionChildren as findSectionChildren10
} from '../../../../common/utils/validateSectionHomeLN10';
import getSections from '../utils/getSections';
import getBannerPositionbySection from '../utils/getBannerPositionbySection';
import getBannerbyPosition from '../utils/getBannerbyPosition';
import getTypesbyContainer from '../utils/getTypesbyContainer';
import getSectionAliasbyFeatureOrChain from '../utils/getSectionAliasbyFeatureOrChain';
import getToMovePosition from '../utils/getToMovePosition';
import getDiagramations from '../utils/getDiagramations';

const checkbyLayout = {
    'LN-acumulado': {
        1: findSectionChildren,
        2: checkIfValid
    },
    'LN-Home_Main': {
        1: findSectionChildren,
        2: checkIfValid
    },
    'LN-Home_Sports': {
        1: findSectionChildren,
        2: checkIfValid
    },
    'LN10-Home_Main': {
        1: findSectionChildren10,
        2: checkIfValid10
    }
};

const sectionbyDiagramation = ['grillaUltimasNoticias'];
const setTypeElement = information => {
    if (information && (information.nameChain || information.nameFeature)) {
        const elementContainer =
            information.nameFeature == null
                ? information.nameChain
                : information.nameFeature;
        return getTypesbyContainer(elementContainer);
    }

    return 0;
};
const setSectionAliasbyFeatureOrChain = (information, sectionMobile) => {
    if (information && (information.nameFeature || information.nameChain)) {
        const sectionAliasbyFeature = getSectionAliasbyFeatureOrChain(
            information.nameFeature == null
                ? information.nameChain
                : information.nameFeature
        );
        return sectionAliasbyFeature == null
            ? sectionMobile
            : sectionAliasbyFeature;
    }
    return sectionMobile;
};
const segmentSectionbyDiagramation = elements => {
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
                                    elemArray
                                );
                                if (
                                    subElementLayout &&
                                    subElementLayout.length &&
                                    subElementLayout.length > 0
                                ) {
                                    // Place the position of the feature as a section according to the visual order on the web
                                    if (subElementNoIncludeIndex > 0) {
                                        elementsValidate.push(
                                            subElementLayout[0]
                                        );
                                    } else {
                                        elementsValidate.splice(
                                            0,
                                            0,
                                            subElementLayout[0]
                                        );
                                    }
                                }
                            });
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

const setBannersInPositionbySection = (elements, banner) => {
    if (elements && elements.length > 0 && banner) {
        switch (banner.position) {
            case 'middle':
                elements.splice(Math.floor(elements.length / 2), 0, banner);
                break;
            case 'start':
                elements.unshift(banner);
                break;
            default:
                elements.push(banner);
                break;
        }
    }
    return elements;
};

const setBannersbyPosition = (elements, layoutPage) => {
    const banners = getBannerbyPosition(layoutPage);

    elements &&
        elements.length > 0 &&
        banners &&
        typeof banners === 'object' &&
        Object.keys(banners).map(x => {
            const banner = banners[x];
            const indexToSetBanner = elements.findIndex(
                e =>
                    e &&
                    e.originPosition &&
                    e.originPosition.toString() === x.toString()
            );

            if (indexToSetBanner && banner) {
                switch (banner.position) {
                    case 'start':
                        elements.splice(indexToSetBanner, 0, banner);
                        break;
                    case 'bottom':
                        elements.splice(indexToSetBanner + 1, 0, banner);
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

const addProperties = (sectionChildren, elements, diagramations) => {
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
    const newElements =
        elements &&
        Array.isArray(elements) &&
        elements.map((e, i) => {
            if (e == null) {
                return e;
            }
            if (
                sectionChildren[i] &&
                sectionChildren[i].collection === 'chains'
            ) {
                let configDiagramation = null;
                const informationChain = get(e, 'information', null);
                //  Get the diagramation according to the layout of the box
                if (informationChain) {
                    configDiagramation = get(
                        diagramations,
                        informationChain.layout,
                        null
                    );
                }

                return {
                    ...e,
                    information: {
                        ...informationChain,
                        nameChain: sectionChildren[i].type,
                        idRender: get(sectionChildren[i], 'props.id', null)
                    },
                    articles:
                        Array.isArray(e.articles) &&
                        e.articles.map((a, index) => {
                            // Add properties of the chain's children such as layouts and important fields
                            const childrenArticle =
                                sectionChildren[i].children[index];
                            const nameIndexforDiagrmation = 'T'.concat(
                                (index + 1).toString()
                            );
                            // Matches the diagrmation of the article or child
                            const configDiagramationChild =
                                configDiagramation &&
                                configDiagramation[nameIndexforDiagrmation];
                            // Temporary code.  Only for test Diagramations
                            // if (configDiagramation) {
                            //     console.log('diagrmation finded');
                            //     console.log(nameIndexforDiagrmation);
                            // }
                            if (
                                childrenArticle &&
                                childrenArticle.collection === 'features'
                            ) {
                                if (get(a, 'information', null) != null) {
                                    return setInformationInFeature(
                                        a,
                                        childrenArticle,
                                        get(
                                            sectionChildren[i],
                                            'props.id',
                                            null
                                        )
                                    );
                                }
                                return {
                                    ...a,
                                    additionalProperties: {
                                        ...get(a, 'additionalProperties', null),
                                        diseno: configDiagramationChild,
                                        nameFeature: childrenArticle.type,
                                        idRender: get(
                                            childrenArticle,
                                            'props.id',
                                            null
                                        )
                                    }
                                };
                            }
                            return a;
                        })
                };
            }
            if (
                sectionChildren[i] &&
                sectionChildren[i].collection === 'features'
            ) {
                return setInformationInFeature(e, sectionChildren[i]);
            }
            return e;
        });
    return newElements;
};

const moveSections = (sections, sectionWeb, layoutPage) => {
    const sectionToMove = get(getToMovePosition(layoutPage), sectionWeb, null);
    if (sectionToMove) {
        const indexSectionTo = sections.findIndex(
            x => x.sectionWeb === sectionToMove.sectionWeb
        );

        const indexSectionFrom = sections.findIndex(
            x => x.sectionWeb === sectionWeb
        );

        if (indexSectionFrom > -1 && indexSectionTo > -1) {
            const elementToMove = sections[indexSectionFrom];
            if (elementToMove) {
                sections.splice(indexSectionFrom, 1);
                switch (sectionToMove.position) {
                    case 'bottom':
                        sections.splice(indexSectionTo + 1, 0, elementToMove);
                        break;
                    case 'start':
                        sections.splice(indexSectionTo, 0, elementToMove);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    return sections;
};

const getPageElements = props => {
    const { children, renderables, arcSite, layout: layoutPage } = props;
    const configurations = {
        arcSite
    };

    const pageMergeSections = getSections(layoutPage);
    const rules = get(pageMergeSections, 'rules', []);

    let elementsPage =
        pageMergeSections &&
        pageMergeSections.sections &&
        pageMergeSections.sections.reduce((r, e, i) => {
            const { sectionWeb, sectionMobile } = e;

            // Check Section
            const sectionChildren = checkbyLayout[layoutPage]['1'](
                renderables,
                i
            );

            const checkElement = checkbyLayout[layoutPage]['2'](
                sectionWeb,
                sectionChildren,
                rules
            );

            let elements =
                get(checkElement, 'isValid', checkElement) === true
                    ? children[i]
                    : null;

            // Add fields as features
            elements = addProperties(
                sectionChildren,
                elements,
                getDiagramations(layoutPage)
            );
            // Para probar en esta etapa los elementos o cuanquier cosa dentro de este reduce coloca:
            // r.push(elements);
            // return r;

            // Divide Section by configured features
            if (elements && Array.isArray(elements) && elements.length > 0) {
                elements = segmentSectionbyDiagramation(elements);
            }

            const banner = getBannerPositionbySection(layoutPage)[sectionWeb];

            //  Returns a new array elements with banners according to the section of the banners of the established configuration
            const child = setBannersInPositionbySection(elements, banner);

            if (child && Array.isArray(child) && child.length > 0) {
                return moveSections(
                    r.concat(
                        [].concat(
                            child.reduce((res, b) => {
                                if (b) {
                                    if (
                                        b.information &&
                                        !b.information.hideCaja
                                    ) {
                                        return res.concat({
                                            type: setTypeElement(b.information),
                                            sectionAliasMobile: setSectionAliasbyFeatureOrChain(
                                                b.information,
                                                sectionMobile
                                            ),
                                            ...b,
                                            configurations,
                                            sectionMobile,
                                            sectionWeb
                                        });
                                    }
                                    if (b.sectionAliasMobile) {
                                        return res.concat(b);
                                    }
                                }
                                return res;
                            }, [])
                        ) || []
                    ),
                    sectionWeb,
                    layoutPage
                );
            }
            if (banner) {
                r.push(banner);
            }

            return r;
        }, []);

    // Add property Order to elements
    let indiceElements = -1;
    elementsPage = elementsPage.map((e, i) => {
        if (e && e.type !== 1) {
            if (!get(e, 'information.idRenderParent', null)) {
                indiceElements += 1;
            }

            return { ...e, originPosition: indiceElements };
        }
        return { ...e };
    });

    //  Returns a new array elements with banners according to the position of the banners of the established configuration
    return setBannersbyPosition(elementsPage, layoutPage);
};

export default getPageElements;
