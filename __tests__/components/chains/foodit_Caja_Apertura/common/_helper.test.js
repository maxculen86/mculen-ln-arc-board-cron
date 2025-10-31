import { validateOpeningFoodit } from '../../../../../components/chains/foodit_Caja_Apertura/common/_helper';

jest.mock(
    '../../../../../components/private/common/utils/pageBuilderValidator',
    () => jest.fn(rules => rules)
);
jest.mock(
    '../../../../../components/chains/foodit-global/common/utils/helper-WebApi',
    () => ({
        LAYOUTS: {
            BN_FOCAL_1: 'BN_FOCAL_1',
            BN_FOCAL_1_MAS_4: 'BN_FOCAL_1_MAS_4'
        }
    })
);

describe('validateOpeningFoodit', () => {
    it('should return error if layout is missing', () => {
        const result = validateOpeningFoodit({ childProps: [] });
        expect(result[0].validation).toBe(true);
        expect(result[0].message).toMatch(/seleccione una diagramación/);
    });

    it('should return error if more than 5 childProps', () => {
        const result = validateOpeningFoodit({
            layout: 'BN_FOCAL_1',
            childProps: [1, 2, 3, 4, 5, 6]
        });
        expect(result[1].validation).toBe(true);
        expect(result[1].message).toMatch(/no puede tener mas de 5 articulos/);
    });

    it('should return error if a child is not foodit/Card', () => {
        const result = validateOpeningFoodit({
            layout: 'BN_FOCAL_1',
            childProps: [{ type: 'other' }]
        });
        expect(result[2].validation).toBeTruthy();
        expect(result[2].message).toMatch(
            /solo puede tener hijos del tipo Foodit Card/
        );
    });

    it('should validate BN_FOCAL_1_MAS_4 layout rules', () => {
        const childProps = [
            { type: 'foodit/Card', customFields: { isDayRecipe: true } },
            { type: 'foodit/Card' },
            { type: 'foodit/Card' },
            { type: 'foodit/Card' },
            { type: 'foodit/Card' }
        ];

        let result = validateOpeningFoodit({
            layout: 'BN_FOCAL_1_MAS_4',
            childProps
        });
        expect(result[3].validation).toBe(false);
        expect(result[4].validation).toBe(false);

        childProps[1].customFields = { isDayRecipe: true };
        result = validateOpeningFoodit({
            layout: 'BN_FOCAL_1_MAS_4',
            childProps
        });
        expect(result[3].validation).toBe(true);

        result = validateOpeningFoodit({
            layout: 'BN_FOCAL_1_MAS_4',
            childProps: childProps.slice(0, 4)
        });
        expect(result[4].validation).toBe(true);
    });

    it('should validate BN_FOCAL_1 layout rules', () => {
        let result = validateOpeningFoodit({
            layout: 'BN_FOCAL_1',
            childProps: []
        });
        expect(result[3].validation).toBe(true);

        result = validateOpeningFoodit({
            layout: 'BN_FOCAL_1',
            childProps: [{ type: 'foodit/Card' }]
        });
        expect(result[3].validation).toBe(false);
    });

    it('should work with unknown layout (fallback to empty array)', () => {
        const result = validateOpeningFoodit({
            layout: 'UNKNOWN',
            childProps: []
        });
        expect(result.length).toBe(3);
        expect(result[0].message).toMatch(/seleccione una diagramación/);
    });

    it('should not return error if all children are foodit/Card', () => {
        const result = validateOpeningFoodit({
            layout: 'BN_FOCAL_1',
            childProps: [{ type: 'foodit/Card' }, { type: 'foodit/Card' }]
        });
        expect(result[2].validation).toBeFalsy();
    });
    it('should not return error if childProps is empty (find returns undefined)', () => {
        const result = validateOpeningFoodit({
            layout: 'BN_FOCAL_1',
            childProps: []
        });
        expect(result[2].validation).toBeFalsy();
    });
});
