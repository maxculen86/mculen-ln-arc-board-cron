import get from '../../../../../../../components/private/common/utils/get';
import configBannerByLayout from '../../../../../../../components/private/LN/api/global/page/config/configBannerByLayout';
import configTaskPositionBanners from '../../../config/configTaskPositionBanners.json';

import { setBannersByConfig } from '../../../common/elements/banners/index';
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
        const configBanners = configBannerByLayout(layoutPage);
        elementsPageHome = setBannersByConfig(
            elementsPageHome,
            configTaskPositionBanners,
            configBanners
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

        return elementsPageHome;
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
