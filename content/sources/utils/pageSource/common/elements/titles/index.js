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
                if (configSectionAliasMobile.parameterToClone) {
                    const {
                        keyFind,
                        value,
                        fieldToClone
                    } = configSectionAliasMobile.parameterToClone;
                    const elementToClone = elementsPageHome.find(
                        x =>
                            x &&
                            keyFind &&
                            value &&
                            x[keyFind] &&
                            x[keyFind].toLowerCase() === value.toLowerCase()
                    );
                    if (
                        fieldToClone &&
                        elementToClone &&
                        elementToClone[fieldToClone]
                    ) {
                        configElementToAdd[fieldToClone] =
                            elementToClone[fieldToClone];
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
