import { isMultiproductGaComboType } from '../../../../../components/private/LN/common/utils/upsellingHelper';

describe('upsellingHelper', () => {
    describe('isMultiproductGaComboType', () => {
        it('returns true when ga-combo2 and ga-ComboFoodit are present', () => {
            expect(isMultiproductGaComboType('ga-combo2,ga-ComboFoodit')).toBe(
                true
            );
        });

        it('returns true regardless of value order or extra combo types', () => {
            expect(
                isMultiproductGaComboType(
                    'ga-ComboFoodit,ga-comboTriple,ga-combo2'
                )
            ).toBe(true);
        });

        it('does not exclude users with only ga-combo2', () => {
            expect(isMultiproductGaComboType('ga-combo2')).toBe(false);
        });

        it('does not exclude users with only ga-ComboFoodit', () => {
            expect(isMultiproductGaComboType('ga-ComboFoodit')).toBe(false);
        });

        it('returns false for missing or invalid values', () => {
            expect(isMultiproductGaComboType()).toBe(false);
            expect(isMultiproductGaComboType(null)).toBe(false);
        });
    });
});
