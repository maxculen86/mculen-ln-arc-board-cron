import { BackendLnError } from '../../../../../../../components/private/LN/api/common/models/backendLnError';
import configToDividebyDiagramation from '../../../../../../../components/private/LN/api/global/page/config/configToDividebyDiagramation';
import { setBannerByLayout } from '../../../common/elements/banners/index';
import { setDolarByLayout } from '../../../common/elements/dolars/index';
import { transformHtmlCardsByLayout } from '../../../common/elements/cardHtml/index';
import { setLiveLayout } from '../../../common/elements/live';
import { setRankingByLayout } from '../../../common/elements/ranking/index';
import { divideSectionsByDiagramation } from '../../../common/elements/sections/index';
import { setTitleByLayout } from '../../../common/elements/titles/index';

const validateData = (elements, layoutPage) => {
    if (!elements || !layoutPage) {
        throw new Error('Missing data Layout');
    }
};

const applySyncLayout = (fnByLayout, layoutPage, elements) => {
    if (!fnByLayout?.[layoutPage]) return elements;

    const result = fnByLayout[layoutPage](elements, layoutPage);

    return Array.isArray(result) && result.length > 0 ? result : elements;
};

const applyAsyncLayout = async (fnByLayout, layoutPage, elements) => {
    if (!fnByLayout?.[layoutPage]) return elements;

    const result = await fnByLayout[layoutPage](elements, layoutPage);

    return Array.isArray(result) && result.length > 0 ? result : elements;
};

const filterSections = elements =>
    Array.isArray(elements)
        ? elements.filter(
              elem =>
                  (elem && elem.type < 9) ||
                  elem.type === 10 ||
                  elem.type === 12 ||
                  elem.type === 13
          )
        : elements;

const transform = async (dataPage, query) => {
    const {
        information: { layoutPage } = {},
        content_elements: elementsPage = []
    } = dataPage;

    try {
        validateData(elementsPage, layoutPage);
        // Divide Section by Layout configured in features
        let elements = divideSectionsByDiagramation(
            elementsPage,
            configToDividebyDiagramation(layoutPage)
        );
        // Returns boxes that type not >= 9, for discard
        elements = filterSections(elements);
        // Add Component Title set file /pageSource/common/elements/titles/config/configTitlePositionbySection.js
        elements = applySyncLayout(setTitleByLayout, layoutPage, elements);
        // Add Banners by Configuration set in file /pageSource/common/elements/banners/config/configTaskPositionBanners.json
        elements = applySyncLayout(setBannerByLayout, layoutPage, elements);
        // Transform features with custom configuration for mobile
        elements = applySyncLayout(
            transformHtmlCardsByLayout,
            layoutPage,
            elements
        );
        // Add Component Dolar set file /pageSource/common/elements/dolar/config/configDolarPositionbySection.js
        elements = await applyAsyncLayout(
            setDolarByLayout,
            layoutPage,
            elements
        );
        // Add Component live set file /pageSource/common/elements/live/config/configLivePositionbySection.js
        elements = await applyAsyncLayout(setLiveLayout, layoutPage, elements);

        // Add Ranking by Configuration set in file /pageSource/common/elements/ranking/config/configRankingPositionbySection.json
        if (setRankingByLayout?.[layoutPage]) {
            const rankingResult = await setRankingByLayout[layoutPage]({
                website: query?.website,
                layoutPage,
                globalContent: {},
                elementsPage: elements
            });

            if (Array.isArray(rankingResult) && rankingResult.length > 0) {
                elements = rankingResult;
            }
        }
        return elements;
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
