import get from '../../../../common/utils/get';
import {
    checkIfValid,
    findSectionChildren
} from '../../../../common/utils/validateSectionHome';
import getSections from '../utils/getSections';
import getBannerPosition from '../utils/getBannerPosition';
import getTypesbyContainer from '../utils/getTypesbyContainer';
import getSectionAliasbyFeature from '../utils/getSectionAliasbyFeature';

const boxMovePosition = {
    Anexo_1: { sectionWeb: 'Apertura_1', position: 'start' },
    Anexo_2: { sectionWeb: 'Apertura_1', position: 'bottom' }
};

const sectionbyDiagramation = ['grillaUltimasNoticias'];
const setTypeElement = information => {
    if (information && (information.nameChain || information.nameFeature)) {
        return getTypesbyContainer(
            information.nameFeature ?? information.nameChain
        );
    }

    return 0;
};
const setSectionAliasbyFeature = (information, sectionMobile) => {
    if (information && information.nameFeature) {
        return (
            getSectionAliasbyFeature(information.nameFeature) ?? sectionMobile
        );
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

const setBannersInPosition = (elements, banner) => {
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

const addProperties = (sectionChildren, elements) => {
    const setInformationInFeature = (render, children) => {
        return {
            ...render,
            information: {
                ...get(render, 'information', null),
                nameFeature: children?.type,
                idRender: children?.props?.id
            }
        };
    };
    const newElements = elements?.map((e, i) => {
        if (sectionChildren[i]?.collection === 'chains') {
            return {
                ...e,
                information: {
                    ...get(e, 'information', null),
                    nameChain: sectionChildren[i]?.type,
                    idRender: sectionChildren[i]?.props?.id
                },
                articles: e?.articles?.map((a, index) => {
                    const childrenArticle = sectionChildren[i].children[index];
                    if (childrenArticle?.collection === 'features') {
                        if (get(a, 'information', null) != null) {
                            return setInformationInFeature(a, childrenArticle);
                        }
                        return {
                            ...a,
                            additionalProperties: {
                                ...get(a, 'additionalProperties', null),
                                nameFeature: childrenArticle?.type,
                                idRender: childrenArticle?.props?.id
                            }
                        };
                    }
                    return a;
                })
            };
        }
        if (sectionChildren[i]?.collection === 'features') {
            return setInformationInFeature(e, sectionChildren[i]);
        }
        return e;
    });
    return newElements;
};

const moveSections = (sections, sectionWeb) => {
    const sectionToMove = boxMovePosition[sectionWeb];
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
    //return children;
    const pageMergeSections = getSections(layoutPage);
    const rules = get(pageMergeSections, 'rules', []);
    // return { pageMergeSections };
    return (
        pageMergeSections &&
        pageMergeSections.sections &&
        pageMergeSections.sections.reduce((r, e, i) => {
            const { sectionWeb, sectionMobile } = e;

            // Check Section
            const sectionChildren = findSectionChildren(renderables, i);
            /*             const ggg = {
                res: checkIfValid(nameSectionWeb, sectionChildren, rules),
                nameSectionWeb
            }; */
            const checkElement = checkIfValid(
                sectionWeb,
                sectionChildren,
                rules
            );

            let elements =
                get(checkElement, 'isValid', false) === true
                    ? children[i]
                    : null;

            // Add fields as features
            elements = addProperties(sectionChildren, elements);

            // Divide Section by configured features
            if (elements && Array.isArray(elements) && elements.length > 0) {
                elements = segmentSectionbyDiagramation(elements);
            }

            const banner = getBannerPosition(layoutPage)[sectionWeb];

            //  Returns a new array elements with banners according to the position of the banners of the established configuration
            const child = setBannersInPosition(elements, banner);

            /*             const el = child;
            if (i > -1 && el != null) {
                r.push(el);
            } */

            if (child && Array.isArray(child) && child.length > 0) {
                if (sectionWeb === 'Anexo_1') {
                    //console.log(children[i][0]?.articles);
                    //console.log(elements[0]?.information);
                    //console.log(elements[0]?.articles);
                    //console.log(child[0]?.information);
                    //console.log(child[0]?.articles);
                }
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
                                            sectionAliasMobile: setSectionAliasbyFeature(
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
                    sectionWeb
                );
            }
            if (banner) {
                r.push(banner);
            }

            return r;
        }, [])
    );
};

export default getPageElements;
