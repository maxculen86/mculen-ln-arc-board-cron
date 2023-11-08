import { addInitialSlash } from '../../../../../../components/private/LN/common/utils/addInitialSlash';

describe('Test funcion addInitialSlash', () => {
    it('should return a string with an initial slash added when the input string is not null and does not start with a slash', () => {
        const result = addInitialSlash('example');
        expect(result).toBe('/example');
    });

    it('should return the input string when it is not null and starts with a slash', () => {
        const result = addInitialSlash('/example');
        expect(result).toBe('/example');
    });

    it('should return null when the input string is null', () => {
        const result = addInitialSlash(null);
        expect(result).toBeNull();
    });

    it('should return null when the input is not a string', () => {
        const result = addInitialSlash(123);
        expect(result).toBeNull();
    });

    it('should return a string with an initial slash added when the input string is an empty string', () => {
        const result = addInitialSlash('');
        expect(result).toBe(null);
    });
});
