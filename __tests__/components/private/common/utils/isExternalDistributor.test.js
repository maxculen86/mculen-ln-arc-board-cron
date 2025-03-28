import isExternalDistributor from '../../../../../components/private/common/utils/isExternalDistributor';

describe('isExternalDistributor', () => {
    test('should return true for external distributor', () => {
        expect(isExternalDistributor('The Washington Post', 'other', '')).toBe(
            true
        );
    });

    test('should return false for lanacionar distributor', () => {
        expect(isExternalDistributor('lanacionar', 'staff', 'Estándar')).toBe(
            false
        );
    });

    test('should return false for Estándar author type', () => {
        expect(
            isExternalDistributor('The Washington Post', 'other', 'Estándar')
        ).toBe(false);
    });
});
