import {
    handleTabsEvent,
    handleIaVisibility
} from '../../../../../components/features/LN-10/IA/helpers';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

xdescribe('features - LN-common - IA - helpers', () => {
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
            const setActiveTabMock = jest.fn();

            handleTabsEvent(undefined);

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: ''
            });
        });
    });
    describe('handleIaVisibility', () => {
        it('should return "glossary" when arrayBullets is empty and glossaryData is not empty', () => {
            const result = handleIaVisibility([], ['word1', 'word2']);
            expect(result).toBe('glossary');
        });

        it('should return "summary" when arrayBullets is not empty', () => {
            const result = handleIaVisibility(['bullet1', 'bullet2'], []);
            expect(result).toBe('summary');
        });

        it('should return "summary" when both arrayBullets and glossaryData are not empty', () => {
            const result = handleIaVisibility(['bullet1'], ['word1']);
            expect(result).toBe('summary');
        });

        it('should return an empty string when both arrayBullets and glossaryData are empty', () => {
            const result = handleIaVisibility([], []);
            expect(result).toBe('');
        });

        it('should handle undefined values and default to empty arrays', () => {
            const result = handleIaVisibility(undefined, undefined);
            expect(result).toBe('');
        });
    });
});
