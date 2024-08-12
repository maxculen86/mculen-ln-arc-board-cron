import { handleToggleCollapse } from '../../../../../components/features/LN-10/glossary/helpers';
import { scheduleTask } from '../../../../../components/private/common/utils/scheduleTask';
import addEventToDataLayer from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/common/utils/scheduleTask',
    () => ({
        scheduleTask: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

describe('features - LN-10 - glossary - helpers - handleToggleCollapse', () => {
    it('should call onToggle function', () => {
        const onToggle = jest.fn();

        handleToggleCollapse(onToggle, false);

        expect(onToggle).toHaveBeenCalled();
        expect(scheduleTask).not.toHaveBeenCalled();
        expect(addEventToDataLayer).not.toHaveBeenCalled();
    });

    it('should call scheduleTask and addEventToDataLayer when isOpen is true', () => {
        const onToggle = jest.fn();

        handleToggleCollapse(onToggle, true);

        expect(onToggle).toHaveBeenCalled();
        expect(scheduleTask).toHaveBeenCalledWith(expect.any(Function));

        const scheduledTask = scheduleTask.mock.calls[0][0];
        scheduledTask();

        expect(addEventToDataLayer).toHaveBeenCalledWith({
            event: 'e_linkclick',
            action: 'IA',
            category: 'nota_ln9',
            label: 'glosario'
        });
    });
});
