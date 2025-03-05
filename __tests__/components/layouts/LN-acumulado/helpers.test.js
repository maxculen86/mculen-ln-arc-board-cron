import {
    getSectionClassName,
    SECTIONS_URI_MAP
} from '../../../../components/layouts/LN-acumulado/helpers';

describe('getSectionClassName', () => {
    it('should handle all defined section paths', () => {
        Object.entries(SECTIONS_URI_MAP).forEach(([path, expectedClass]) => {
            expect(getSectionClassName(path)).toBe(expectedClass);
        });
    });

    it('should handle query parameters for all sections', () => {
        const queryParams = '?param=value&test=true';

        Object.entries(SECTIONS_URI_MAP).forEach(([path, expectedClass]) => {
            expect(getSectionClassName(`${path}${queryParams}`)).toBe(
                expectedClass
            );
        });
    });

    it('should return empty string for undefined paths', () => {
        expect(getSectionClassName('/undefined-path')).toBe('');
    });
    it('should return empty string for invalid paths', () => {
        expect(getSectionClassName('')).toBe('');
        expect(getSectionClassName('/')).toBe('');
    });
});
