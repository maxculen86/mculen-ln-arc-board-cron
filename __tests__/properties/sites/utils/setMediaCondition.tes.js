import setMediaCondition from '../../../../properties/sites/utils/setMediaCondition';

describe('setMediaCondition', () => {
    test('should return media condition with both minWidth and maxWidth', () => {
        expect(
            setMediaCondition({ minWidth: 500, maxWidth: 800 })
        ).toStrictEqual('(min-width: 500px) and (max-width: 800px)');
    });

    test('should return media condition with only minWidth', () => {
        expect(setMediaCondition({ minWidth: 500 })).toStrictEqual(
            '(min-width: 500px)'
        );
    });

    test('should return media condition with only maxWidth', () => {
        expect(setMediaCondition({ maxWidth: 800 })).toStrictEqual(
            '(max-width: 800px)'
        );
    });

    test('should return empty string if neither minWidth nor maxWidth provided', () => {
        expect(setMediaCondition({})).toStrictEqual('');
    });

    test('should return empty string if minWidth and maxWidth are both 0', () => {
        expect(setMediaCondition({ minWidth: 0, maxWidth: 0 })).toStrictEqual(
            ''
        );
    });

    test('should return empty string if properties is not defined or null', () => {
        expect(setMediaCondition(undefined)).toStrictEqual('');
        expect(setMediaCondition(null)).toStrictEqual('');
    });
});
