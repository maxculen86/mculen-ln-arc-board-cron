import {
    checkVariants,
    getParentChildren
} from '../../../../components/chains/utils/_helpers';
import renderablesWithVariants from '../../../../__mocks__/data/renderables/dataWithVariants.json';
import renderablesWithoutVariants from '../../../../__mocks__/data/renderables/data1.json';

const childrenWithVariants = [
    { key: 'f0f5lkDRl4911cD' },
    { key: 'f0f2JWjLLLl75AR' },
    { key: 'f0fPoecULLl75Nm' },
    { key: 'f0fmd4f6MLl75SR' },
    { key: 'f0fjat9aMLl75Ax' }
];

describe('Components - Chains - Utils - _helpers', () => {
    describe('checkVariants helper', () => {
        it('should return true when there are variants using children', () => {
            const hasVariants = checkVariants({
                renderables: renderablesWithVariants,
                children: childrenWithVariants
            });

            expect(hasVariants).toEqual(true);
        });

        it('should return false when there are not variants using children', () => {
            const hasVariants = checkVariants({
                renderables: renderablesWithoutVariants,
                children: childrenWithVariants
            });

            expect(hasVariants).toEqual(false);
        });

        it('should return true when there are variants using featureId', () => {
            const hasVariants = checkVariants({
                renderables: renderablesWithVariants,
                featureId: 'f0f5lkDRl4911cD'
            });

            expect(hasVariants).toEqual(true);
        });

        it('should return true when there are not variants using featureId', () => {
            const hasVariants = checkVariants({
                renderables: renderablesWithoutVariants,
                featureId: 'f0f5lkDRl4911cD'
            });

            expect(hasVariants).toEqual(false);
        });

        it('should return false if renderables is an empty array', () => {
            const hasVariants = checkVariants({
                renderables: [],
                featureId: 'f0f5lkDRl4911cD'
            });

            expect(hasVariants).toEqual(false);
        });

        it('should return false without arguments', () => {
            const hasVariants = checkVariants();
            expect(hasVariants).toEqual(false);
        });
    });

    describe('getParentChildren helper', () => {
        it('should return children if the feature id is inside renderable children list', () => {
            const mockParent = renderablesWithVariants.find(
                renderable => renderable.props.id === 'c0fyjWb4m4911Q6'
            );
            const children = getParentChildren(
                renderablesWithVariants,
                'f0f5lkDRl4911cD'
            );

            expect(children).toMatchObject(mockParent.children);
        });

        it('should return empty array if the feature id is not inside renderable children list', () => {
            const children = getParentChildren(
                renderablesWithVariants,
                'f0f5lkDRl4911cDx'
            );
            expect(children).toEqual([]);
        });

        it('should return empty array without arguments', () => {
            const children = getParentChildren();
            expect(children).toEqual([]);
        });
    });
});
