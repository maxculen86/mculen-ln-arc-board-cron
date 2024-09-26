import { handleToggleCollapse } from '../../../../../components/features/LN-10/glossary/helpers';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        __esModule: true,
        addEventToDataLayerV2: jest.fn()
    })
);

describe('features - LN-10 - glossary - helpers - handleToggleCollapse', () => {
    it('should call onToggle function', () => {
        const onToggle = jest.fn();

        handleToggleCollapse(onToggle, false);

        expect(onToggle).toHaveBeenCalled();
        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('should call scheduleTask and addEventToDataLayer when isOpen is true', () => {
        const onToggle = jest.fn();

        handleToggleCollapse(onToggle, true);

        expect(onToggle).toHaveBeenCalled();

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            action: 'IA',
            category: 'nota_ln9',
            label: 'glosario'
        });
    });
});
