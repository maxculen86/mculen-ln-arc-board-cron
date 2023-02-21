import get from '../../../../../../../components/private/common/utils/get';
import { equal } from './strategy/equal';
import { notequal } from './strategy/notequal';
import { atleastone } from './strategy/atleastone';
import {
    addElementsByKey,
    addElement
} from '../../../../../../../components/private/LN/api/global/page/common/utils/addElements';
import configBannerByLayout from '../../../config/configBannerByLayout';
import configTaskPositionBanners from '../../../config/configTaskPositionBanners.json';
import configBannerPositionbySection from '../../../config/configBannerPositionbySection';

const tasks = {
    Equal: equal,
    NotEqual: notequal,
    AtLeastOne: atleastone
};
// Add Banners by Section
export const setBannersBySection = (elementsPage, layoutPage) => {
    //export const setBannersBySection = (elementsPage, configBannersBySections) => {
    const configBannersBySections = configBannerPositionbySection(layoutPage);
    let elementsPageHome = elementsPage;
    Object.keys(configBannersBySections).forEach(sectionWeb => {
        const configElementToAdd = {
            ...configBannersBySections[sectionWeb],
            sectionWeb
        };
        elementsPageHome = addElementsByKey(
            configElementToAdd,
            sectionWeb,
            'sectionWeb',
            elementsPageHome
        );
    });
    return elementsPageHome;
};

// Add Banners by Section
export const setBannersByConfig = (elementsPage, layoutPage) => {
    //export const setBannersByConfig = (elementsPage, configBanner, banners) => {
    const banners = configBannerByLayout(layoutPage);
    let elementsPageHome = [];
    let lenLastBanner = -1;
    let indexValidBanner = 0;
    let positionValid;

    elementsPageHome = elementsPage.reduce((result, element) => {
        if (element) {
            const banner = banners[indexValidBanner];
            if (banner) {
                lenLastBanner += 1;

                const isValidConfig =
                    Array.isArray(configTaskPositionBanners) &&
                    configTaskPositionBanners.some(configItem => {
                        positionValid = configItem && configItem.position;
                        const isValid =
                            configItem &&
                            Array.isArray(configItem.conditions) &&
                            configItem.conditions.every(config => {
                                const task = config && config.task;

                                const res = tasks[task](
                                    element,
                                    config,
                                    lenLastBanner
                                );

                                return res;
                            });
                        return isValid;
                    });

                if (isValidConfig && positionValid) {
                    lenLastBanner = 0;
                    indexValidBanner += 1;

                    return result.concat(
                        addElement(element, banner, positionValid)
                    );
                }
            }

            return result.concat([element]);
        }

        return result;
    }, []);

    return elementsPageHome;
};

export const setBannerByLayout = {
    'LN-acumulado': setBannersBySection,
    'LN-Home_Main': setBannersBySection,
    'LN-Home_Sports': setBannersBySection,
    'LN10-Home_Main': setBannersByConfig
};

export default setBannerByLayout;
