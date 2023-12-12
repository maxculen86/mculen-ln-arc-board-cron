import {
    getHighestPriorityTag,
    validateArticleFoodit,
    getRenderablesData
} from '../../../../../../components/features/foodit-global/common/utils/notaFooditHelper';

import renderables from '../../../../../../__mocks__/data/renderables/foodit/fooditRenderables2';

describe('Foodit - notaFooditHelper', () => {
    describe('getHighestPriorityTag function', () => {
        it('should return the highest priority tag', () => {
            const tags = [
                { name: 'Sin Gluten' },
                { name: 'Rápida' },
                { name: 'Clasica' },
                { name: 'Fácil' },
                { name: 'Vegana' },
                { name: 'Vegetariana' }
            ];
            expect(getHighestPriorityTag(tags)).toBe('Fácil');
        });

        it('should return the highest priority tag', () => {
            const tags = [
                { name: 'Keto' },
                { name: 'Maridaje' },
                { name: 'Vegana' },
                { name: 'Vegetariana' }
            ];
            expect(getHighestPriorityTag(tags)).toBe('Vegana');
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

    describe('getRenderablesData', () => {
        it('should return isOpening true if featureId is present in children', () => {
            const featureId = 'f0f5gjwJmp3u2hM';
            const result = getRenderablesData(renderables, featureId);
            expect(result.isOpening).toBe(true);
        });

        it('should return isOpening false if featureId is not present in children', () => {
            const featureId = 'fakeFeatureId';
            const result = getRenderablesData(renderables, featureId);
            expect(result.isOpening).toBe(false);
        });

        it('should return the correct layout value if featureId is present in children', () => {
            const featureId = 'f0feV8KtsvPmtxw';
            const result = getRenderablesData(renderables, featureId);
            expect(result.layout).toEqual('bn_2_grid');
        });

        it('should return an empty layout value if featureId is not present in children', () => {
            const featureId = 'fakeFeatureId';
            const result = getRenderablesData(renderables, featureId);
            expect(result.layout).toEqual('');
        });
    });
});
