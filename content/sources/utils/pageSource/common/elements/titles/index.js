import { addElementsByKey } from '../../../../../../../components/private/LN/api/global/page/common/utils/addElements';
import configTitlePositionbySection from './config/configTitlePositionbySection';

// Add Title by Section Alias

export const setTitleBySectionAlias = (elementsPage, layoutPage) => {
    const configTitlesBySections = configTitlePositionbySection(layoutPage);
    let elementsPageHome = elementsPage;
    configTitlesBySections &&
        Object.keys(configTitlesBySections).forEach(sectionAliasMobile => {
            const configSectionAliasMobile =
                configTitlesBySections[sectionAliasMobile];
            const configElementToAdd = {
                ...configTitlesBySections[sectionAliasMobile]
            };
            if (configSectionAliasMobile) {
                if (configSectionAliasMobile.parameterSectionToClone) {
                    const elementToClone = elementsPageHome.find(
                        x =>
                            x &&
                            x.sectionAliasMobile &&
                            x.sectionAliasMobile.toLowerCase() ===
                                configSectionAliasMobile.parameterSectionToClone.toLowerCase()
                    );
                    if (elementToClone && elementToClone.information) {
                        configElementToAdd.information =
                            elementToClone.information;
                    }
                }

                elementsPageHome = addElementsByKey(
                    configElementToAdd,
                    sectionAliasMobile,
                    'sectionAliasMobile',
                    elementsPageHome
                );
            }
        });
    return elementsPageHome;
};

export const setTitleByLayout = {
    'LN10-Home_Main': setTitleBySectionAlias
};

export default setTitleByLayout;
