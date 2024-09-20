import {
    handleTabChange,
    determineActiveTab
} from '../../../../../components/features/LN-10/IA/helpers';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('features - LN-common - IA - helpers', () => {
    describe('handleTabChange', () => {
        it('should set the active tab and send the correct event to the data layer', () => {
            const setActiveTabMock = jest.fn();
            const tab = 'summary';
            const label = 'resumen_nota';

            handleTabChange(tab, label, setActiveTabMock);

            expect(setActiveTabMock).toHaveBeenCalledWith('summary');
            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: 'resumen_nota'
            });
        });

        it('should handle empty label and tab as default params', () => {
            const setActiveTabMock = jest.fn();

            handleTabChange(undefined, undefined, setActiveTabMock);

            expect(setActiveTabMock).toHaveBeenCalledWith('');
            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: ''
            });
        });
    });
    describe('determineActiveTab', () => {
        it('should return "glossary" when arrayBullets is empty and glossaryData is not empty', () => {
            const result = determineActiveTab([], ['word1', 'word2']);
            expect(result).toBe('glossary');
        });

        it('should return "summary" when arrayBullets is not empty', () => {
            const result = determineActiveTab(['bullet1', 'bullet2'], []);
            expect(result).toBe('summary');
        });

        it('should return "summary" when both arrayBullets and glossaryData are not empty', () => {
            const result = determineActiveTab(['bullet1'], ['word1']);
            expect(result).toBe('summary');
        });

        it('should return an empty string when both arrayBullets and glossaryData are empty', () => {
            const result = determineActiveTab([], []);
            expect(result).toBe('');
        });

        it('should handle undefined values and default to empty arrays', () => {
            const result = determineActiveTab(undefined, undefined);
            expect(result).toBe('');
        });
    });
});
