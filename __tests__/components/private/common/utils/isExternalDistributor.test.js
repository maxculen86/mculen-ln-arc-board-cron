import isExternalDistributor from '../../../../../components/private/common/utils/isExternalDistributor';

describe('isExternalDistributor', () => {
    test('should return true for external distributor without authorId', () => {
        expect(
            isExternalDistributor('The Washington Post', 'other', undefined)
        ).toBe(true);
    });

    test('should return false for lanacionar distributor', () => {
        expect(isExternalDistributor('lanacionar', 'other', undefined)).toBe(
            false
        );
    });

    test('should return false when authorId is present', () => {
        expect(
            isExternalDistributor('The Washington Post', 'other', 'author-123')
        ).toBe(false);
    });
});
