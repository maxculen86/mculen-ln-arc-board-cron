import { handleTabsEvent } from '../../../../../components/features/LN-10/IA/helpers';

import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('features - LN-common - IA - helpers', () => {
    describe('handleTabsEvent', () => {
        it('should set the correct event to the data layer', () => {
            const label = 'resumen_nota';

            handleTabsEvent(label);

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: 'resumen_nota'
            });
        });

        it('should handle empty label', () => {
            handleTabsEvent(undefined);

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: ''
            });
        });
    });
});
