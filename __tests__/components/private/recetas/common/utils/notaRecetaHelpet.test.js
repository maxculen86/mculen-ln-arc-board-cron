import {
    getHighestPriorityTag,
    validateArticleReceta
} from '../../../../../../components/private/recetas/common/utils/notaRecetaHelper';

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

    describe('validateArticleReceta', () => {
        it('Should return no id warning message', () => {
            expect(
                validateArticleReceta({
                    id: undefined,
                    content: true
                })
            ).toMatchSnapshot();
        });

        it('Should return bad article ID warning message', () => {
            expect(
                validateArticleReceta({
                    id: 'HLVF6HRMYNB2TI7L7G724OAPIU',
                    content: undefined
                })
            ).toMatchSnapshot();
        });
    });
});
