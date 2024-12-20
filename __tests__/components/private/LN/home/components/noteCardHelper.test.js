import { isSameNote } from '../../../../../../components/private/LN/home/components/noteCard/noteCardHelper';

describe('components - private - LN - home - components - noteCardHelper', () => {
    describe('isSameNote', () => {
        test('Should return true when IDs are equal, even with blank spaces', () => {
            expect(isSameNote('ID123', 'ID123')).toBeTruthy();
            expect(isSameNote('ID123 ', '    ID123 ')).toBeTruthy();
        });
        test('Should return false when IDs are NOT equal, even with blank spaces', () => {
            expect(isSameNote('IDMOCK', 'ID123')).toBeFalsy();
            expect(isSameNote('IDMOCK ', '    ID123 ')).toBeFalsy();
        });
        test('Should return false for edge cases, and not to throw error', () => {
            expect(isSameNote()).toBeFalsy();
            expect(isSameNote(null, null)).toBeFalsy();
            expect(isSameNote(2, 3)).toBeFalsy();
            expect(() => isSameNote(undefined, undefined)).not.toThrow();
        });
    });
});
