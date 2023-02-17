import get from '../../../../../../../components/private/common/utils/get';
import { equal } from './strategy/equal';
import { notequal } from './strategy/notequal';
import { atleastone } from './strategy/atleastone';
import {
    addElementsByKey,
    addElement
} from '../../../../../../../components/private/LN/api/global/page/common/utils/addElements';

const tasks = {
    Equal: equal,
    NotEqual: notequal,
    AtLeastOne: atleastone
};
// Add Banners by Section
export const setBannersBySection = (elementsPage, configBannersBySections) => {
    let elementsPageHome = elementsPage;
    Object.keys(configBannersBySections).forEach(sectionWeb => {
        const configElementToAdd = {
            ...configBannersBySections[sectionWeb],
            sectionMobile: sectionWeb,
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
export const setBannersByConfig = (elementsPage, configBanner, banners) => {
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
                    Array.isArray(configBanner) &&
                    configBanner.some(configItem => {
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

                                // console.log(task, config, lenLastBanner, res);

                                return res;
                            });
                        return isValid;
                    });

                if (isValidConfig && positionValid) {
                    lenLastBanner = 0;
                    indexValidBanner += 1;
                    // console.log(element);
                    // console.log(banner);
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

export default setBannersBySection;
