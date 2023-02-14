import get from '../../../../../../../components/private/common/utils/get';
import configBannerPositionbySection from '../../../../../../../components/private/LN/api/global/page/config/configBannerPositionbySection';
import { addElementsByKey } from '../../../../../../../components/private/LN/api/global/page/common/utils/addElements';
import { moveElementsByKey } from '../../../../../../../components/private/LN/api/global/page/common/utils/moveElements';
import configToMoveBySection from '../../../../../../../components/private/LN/api/global/page/config/configToMoveBySection';
import { segmentSectionbyDiagramation } from '../../../../../../../components/private/LN/api/global/page/common/utils/divideElements';

const transform = async (dataPage, query) => {
    const {
        information: { layoutPage },
        content_elements: elementsPage
    } = dataPage;

    try {
        let elementsPageHome = elementsPage;
        // Add Banners by Section
        const configBannersBySections = configBannerPositionbySection(
            layoutPage
        );
        Object.keys(configBannersBySections).map(sectionWeb => {
            const configElementToAdd = {
                ...configBannersBySections[sectionWeb],
                sectionMobile: sectionWeb,
                sectionWeb
            };
            elementsPageHome = addElementsByKey(
                configElementToAdd,
                sectionWeb,
                'sectionWeb',
                elementsPageHome
            );

            return true;
        });

        // Move Sections
        const configMovePositions = configToMoveBySection(layoutPage);
        Object.keys(configMovePositions).map(sectionWeb => {
            const configElementToMove = configMovePositions[sectionWeb];
            elementsPageHome = moveElementsByKey(
                configElementToMove,
                sectionWeb,
                'sectionWeb',
                elementsPageHome
            );
            return true;
        });

        // Divide Section by configured features
        if (
            elementsPageHome &&
            Array.isArray(elementsPageHome) &&
            elementsPageHome.length > 0
        ) {
            const sectionbyDiagramation = ['grillaUltimasNoticias'];
            elementsPageHome = segmentSectionbyDiagramation(
                elementsPageHome,
                sectionbyDiagramation
            );
        }

        // Add property Order to elements
        // let indiceElements = -1;
        // elementsPageHome = elementsPageHome.map((e, i) => {
        //     if (e && e.type !== 1) {
        //         if (!get(e, 'information.idRenderParent', null)) {
        //             indiceElements += 1;
        //         }

        //         return { ...e, originPosition: indiceElements };
        //     }
        //     return { ...e };
        // });
        return elementsPageHome;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - v1/mobile/transform :  layout: ${layoutPage} - query: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
