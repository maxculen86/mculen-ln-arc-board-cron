import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';

export const handleTabChange = (tab = '', label = '', setActiveTab) => {
    setActiveTab(tab);
    addEventToDataLayerV2({
        event: 'e_linkclick',
        action: 'IA',
        category: 'nota_ln9',
        label
    });
};

export const determineActiveTab = (arrayBullets = [], glossaryData = []) => {
    if (!arrayBullets.length && glossaryData.length) {
        return 'glossary';
    } else if (arrayBullets.length) {
        return 'summary';
    }
    return '';
};
