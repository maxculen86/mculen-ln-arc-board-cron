import get from '../../../../../../../components/private/common/utils/get';
import configToDividebyDiagramation from '../../../../../../../components/private/LN/api/global/page/config/configToDividebyDiagramation';
import { setBannerByLayout } from '../../../common/elements/banners/index';
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

        // Add Banners by Config
        elementsPageHome = setBannerByLayout[layoutPage](
            elementsPageHome,
            layoutPage
        );

        // Move Sections
        const configMovePositions = configToMoveBySection(layoutPage);
        elementsPageHome = moveSections(elementsPageHome, configMovePositions);

        // Divide Section by Layout configured in features
        elementsPageHome = divideSectionsByDiagramation(
            elementsPageHome,
            configToDividebyDiagramation(layoutPage)
        );

        // Returns boxes that type not >= 9, for discard
        return (
            elementsPageHome &&
            elementsPageHome.filter(elem => elem && elem.type <= 9)
        );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - v2/mobile/transform :  layout: ${layoutPage} - query: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
