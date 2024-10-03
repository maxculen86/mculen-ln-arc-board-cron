import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';

export const handleTabsEvent = (label = '') => {
    addEventToDataLayerV2({
        event: 'e_linkclick',
        action: 'IA',
        category: 'nota_ln9',
        label
    });
};
