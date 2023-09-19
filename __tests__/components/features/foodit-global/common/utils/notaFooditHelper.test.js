import {
    getHighestPriorityTag,
    validateArticleFoodit
} from '../../../../../../components/features/foodit-global/common/utils/notaFooditHelper';

describe('Foodit - notaFooditHelper', () => {
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

    describe('validateArticleFoodit', () => {
        it('Should return no id warning message', () => {
            expect(
                validateArticleFoodit({
                    id: undefined,
                    content: true
                })
            ).toMatchSnapshot();
        });

        it('Should return bad article ID warning message', () => {
            expect(
                validateArticleFoodit({
                    id: 'HLVF6HRMYNB2TI7L7G724OAPIU',
                    content: undefined
                })
            ).toMatchSnapshot();
        });
    });
});
