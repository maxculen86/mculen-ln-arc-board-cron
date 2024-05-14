import { validateStyle } from '../../../../components/chains/utils/checkValidationStyle';

describe('Tests for the validateStyle function', () => {
    test('When layout is bnFondo and chainStyle is red, the function returns false', () => {
        const result = validateStyle('bnFondo', 'red');
        expect(result).toBe(false);
    });

    test('When layout is bnFondo and chainStyle is yellow, the function returns false', () => {
        const result = validateStyle('bnFondo', 'yellow');
        expect(result).toBe(false);
    });

    test('When layout is bnFondo and chainStyle is not in fondoOptions, the function returns true', () => {
        const result = validateStyle('bnFondo', 'other');
        expect(result).toBe(true);
    });

    test('When layout is not bnFondo and chainStyle is yellow, the function returns true', () => {
        const result = validateStyle('other', 'yellow');
        expect(result).toBe(true);
    });

    test('When layout is bnFondo and chainStyle is white, the function returns false', () => {
        const result = validateStyle('bnFondo', 'white');
        expect(result).toBe(false);
    });

    test('When layout is foodit_1_grid and chainStyle is foodit, the function returns false', () => {
        const result = validateStyle('foodit_1_grid', 'foodit');
        expect(result).toBe(false);
    });

    test('When layout is foodit_3_grid and chainStyle is foodit, the function returns false', () => {
        const result = validateStyle('foodit_3_grid', 'foodit');
        expect(result).toBe(false);
    });

    test('When layout is different foodit_3_grid and chainStyle is different foodit, the function returns true', () => {
        const result = validateStyle('foodit_3_grid', 'white');
        expect(result).toBe(true);
    });
});
