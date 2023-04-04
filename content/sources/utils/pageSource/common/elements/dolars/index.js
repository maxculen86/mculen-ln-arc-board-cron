import { addElementsByKey } from '../../../../../../../components/private/LN/api/global/page/common/utils/addElements';
import configDolarPositionbySection from './config/configDolarPositionbySection';

// Add Dolar by Section

export const setDolarBySection = (elementsPage, layoutPage) => {
    const configDolarsBySections = configDolarPositionbySection(layoutPage);
    let elementsPageHome = elementsPage;
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
