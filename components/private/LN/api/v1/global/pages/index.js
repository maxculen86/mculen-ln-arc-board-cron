import get from '../../../../../common/utils/get';
import {
    checkIfValid,
    findSectionChildren
} from '../../../../../common/utils/validateSectionHome';
import getSections from './utils/getSections';
import getBannerPosition from './utils/getBannerPosition';

const boxMovePosition = {
    App_Anexo_11: { feature: 'Apertura_1', position: 'start' },
    App_Anexo_22: { feature: 'Apertura_1', position: 'bottom' }
};
const boxAssingTypes = {
    bySection: {
        Anexo_1: { type: 2 },
        Anexo_2: { type: 2 },
        App_Anexo_11: { type: 2 },
        App_Anexo_22: { type: 2 },
        default: { type: 0 }
    },
    byDiagramation: {
        grillaUltimasNoticias: { type: 3 },
        default: { type: 0 }
    }
};

const sectionbyLayout = {
    grillaUltimasNoticias: {
        subLayout: 'LN-acumulado/timeline'
    }
};
const setTypeElement = (sectionWeb, diagramation) => {
    let typeElement = 0;
    if (sectionWeb) {
        typeElement =
            boxAssingTypes?.bySection[sectionWeb] != null
                ? boxAssingTypes?.bySection[sectionWeb].type
                : boxAssingTypes?.bySection?.default?.type;
    }
    if (diagramation) {
        typeElement =
            boxAssingTypes?.byDiagramation[diagramation] != null
                ? boxAssingTypes?.byDiagramation[diagramation].type
                : boxAssingTypes?.byDiagramation?.default?.type;
    }
    return typeElement;
};
const segmentbySection = (elements, sectionChildren) => {
    if (!elements || !Array.isArray(elements)) {
        return elements;
    }
    const elementsValidate = [];

    elements &&
        elements.forEach(e => {
            if (e && e.information) {
                const diagramation = get(e.information, 'layout', null);
                const sectionByDiagramation = sectionbyLayout[diagramation];
                if (
                    e.articles &&
                    Array.isArray(e.articles) &&
                    sectionByDiagramation
                ) {
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
                                    },
                                    type: setTypeElement(null, diagramation),
                                    ...sectionByDiagramation
                                };
                                elemArray.push(subElementArray);
                                const subElementLayout = segmentbySection(
                                    elemArray,
                                    sectionChildren
                                );
                                if (
                                    subElementLayout &&
                                    subElementLayout.length &&
                                    subElementLayout.length > 0
                                ) {
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
                    } else {
                        const subChilds = sectionChildren
                            .filter(
                                x =>
                                    x && x.children && Array.isArray(x.children)
                            )
                            .map(x => {
                                return x.children;
                            });
                        if (
                            subChilds &&
                            subChilds.length &&
                            subChilds[0].filter(
                                s => s.type === sectionByDiagramation.subLayout
                            ).length > 0
                        ) {
                            elementsValidate.push(e);
                        }
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
        //console.log(children);
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

const moveSections = (sections, name) => {
    const sectionToMove = boxMovePosition[name];
    if (sectionToMove) {
        const indexSectionTo = sections.findIndex(
            x => x.nameSection === sectionToMove.feature
        );

        const indexSectionFrom = sections.findIndex(
            x => x.nameSection === name
        );

        if (indexSectionFrom > -1 && indexSectionTo > -1) {
            const elementToMove = sections[indexSectionFrom];
            if (elementToMove) {
                sections.splice(indexSectionFrom, 1);
                elementToMove.type = sectionToMove.type;
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
    const {
        children,
        renderables,
        arcSite,
        pageSections,
        layout: layoutPage
    } = props;
    const configurations = {
        arcSite
    };
    //return children;
    const pageMergeSections = getSections(pageSections, layoutPage);
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
                elements = segmentbySection(elements, sectionChildren);
            }

            const banner = getBannerPosition(layoutPage)[sectionWeb];

            //  Returns a new element according to the position of the banners of the established configuration
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
                                            type: setTypeElement(sectionWeb),
                                            feature: sectionMobile,
                                            ...b,
                                            configurations,
                                            nameSection: sectionWeb
                                        });
                                    }
                                    if (b.feature) {
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
