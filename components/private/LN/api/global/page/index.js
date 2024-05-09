import get from '../../../../common/utils/get';
import { validateChildrensByLayout } from './utils/validateChildrensByLayout';
import configSectionsByLayout from './config/configSectionsByLayout';
import responseElementBox from './utils/responseElementBox';
import addPropertiesByLayout from './utils/addPropertiesByLayout';
import configDiagramationsByLayout from './config/configDiagramationsByLayout';
import configOrderArticlesbyDiagramation from './config/configOrderArticlesbyDiagramation';

const getNewPageElements = (
    r,
    child,
    configurations,
    layoutPage,
    sectionWeb
) => {
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
                                    configurations,
                                    layoutPage
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
};

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

    const elementsPage =
        pageMergeSections &&
        pageMergeSections.sections &&
        pageMergeSections.sections.reduce((r, sectionWeb, i) => {
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

            // Add more fields and properties.
            elements = addPropertiesByLayout(
                sectionChildren,
                elements,
                diagramations,
                positionsArticlesbyDiagramation
            );
            // Para probar en esta etapa los elementos o cualquier cosa dentro de este reduce coloca:
            // if (get(checkElement, 'isValid', checkElement) !== true) {
            //     console.log(sectionWeb);
            //     console.log(checkElement);
            // }
            // r.push(elements);
            // return r;

            const child = elements;
            return getNewPageElements(
                r,
                child,
                configurations,
                layoutPage,
                sectionWeb
            );
        }, []);

    return {
        information: { layoutPage, layoutDate: new Date() },
        content_elements: elementsPage
    };
};

export default getPageElements;
