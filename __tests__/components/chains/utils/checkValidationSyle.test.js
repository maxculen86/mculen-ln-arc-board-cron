import { validarEstilo } from '../../../../components/chains/utils/checkValidationStyle';

describe('Tests for the validarEstilo function', () => {
    test('When layout is bnFondo and chainStyle is red, the function returns false', () => {
        const result = validarEstilo('bnFondo', 'red');
        expect(result).toBe(false);
    });

    test('When layout is bnFondo and chainStyle is yellow, the function returns false', () => {
        const result = validarEstilo('bnFondo', 'yellow');
        expect(result).toBe(false);
    });

    test('When layout is bnFondo and chainStyle is not in fondoOptions, the function returns true', () => {
        const result = validarEstilo('bnFondo', 'other');
        expect(result).toBe(true);
    });

    test('When layout is not bnFondo and chainStyle is yellow, the function returns true', () => {
        const result = validarEstilo('other', 'yellow');
        expect(result).toBe(true);
    });

    test('When layout is bnFondo and chainStyle is white, the function returns false', () => {
        const result = validarEstilo('bnFondo', 'white');
        expect(result).toBe(false);
    });
});
