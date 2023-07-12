import { addElementsByKey } from '../../../../../../../components/private/LN/api/global/page/common/utils/addElements';
import configDolarPositionbySection from './config/configDolarPositionbySection';
import { getNavigationTreeSource } from './config/configNavigationTreeSource';

// Add Dolar by Section

export const setDolarBySection = async (elementsPage, layoutPage) => {
    const configDolarsBySections = configDolarPositionbySection(layoutPage);

    const navigationTreeSourceResult = await getNavigationTreeSource({
        website: 'la-nacion-ar'
    });

    let elementsPageHome = elementsPage;

    if (
        navigationTreeSourceResult &&
        navigationTreeSourceResult.Termicas &&
        navigationTreeSourceResult.Termicas.dolar === 'false'
    ) {
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

export const setDolarByLayout = {
    'LN10-Home_Main': setDolarBySection
};

export default setDolarByLayout;
