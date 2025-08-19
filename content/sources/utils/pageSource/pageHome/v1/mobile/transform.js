import configToDividebyDiagramation from '../../../../../../../components/private/LN/api/global/page/config/configToDividebyDiagramation';
import { setBannerByLayout } from '../../../common/elements/banners/index';
import { setTitleByLayout } from '../../../common/elements/titles/index';
import { setDolarByLayout } from '../../../common/elements/dolars/index';
import { divideSectionsByDiagramation } from '../../../common/elements/sections/index';
import { setRankingByLayout } from '../../../common/elements/ranking/index';
import { BackendLnError } from '../../../../../../../components/private/LN/api/common/models/backendLnError';
import { setLiveLayout } from '../../../common/elements/live';

const transform = async (dataPage, query) => {
    const {
        information: { layoutPage } = {},
        content_elements: elementsPage = []
    } = dataPage;

    try {
        let elementsPageHome = elementsPage;

        if (!elementsPageHome || !layoutPage) {
            throw new Error('Missing data Layout');
        }

        // Divide Section by Layout configured in features
        elementsPageHome = divideSectionsByDiagramation(
            elementsPageHome,
            configToDividebyDiagramation(layoutPage)
        );
        // Returns boxes that type not >= 9, for discard
        elementsPageHome =
            (Array.isArray(elementsPageHome) &&
                elementsPageHome.filter(
                    elem =>
                        (elem && elem.type < 9) ||
                        elem.type === 10 ||
                        elem.type === 12
                )) ||
            elementsPageHome;

        // Add Component Title set file /pageSource/common/elements/titles/config/configTitlePositionbySection.js
        elementsPageHome =
            (setTitleByLayout[layoutPage] &&
                setTitleByLayout[layoutPage](elementsPageHome, layoutPage)) ||
            elementsPageHome;

        // Add Banners by Configuration set in file /pageSource/common/elements/banners/config/configTaskPositionBanners.json
        elementsPageHome =
            (setBannerByLayout[layoutPage] &&
                setBannerByLayout[layoutPage](elementsPageHome, layoutPage)) ||
            elementsPageHome;

        // Add Component Dolar set file /pageSource/common/elements/dolar/config/configDolarPositionbySection.js
        elementsPageHome =
            (setDolarByLayout[layoutPage] &&
                (await setDolarByLayout[layoutPage](
                    elementsPageHome,
                    layoutPage
                ))) ||
            elementsPageHome;

        // Add Component live set file /pageSource/common/elements/live/config/configLivePositionbySection.js
        elementsPageHome =
            (setLiveLayout[layoutPage] &&
                (await setLiveLayout[layoutPage](
                    elementsPageHome,
                    layoutPage
                ))) ||
            elementsPageHome;
        // Add Ranking by Configuration set in file /pageSource/common/elements/ranking/config/configRankingPositionbySection.json
        const propsRanking = {
            website: query && query.website,
            layoutPage,
            globalContent: {},
            elementsPage: elementsPageHome
        };
        elementsPageHome =
            (setRankingByLayout[layoutPage] &&
                (await setRankingByLayout[layoutPage](propsRanking))) ||
            elementsPageHome;

        return elementsPageHome;
    } catch (error) {
        // eslint-disable-next-line no-console
        throw new BackendLnError(
            `Error Transform - v1/mobile/transform :  layout: ${layoutPage} - query: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
    }
};

export default transform;
