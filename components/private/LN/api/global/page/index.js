import get from '../../../../common/utils/get';
import configDiagramationsByLayout from './config/configDiagramationsByLayout';
import configOrderArticlesbyDiagramation from './config/configOrderArticlesbyDiagramation';
import configSectionsByLayout from './config/configSectionsByLayout';
import addPropertiesByLayout from './utils/addPropertiesByLayout';
import responseElementBox from './utils/responseElementBox';
import { validateChildrensByLayout } from './utils/validateChildrensByLayout';

const logGetNewPageElementsError = (e, layoutPage, b) => {
    console.error(
        JSON.stringify({
            name: 'BackendLnError',
            customErrorType: 'getNewPageElementsError',
            log_details: {
                error: e.message,
                layout: layoutPage,
                message: 'Ocurrio un error al procesar el elemento',
                element: b
            }
        })
    );
};

const isValidChildArray = child => Array.isArray(child) && child.length > 0;

const processElement = (b, sectionWeb, configurations, layoutPage) => {
    if (!b) return [];
    if (b.information && !b.information.hideCaja) {
        return responseElementBox(b, sectionWeb, configurations, layoutPage);
    }
    if (b.sectionAliasMobile) return b;
    return [];
};

const getNewPageElements = (
    r,
    child,
    configurations,
    layoutPage,
    sectionWeb
) => {
    if (!isValidChildArray(child)) return r;

    const processedChildren = child.reduce((res, b) => {
        try {
            const processed = processElement(
                b,
                sectionWeb,
                configurations,
                layoutPage
            );
            return res.concat(processed);
        } catch (e) {
            logGetNewPageElementsError(e, layoutPage, b);
            return res;
        }
    }, []);

    return r.concat(processedChildren);
};

const matchesSectionNames = (sectionWeb, sectionNames) => {
    if (!Array.isArray(sectionNames) || sectionNames.length === 0) {
        return true;
    }
    const sectionKey = sectionWeb.toLowerCase();
    return sectionNames.some(name => name.toLowerCase() === sectionKey);
};

const getPageElements = ({
    children,
    renderables,
    arcSite,
    layout: layoutPage,
    sectionNames
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
                if (!matchesSectionNames(sectionWeb, sectionNames)) {
                    return r;
                }

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
