import { getHighestPriorityTag } from '../../../../../../components/features/recetas-global/common/utils/notaRecetaHelper.js';

describe('Recetas - notaRecetaHelper', () => {
    describe('getHighestPriorityTag function', () => {
        it('should return the highest priority tag', () => {
            const tags = [
                { text: 'saludable' },
                { text: 'rápida' },
                { text: 'clasica' },
                { text: 'vegana' },
                { text: 'vegetariana' }
            ];
            expect(getHighestPriorityTag(tags)).toBe('rápida');
        });

        it('should return the highest priority tag', () => {
            const tags = [
                { text: 'saludable' },
                { text: 'clasica' },
                { text: 'vegana' },
                { text: 'vegetariana' }
            ];
            expect(getHighestPriorityTag(tags)).toBe('saludable');
        });

        it('should empty string if tag doesnt match', () => {
            const tags = ['pepe'];
            expect(getHighestPriorityTag(tags)).toBe('');
        });

        it('should empty string with no tags', () => {
            expect(getHighestPriorityTag([])).toBe('');
        });

        it('should empty string with no tags', () => {
            expect(getHighestPriorityTag(undefined)).toBe('');
        });

        it('should empty string with no tags', () => {
            expect(getHighestPriorityTag(null)).toBe('');
        });
    });
});
