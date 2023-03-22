import { moveElementsByKey } from '../../../../../../../components/private/LN/api/global/page/common/utils/moveElements';
import { segmentSectionbyDiagramation } from '../../../../../../../components/private/LN/api/global/page/common/utils/divideElements';

// Move Sections
export const moveSections = (elementsPage, configMovePositions) => {
    let elementsPageHome = elementsPage;

    configMovePositions &&
        Object.keys(configMovePositions).forEach(sectionWeb => {
            const configElementToMove = configMovePositions[sectionWeb];

            elementsPageHome = moveElementsByKey(
                configElementToMove,
                sectionWeb,
                'sectionWeb',
                elementsPageHome
            );
        });
    return elementsPageHome;
};

// Divide Sections by feature's Layout or diagramation
export const divideSectionsByDiagramation = (
    elementsPage,
    configDivideByDiagramation
) => {
    let elementsPageHome = elementsPage;
    if (
        configDivideByDiagramation &&
        elementsPageHome &&
        Array.isArray(elementsPageHome) &&
        elementsPageHome.length > 0
    ) {
        elementsPageHome = segmentSectionbyDiagramation(
            elementsPageHome,
            configDivideByDiagramation
        );
    }
    return elementsPageHome;
};

export default moveSections;
