import {
    LOGO_SIZES,
    getLogoSize
} from '../../../../../../components/features/ui/ln/logoImage/styles';

describe('components - feature - ui - ln - logoBase - default', () => {
    it('should be an object with logo entries', () => {
        expect(typeof LOGO_SIZES).toBe('object');
        expect(Object.keys(LOGO_SIZES).length).toBeGreaterThan(0);
    });

    it('should have at least one dimension (w or h) per logo entry', () => {
        Object.entries(LOGO_SIZES).forEach(([, sizes]) => {
            const hasSomeDimension = Object.values(sizes).some(
                dim => dim.w !== undefined || dim.h !== undefined
            );
            expect(hasSomeDimension).toBe(true);
        });
    });
});

describe('getLogoSize', () => {
    describe('logo with both w and h defined', () => {
        it('should return w and h for "la-nacion" at size sm (default)', () => {
            expect(getLogoSize('la-nacion')).toEqual({ w: 215, h: 21 });
        });

        it('should return w and h for "la-nacion" at size xs', () => {
            expect(getLogoSize('la-nacion', 'xs')).toEqual({ w: 164, h: 16 });
        });

        it('should return w and h for "la-nacion" at size md', () => {
            expect(getLogoSize('la-nacion', 'md')).toEqual({ w: 306, h: 30 });
        });
    });

    describe('logo with only h defined (no w)', () => {
        it('should return an object with only h for "futuria" at sm', () => {
            expect(getLogoSize('futuria', 'sm')).toEqual({ h: 48 });
        });

        it('should return an object with only h for "ln-radio" at sm', () => {
            expect(getLogoSize('ln-radio', 'sm')).toEqual({ h: 48 });
        });
    });

    describe('unknown logo', () => {
        it('should return {} for a logoName that does not exist', () => {
            expect(getLogoSize('non-existent-logo')).toEqual({});
        });

        it('should return {} for an empty logoName', () => {
            expect(getLogoSize('')).toEqual({});
        });

        it('should return {} for undefined logoName', () => {
            expect(getLogoSize(undefined)).toEqual({});
        });
    });

    describe('size not defined for that logo', () => {
        it('should return {} when the logo does not have the requested size', () => {
            // "a-fondo-logo" only defines sm, not xs
            expect(getLogoSize('a-fondo-logo', 'xs')).toEqual({});
        });
    });

    describe('logoName normalization', () => {
        it('should strip -blanco suffix and resolve to the same dimensions as the base logo', () => {
            expect(getLogoSize('hola-blanco', 'sm')).toEqual(
                getLogoSize('hola', 'sm')
            );
        });

        it('should strip -blanco suffix for any logo', () => {
            expect(getLogoSize('brando-blanco', 'sm')).toEqual(
                getLogoSize('brando', 'sm')
            );
        });

        it('should resolve alias "lnmas-blanco" to "ln-mas" dimensions', () => {
            expect(getLogoSize('lnmas-blanco', 'sm')).toEqual(
                getLogoSize('ln-mas', 'sm')
            );
        });

        it('should use the explicit alias for "lnmas-blanco" rather than stripping -blanco', () => {
            // lnmas-blanco → ln-mas (alias), NOT → lnmas (non-existent)
            expect(getLogoSize('lnmas-blanco', 'sm')).toEqual({ w: 44, h: 26 });
        });
    });
});
