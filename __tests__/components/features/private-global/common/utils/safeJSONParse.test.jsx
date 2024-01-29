import safeJSONParse from '../../../../../../components/features/private-global/common/utils/safeJSONParse';

describe('safeJSONParse', () => {
    test('parses valid JSON string correctly', () => {
        const jsonString = JSON.stringify({ key: 'value' });
        expect(safeJSONParse(jsonString)).toEqual({ key: 'value' });
    });

    test('returns fallback value for invalid JSON string', () => {
        const invalidJsonString = "{ key: 'value' }";
        expect(safeJSONParse(invalidJsonString)).toEqual([]);
    });

    test('returns fallback value for null input', () => {
        expect(safeJSONParse(null)).toEqual([]);
    });

    test('returns a custom fallback value if provided', () => {
        const customFallback = { custom: 'fallback' };
        expect(safeJSONParse(null, customFallback)).toEqual(customFallback);
    });

    test('handles empty string as invalid JSON', () => {
        expect(safeJSONParse('')).toEqual([]);
    });

    test('handles non-string inputs as invalid JSON', () => {
        expect(safeJSONParse(123)).toEqual([]);
    });
});
