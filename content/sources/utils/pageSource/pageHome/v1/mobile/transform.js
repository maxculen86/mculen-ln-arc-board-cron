import get from '../../../../../../../components/private/common/utils/get';
import configBannerPositionbySection from '../../../../../../../components/private/LN/api/global/page/config/configBannerPositionbySection';
import { setBannersBySection } from '../../../common/elements/banners/index';
import {
    moveSections,
    divideSectionsByDiagramation
} from '../../../common/elements/sections/index';
import configToMoveBySection from '../../../../../../../components/private/LN/api/global/page/config/configToMoveBySection';

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
        elementsPageHome = setBannersBySection(
            elementsPageHome,
            configBannersBySections
        );

        // Move Sections
        const configMovePositions = configToMoveBySection(layoutPage);
        elementsPageHome = moveSections(elementsPageHome, configMovePositions);

        // Divide Section by Layout configured in features
        const configToDividebyDiagramation = ['grillaUltimasNoticias'];
        elementsPageHome = divideSectionsByDiagramation(
            elementsPageHome,
            configToDividebyDiagramation
        );
        // Returns boxes that type not >= 9, for discard
        return (
            elementsPageHome &&
            elementsPageHome.filter(elem => elem && elem.type <= 9)
        );
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
