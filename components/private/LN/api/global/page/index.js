import get from '../../../../common/utils/get';
import configDiagramationsByLayout from './config/configDiagramationsByLayout';
import configOrderArticlesbyDiagramation from './config/configOrderArticlesbyDiagramation';
import configSectionsByLayout from './config/configSectionsByLayout';
import addPropertiesByLayout from './utils/addPropertiesByLayout';
import responseElementBox from './utils/responseElementBox';
import { validateChildrensByLayout } from './utils/validateChildrensByLayout';

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
                    try {
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
                    } catch (e) {
                        console.error(
                            JSON.stringify({
                                name: 'BackendLnError',
                                customErrorType: 'getNewPageElementsError',
                                log_details: {
                                    error: e.message,
                                    layout: layoutPage,
                                    message: `Ocurrio un error al procesar el elemento`,
                                    element: b
                                }
                            })
                        );
                        return res;
                    }
                }, [])
            ) || []
        );
    }

    return r;
};

const getPageElements = ({
    children,
    renderables,
    arcSite,
    layout: layoutPage
}) => {
    const configurations = {
        arcSite
    };

    const pageMergeSections = configSectionsByLayout(layoutPage);
    const rules = get(pageMergeSections, 'rules', []);
    const diagramations = configDiagramationsByLayout(layoutPage);
    const positionsArticlesbyDiagramation =
        configOrderArticlesbyDiagramation(layoutPage);

    const elementsPage = pageMergeSections?.sections?.reduce(
        (r, sectionWeb, i) => {
            try {
                // Check Section
                const sectionChildren = validateChildrensByLayout[layoutPage][
                    '1'
                ](renderables, i);

                const checkElement = validateChildrensByLayout[layoutPage]['2'](
                    sectionWeb,
                    sectionChildren,
                    rules
                );

                const isSectionValid =
                    get(checkElement, 'isValid', checkElement) === true;
                let elements = isSectionValid ? children[i] : null;

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
            } catch (e) {
                console.error(
                    JSON.stringify({
                        name: 'BackendLnError',
                        customErrorType: 'getPageElementsError',
                        log_details: {
                            error: e.message,
                            layout: layoutPage,
                            message: `Ocurrio un error al procesar la sección ${sectionWeb}`,
                            section: sectionWeb
                        }
                    })
                );
                return r;
            }
        },
        []
    );

    return {
        information: { layoutPage, layoutDate: new Date() },
        content_elements: elementsPage
    };
};

export default getPageElements;
