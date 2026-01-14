import configByLayout from './config/configLiveByLayout';

const getFirstIndex = (elements, alias) =>
    elements.findIndex(
        el => el?.sectionAliasMobile?.toLowerCase() === alias.toLowerCase()
    );

const getLastIndex = (elements, alias, bottomIndex) => {
    const startFrom = bottomIndex !== 0 ? bottomIndex : elements.length - 1;
    for (let i = startFrom; i > 0; i -= 1) {
        if (
            elements[i]?.sectionAliasMobile?.toLowerCase() ===
            alias.toLowerCase()
        ) {
            return i;
        }
    }
    return -1;
};

const getItemsByAlias = (elements, alias) =>
    elements.filter(
        el => el?.sectionAliasMobile?.toLowerCase() === alias.toLowerCase()
    );

const getItemsWithoutAlias = (elements, alias) =>
    elements.filter(
        el => el?.sectionAliasMobile?.toLowerCase() !== alias.toLowerCase()
    );

export const setLiveByConfig = async (elementsPage, layoutPage) => {
    try {
        const liveConfig = configByLayout(layoutPage);
        if (!liveConfig) return elementsPage;

        const bottomItems = getItemsByAlias(
            elementsPage,
            liveConfig.bottomTo.sectionAliasMobile
        );

        if (bottomItems.length === 0) return elementsPage;

        const firstIndexBottom = getFirstIndex(
            elementsPage,
            liveConfig.upperTo.sectionAliasMobile
        );
        const lastIndexUpper = getLastIndex(
            elementsPage,
            liveConfig.bottomTo.sectionAliasMobile,
            firstIndexBottom === -1 ? 0 : firstIndexBottom
        );

        const enVivoItems = getItemsByAlias(
            elementsPage,
            liveConfig.element.sectionAliasMobile
        );
        const filteredArray = getItemsWithoutAlias(
            elementsPage,
            liveConfig.element.sectionAliasMobile
        );

        if (firstIndexBottom !== -1 || lastIndexUpper !== -1) {
            filteredArray.splice(lastIndexUpper, 0, ...enVivoItems);
        }

        return filteredArray;
    } catch (error) {
        console.warn(
            `Error /pageSource/common/elements/live/index.js : errorMsj:${error.message}`
        );
        return elementsPage;
    }
};

export const setLiveLayout = {
    'LN10-Home_Main': setLiveByConfig
};

export default setLiveByConfig;
