import removeExtraSpaces from '../../../../../components/private/common/utils/removeExtraSpaces';

describe('removeExtraSpaces', () => {
    it('removes double spaces in the middle of the string', () => {
        expect(removeExtraSpaces('This  is an   example')).toBe(
            'This is an example'
        );
    });

    it('removes spaces at the beginning of the string', () => {
        expect(removeExtraSpaces('   Space at the beginning')).toBe(
            'Space at the beginning'
        );
    });

    it('removes spaces at the end of the string', () => {
        expect(removeExtraSpaces('Space at the end   ')).toBe(
            'Space at the end'
        );
    });

    it('removes spaces at the beginning, middle, and end', () => {
        expect(removeExtraSpaces('   Space  in   all places   ')).toBe(
            'Space in all places'
        );
    });

    it('does not modify a string without extra spaces', () => {
        expect(removeExtraSpaces('No extra spaces')).toBe('No extra spaces');
    });

    it('returns an empty string if given an empty string', () => {
        expect(removeExtraSpaces('')).toBe('');
    });
});
