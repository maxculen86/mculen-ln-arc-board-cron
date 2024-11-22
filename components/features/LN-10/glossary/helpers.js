import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';

export const handleToggleCollapse = (onToggle, isOpen) => {
    onToggle?.();
    if (isOpen) {
        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'IA',
            category: 'nota_ln9',
            label: 'glosario'
        });
    }
};
