import get from '../../../../../../../components/private/common/utils/get';
import { tasks } from '../common/strategy/index';
import {
    addElementsByKey,
    addElement
} from '../../../../../../../components/private/LN/api/global/page/common/utils/addElements';
import configDolarPositionbySection from './config/configDolarPositionbySection';
import { getNavigationTreeSource } from './config/configNavigationTreeSource';
import configDolarByLayout from './config/configDolarByLayout';
import configTaskPositionDolar from './config/configTaskPositionDolar.json';

const isValidsetDolarSection = async () => {
    const navigationTreeSourceResult = await getNavigationTreeSource({
        website: 'la-nacion-ar'
    });
    return (
        get(navigationTreeSourceResult, 'Termicas.dolar', 'true') !== 'false'
    );
};

// Add Dolar by Section

export const setDolarBySection = async (elementsPage, layoutPage) => {
    const configDolarsBySections = configDolarPositionbySection(layoutPage);

    let elementsPageHome = elementsPage;

    if (!(await isValidsetDolarSection())) {
        return elementsPageHome;
    }

    Object.keys(configDolarsBySections).forEach(sectionWeb => {
        const configElementToAdd = {
            ...configDolarsBySections[sectionWeb],
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

// Add Dolar by Config
export const setDolarByConfig = async (elementsPage, layoutPage) => {
    if (!(await isValidsetDolarSection())) {
        return elementsPage;
    }
    const dolars = configDolarByLayout(layoutPage);
    let lenLastDolar = -1;
    let indexValidDolar = 0;
    let positionValid;
    try {
        return elementsPage.reduce((result, element) => {
            if (element) {
                const dolar = dolars[indexValidDolar];
                if (dolar) {
                    lenLastDolar += 1;

                    const isValidConfig =
                        Array.isArray(configTaskPositionDolar) &&
                        configTaskPositionDolar.some(configItem => {
                            positionValid = configItem && configItem.position;
                            return (
                                configItem &&
                                Array.isArray(configItem.conditions) &&
                                configItem.conditions.every(config => {
                                    const task = config && config.task;

                                    return tasks[task](
                                        element,
                                        config,
                                        lenLastDolar
                                    );
                                })
                            );
                        });

                    if (isValidConfig && positionValid) {
                        lenLastDolar = 0;
                        indexValidDolar += 1;

                        return result.concat(
                            addElement(element, dolar, positionValid)
                        );
                    }
                }

                return result.concat([element]);
            }

            return result;
        }, []);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error /pageSource/common/elements/dolars/index.js :  errorMsj:${error.message}`
        );
        return elementsPage;
    }
};

export const setDolarByLayout = {
    'LN10-Home_Main': setDolarByConfig
};

export default setDolarByLayout;
