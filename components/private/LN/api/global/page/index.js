import get from '../../../../common/utils/get';
import { validateChildrensByLayout } from './utils/validateChildrensByLayout';
import configSectionsByLayout from './config/configSectionsByLayout';
import configBannerPositionbySection from './config/configBannerPositionbySection';
import responseElementBox from './utils/responseElementBox';
import addPropertiesByLayout from './utils/addPropertiesByLayout';
import configToMoveBySection from './config/configToMoveBySection';
import configDiagramationsByLayout from './config/configDiagramationsByLayout';
import configOrderArticlesbyDiagramation from './config/configOrderArticlesbyDiagramation';
import { segmentSectionbyDiagramation } from './common/utils/divideElements';
import { addElementsByKey } from './common/utils/addElements';
import { moveElementsByKey } from './common/utils/moveElements';

const getPageElements = props => {
    const { children, renderables, arcSite, layout: layoutPage } = props;
    const configurations = {
        arcSite
    };

    const pageMergeSections = configSectionsByLayout(layoutPage);
    const rules = get(pageMergeSections, 'rules', []);
    const diagramations = configDiagramationsByLayout(layoutPage);
    const positionsArticlesbyDiagramation = configOrderArticlesbyDiagramation(
        layoutPage
    );
    const configMovePositions = configToMoveBySection(layoutPage);

    let elementsPage =
        pageMergeSections &&
        pageMergeSections.sections &&
        pageMergeSections.sections.reduce((r, e, i) => {
            const { sectionWeb, sectionMobile } = e;

            // Check Section
            const sectionChildren = validateChildrensByLayout[layoutPage]['1'](
                renderables,
                i
            );

            const checkElement = validateChildrensByLayout[layoutPage]['2'](
                sectionWeb,
                sectionChildren,
                rules
            );

            let elements =
                get(checkElement, 'isValid', checkElement) === true
                    ? children[i]
                    : null;

            // Add fields as features
            elements = addPropertiesByLayout(
                sectionChildren,
                elements,
                diagramations,
                positionsArticlesbyDiagramation
            );
            // Para probar en esta etapa los elementos o cuanquier cosa dentro de este reduce coloca:
            // r.push(elements);
            // return r;
            const child = elements;
            if (child && Array.isArray(child) && child.length > 0) {
                return r.concat(
                    [].concat(
                        child.reduce((res, b) => {
                            if (b) {
                                if (b.information && !b.information.hideCaja) {
                                    return res.concat(
                                        responseElementBox(
                                            b,
                                            sectionWeb,
                                            sectionMobile,
                                            configurations
                                        )
                                    );
                                }
                                if (b.sectionAliasMobile) {
                                    return res.concat(b);
                                }
                            }
                            return res;
                        }, [])
                    ) || []
                );
            }

            return r;
        }, []);

    // Add Banners by Section
    // const configBannersBySections = configBannerPositionbySection(layoutPage);
    // Object.keys(configBannersBySections).map(sectionWeb => {
    //     const configElementToAdd = {
    //         ...configBannersBySections[sectionWeb],
    //         sectionMobile: sectionWeb,
    //         sectionWeb
    //     };
    //     elementsPage = addElementsByKey(
    //         configElementToAdd,
    //         sectionWeb,
    //         'sectionWeb',
    //         elementsPage
    //     );

    //     return true;
    // });

    // Move Sections
    // Object.keys(configMovePositions).map(sectionWeb => {
    //     const configElementToMove = configMovePositions[sectionWeb];
    //     elementsPage = moveElementsByKey(
    //         configElementToMove,
    //         sectionWeb,
    //         'sectionWeb',
    //         elementsPage
    //     );
    //     return true;
    // });

    // Divide Section by configured features
    // if (
    //     elementsPage &&
    //     Array.isArray(elementsPage) &&
    //     elementsPage.length > 0
    // ) {
    //     const sectionbyDiagramation = ['grillaUltimasNoticias'];
    //     elementsPage = segmentSectionbyDiagramation(
    //         elementsPage,
    //         sectionbyDiagramation
    //     );
    // }

    // Add property Order to elements
    // let indiceElements = -1;
    // elementsPage = elementsPage.map((e, i) => {
    //     if (e && e.type !== 1) {
    //         if (!get(e, 'information.idRenderParent', null)) {
    //             indiceElements += 1;
    //         }

    //         return { ...e, originPosition: indiceElements };
    //     }
    //     return { ...e };
    // });
    return { information: { layoutPage }, content_elements: elementsPage };
    // const banners = configBannerbyPosition(layoutPage);
    //  Returns a new array elements with banners according to the position of the banners of the established configuration
    // return addElementByPosition(elementsPage, 'banner', banners);
};

export default getPageElements;
