import {
    getGameDiagramationItems,
    validateGamesChain
} from '../../../../components/chains/LN10_Caja_Juegos_v2/common/_helper';

describe('components - chains - LN10_Caja_Juegos_v2 - helper', () => {
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
                validateGamesChain(
                    'LN10-Home_Main',
                    {
                        layout: 'fourVertical'
                    },
                    [{}, {}, {}, {}]
                )
            ).toBeNull();
        });

        test('should return warning when fourVertical has less than 4 items', () => {
            expect(
                validateGamesChain(
                    'LN10-Home_Main',
                    { layout: 'fourVertical' },
                    [{}, {}]
                )
            ).toEqual({
                message: 'Se requiere la carga de 2 juegos',
                type: 'warning'
            });
        });

        test('should return null when fourVertical has 4 or more items', () => {
            expect(
                validateGamesChain(
                    'LN10-Home_Main',
                    { layout: 'fourVertical' },
                    [{}, {}, {}, {}]
                )
            ).toBeNull();
        });

        test('should return warning when twoHorizontal has less than 2 items', () => {
            expect(
                validateGamesChain(
                    'LN-acumulado',
                    { layout: 'twoHorizontal' },
                    [{}]
                )
            ).toEqual({
                message: 'Se requiere la carga de 1 juego',
                type: 'warning'
            });
        });

        test('should return null when twoHorizontal has 2 or more items', () => {
            expect(
                validateGamesChain(
                    'LN-acumulado',
                    { layout: 'twoHorizontal' },
                    [{}, {}]
                )
            ).toBeNull();
        });

        test('should return warning when oneHorizontalThreeVertical has less than 4 items', () => {
            expect(
                validateGamesChain(
                    'LN10-Home_Main',
                    { layout: 'oneHorizontalThreeVertical' },
                    [{}, {}]
                )
            ).toEqual({
                message: 'Se requiere la carga de 2 juegos',
                type: 'warning'
            });
        });

        test('should return null when oneHorizontalThreeVertical has 4 or more items', () => {
            expect(
                validateGamesChain(
                    'LN10-Home_Main',
                    { layout: 'oneHorizontalThreeVertical' },
                    [{}, {}, {}, {}]
                )
            ).toBeNull();
        });

        test('should return warning when oneLargeFourSmall has less than 5 items', () => {
            expect(
                validateGamesChain(
                    'LN-acumulado',
                    { layout: 'oneLargeFourSmall' },
                    [{}, {}, {}]
                )
            ).toEqual({
                message: 'Se requiere la carga de 2 juegos',
                type: 'warning'
            });
        });

        test('should return null when oneLargeFourSmall has 5 or more items', () => {
            expect(
                validateGamesChain(
                    'LN-acumulado',
                    { layout: 'oneLargeFourSmall' },
                    [{}, {}, {}, {}, {}]
                )
            ).toBeNull();
        });
    });

    describe('Tests function getGameDiagramationItems', () => {
        const gameItems = [
            { id: 1, name: 'cruciexpres' },
            { id: 2, name: 'sudoku' },
            { id: 3, name: 'palabras-cruzadas' },
            { id: 4, name: 'el-telar' },
            { id: 5, name: 'crucimini' },
            { id: 6, name: 'trivias' }
        ];

        test('returns all gameItems when no diagramationType is provided', () => {
            expect(getGameDiagramationItems(gameItems)).toEqual(gameItems);
        });

        test('returns all gameItems when diagramationType is twoHorizontal', () => {
            expect(
                getGameDiagramationItems(gameItems, 'twoHorizontal')
            ).toEqual(gameItems);
        });

        test('limits to 4 gameItems when diagramationType is oneHorizontalThreeVertical', () => {
            expect(
                getGameDiagramationItems(
                    gameItems,
                    'oneHorizontalThreeVertical'
                )
            ).toEqual(gameItems.slice(0, 4));
        });

        test('limits to 5 gameItems when diagramationType is oneLargeFourSmall', () => {
            expect(
                getGameDiagramationItems(gameItems, 'oneLargeFourSmall')
            ).toEqual(gameItems.slice(0, 5));
        });

        test('returns an empty array when gameItems is empty', () => {
            expect(getGameDiagramationItems([], 'oneLargeFourSmall')).toEqual(
                []
            );
        });

        test('returns an empty array when gameItems is undefined', () => {
            expect(
                getGameDiagramationItems(undefined, 'oneLargeFourSmall')
            ).toEqual([]);
        });
    });
});
