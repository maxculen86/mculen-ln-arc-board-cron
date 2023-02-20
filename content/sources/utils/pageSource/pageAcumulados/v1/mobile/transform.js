import { setBannerByLayout } from '../../../common/elements/banners/index';
import configToDividebyDiagramation from '../../../../../../../components/private/LN/api/global/page/config/configToDividebyDiagramation';

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
