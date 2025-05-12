import { processVolanta } from '../../../../../content/sources/utils/common/volantaHelper';

describe('Volanta Helper', () => {
    it('should add volanta when headlines.web exists', () => {
        const mockResult = {
            headlines: { web: 'Test Headline' },
            label: { text: 'Label' }
        };

        const result = processVolanta(mockResult);

        expect(result).toEqual({
            text: 'Label',
            volanta: {
                display: true,
                text: 'Test Headline'
            }
        });
    });

    it('should return original label when headlines.web is empty', () => {
        const mockResult = {
            headlines: { web: '' },
            label: { text: 'Label' }
        };

        const result = processVolanta(mockResult);

        expect(result).toEqual({ text: 'Label' });
    });

    it('should return original label when headlines.web is undefined', () => {
        const mockResult = {
            label: { text: 'Label' }
        };

        const result = processVolanta(mockResult);

        expect(result).toEqual({ text: 'Label' });
    });

    it('should handle empty label object', () => {
        const mockResult = {
            headlines: { web: 'Test Headline' }
        };

        const result = processVolanta(mockResult);

        expect(result).toEqual({
            volanta: {
                display: true,
                text: 'Test Headline'
            }
        });
    });
});
