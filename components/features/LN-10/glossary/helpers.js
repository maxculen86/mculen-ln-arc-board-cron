import { scheduleTask } from '../../../private/common/utils/scheduleTask';
import addEventToDataLayer from '../../../private/LN/common/utils/addEventToDataLayer';

export const handleToggleCollapse = (onToggle, isOpen) => {
    onToggle?.();
    if (isOpen) {
        scheduleTask(() => {
            addEventToDataLayer({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: 'glosario'
            });
        });
    }
};
