import { validateGamesChain } from '../../../../components/chains/LN10_Caja_Juegos_v2/common/_helper';

describe('Tests function validateGamesChain', () => {
    test('should return warning when diagramation is not defined', () => {
        expect(validateGamesChain('LN10-Home_Main', undefined)).toEqual({
            message: 'Se requiere que seleccione una diagramación',
            type: 'warning'
        });
    });

    test('should return warning when diagramation is not allowed in layout home', () => {
        expect(
            validateGamesChain('LN10-Home_Main', {
                layout: 'twoHorizontal'
            })
        ).toEqual({
            message: 'Esta diagramación no está permitida en este layout',
            type: 'warning'
        });
    });

    test('should return warning when diagramation is not allowed in layout accumulated', () => {
        expect(
            validateGamesChain('LN-acumulado', {
                layout: 'oneHorizontalThreeVertical'
            })
        ).toEqual({
            message: 'Esta diagramación no está permitida en este layout',
            type: 'warning'
        });
    });

    test('should return null when diagramation is valid for layout', () => {
        expect(
            validateGamesChain('LN10-Home_Main', {
                layout: 'fourVertical'
            })
        ).toBeNull();
    });
});
