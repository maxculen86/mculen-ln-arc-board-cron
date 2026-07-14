import { bulletVariants } from '../../../../../components/features/LN/DS-SubNav/styles';

describe('Components - features - LN - DS-SubNav - styles', () => {
    describe('bulletVariants', () => {
        it('should use the neutral color by default', () => {
            const result = bulletVariants();
            expect(result).toContain('text-neutral-200');
        });

        it('should use the neutral color for the none brand', () => {
            const result = bulletVariants({ brand: 'none' });
            expect(result).toContain('text-neutral-200');
        });

        it('should map economia to the comunidad-de-negocios lighten color', () => {
            const result = bulletVariants({ brand: 'economia' });
            expect(result).toContain('text-comunidad-de-negocios-lighten');
        });

        it('should map propiedades to its lighten color', () => {
            const result = bulletVariants({ brand: 'propiedades' });
            expect(result).toContain('text-propiedades-lighten');
        });

        it('should map salud to the bienestar lighten color', () => {
            const result = bulletVariants({ brand: 'salud' });
            expect(result).toContain('text-bienestar-lighten');
        });

        it('should map autos to the movilidad lighten color', () => {
            const result = bulletVariants({ brand: 'autos' });
            expect(result).toContain('text-movilidad-lighten');
        });

        it('should map que-sale to its lighten color', () => {
            const result = bulletVariants({ brand: 'que-sale' });
            expect(result).toContain('text-que-sale-lighten');
        });

        it('should not apply the neutral color for a branded section', () => {
            const result = bulletVariants({ brand: 'economia' });
            expect(result).not.toContain('text-neutral-200');
        });
    });
});
