import { validateGamesChain } from '../../../../../components/chains/LN_DS_CajaPromo/common/_helper';

describe('LN_DS_CajaPromo - _helper', () => {
    describe('validateGamesChain', () => {
        describe('when diagramation is not selected', () => {
            it('should return warning when customFields is undefined', () => {
                expect(validateGamesChain('LN10-Home_Main', undefined)).toEqual(
                    {
                        type: 'warning',
                        message: 'Se requiere que seleccione una diagramación'
                    }
                );
            });

            it('should return warning when layout is not defined in customFields', () => {
                expect(validateGamesChain('LN10-Home_Main', {})).toEqual({
                    type: 'warning',
                    message: 'Se requiere que seleccione una diagramación'
                });
            });
        });

        describe('when diagramation is not allowed for the layout', () => {
            it('should return warning when twoHorizontal is used in LN10-Home_Main', () => {
                expect(
                    validateGamesChain('LN10-Home_Main', {
                        layout: 'twoHorizontal'
                    })
                ).toEqual({
                    type: 'warning',
                    message:
                        'Esta diagramación no está permitida en este layout'
                });
            });

            it('should return warning when oneLargeFourSmall is used in LN10-Home_Main', () => {
                expect(
                    validateGamesChain('LN10-Home_Main', {
                        layout: 'oneLargeFourSmall'
                    })
                ).toEqual({
                    type: 'warning',
                    message:
                        'Esta diagramación no está permitida en este layout'
                });
            });

            it('should return warning when twoHorizontal is used in LN-nota-infografia', () => {
                expect(
                    validateGamesChain('LN-nota-infografia', {
                        layout: 'twoHorizontal'
                    })
                ).toEqual({
                    type: 'warning',
                    message:
                        'Esta diagramación no está permitida en este layout'
                });
            });
        });

        describe('when items are insufficient', () => {
            it('should return warning with singular form when fourVertical is missing 1 item', () => {
                expect(
                    validateGamesChain(
                        'LN10-Home_Main',
                        { layout: 'fourVertical' },
                        [{}, {}, {}]
                    )
                ).toEqual({
                    type: 'warning',
                    message: 'Se requiere la carga de 1 juego'
                });
            });

            it('should return warning with plural form when fourVertical is missing multiple items', () => {
                expect(
                    validateGamesChain(
                        'LN10-Home_Main',
                        { layout: 'fourVertical' },
                        [{}, {}]
                    )
                ).toEqual({
                    type: 'warning',
                    message: 'Se requiere la carga de 2 juegos'
                });
            });

            it('should return warning for twoHorizontal with less than 2 items', () => {
                expect(
                    validateGamesChain(
                        'LN-acumulado',
                        { layout: 'twoHorizontal' },
                        [{}]
                    )
                ).toEqual({
                    type: 'warning',
                    message: 'Se requiere la carga de 1 juego'
                });
            });

            it('should return warning for oneLargeFourSmall with less than 5 items', () => {
                expect(
                    validateGamesChain(
                        'LN-acumulado',
                        { layout: 'oneLargeFourSmall' },
                        [{}, {}, {}]
                    )
                ).toEqual({
                    type: 'warning',
                    message: 'Se requiere la carga de 2 juegos'
                });
            });

            it('should return warning for oneHorizontalThreeVertical with less than 4 items', () => {
                expect(
                    validateGamesChain(
                        'LN10-Home_Main',
                        { layout: 'oneHorizontalThreeVertical' },
                        [{}, {}]
                    )
                ).toEqual({
                    type: 'warning',
                    message: 'Se requiere la carga de 2 juegos'
                });
            });

            it('should return warning for threeVertical with less than 3 items', () => {
                expect(
                    validateGamesChain(
                        'LN-acumulado',
                        { layout: 'threeVertical' },
                        [{}]
                    )
                ).toEqual({
                    type: 'warning',
                    message: 'Se requiere la carga de 2 juegos'
                });
            });

            it('should return warning for oneHorizontal with no items', () => {
                expect(
                    validateGamesChain(
                        'LN-acumulado',
                        { layout: 'oneHorizontal' },
                        []
                    )
                ).toEqual({
                    type: 'warning',
                    message: 'Se requiere la carga de 1 juego'
                });
            });

            it('should use custom contentLabel in warning message', () => {
                expect(
                    validateGamesChain(
                        'LN-acumulado',
                        { layout: 'twoHorizontal' },
                        [],
                        'podcast'
                    )
                ).toEqual({
                    type: 'warning',
                    message: 'Se requiere la carga de 2 podcasts'
                });
            });
        });

        describe('when validation passes', () => {
            it('should return null for fourVertical with exactly 4 items in LN10-Home_Main', () => {
                expect(
                    validateGamesChain(
                        'LN10-Home_Main',
                        { layout: 'fourVertical' },
                        [{}, {}, {}, {}]
                    )
                ).toBeNull();
            });

            it('should return null for fourVertical with more than 4 items', () => {
                expect(
                    validateGamesChain(
                        'LN10-Home_Main',
                        { layout: 'fourVertical' },
                        [{}, {}, {}, {}, {}]
                    )
                ).toBeNull();
            });

            it('should return null for twoHorizontal with exactly 2 items in LN-acumulado', () => {
                expect(
                    validateGamesChain(
                        'LN-acumulado',
                        { layout: 'twoHorizontal' },
                        [{}, {}]
                    )
                ).toBeNull();
            });

            it('should return null for oneLargeFourSmall with exactly 5 items', () => {
                expect(
                    validateGamesChain(
                        'LN-acumulado',
                        { layout: 'oneLargeFourSmall' },
                        [{}, {}, {}, {}, {}]
                    )
                ).toBeNull();
            });

            it('should return null for oneHorizontalThreeVertical with exactly 4 items', () => {
                expect(
                    validateGamesChain(
                        'LN10-Home_Main',
                        { layout: 'oneHorizontalThreeVertical' },
                        [{}, {}, {}, {}]
                    )
                ).toBeNull();
            });

            it('should return null for fourVertical in LN-nota-infografia with 4 items', () => {
                expect(
                    validateGamesChain(
                        'LN-nota-infografia',
                        { layout: 'fourVertical' },
                        [{}, {}, {}, {}]
                    )
                ).toBeNull();
            });

            it('should return null for threeVertical with exactly 3 items in LN-acumulado', () => {
                expect(
                    validateGamesChain(
                        'LN-acumulado',
                        { layout: 'threeVertical' },
                        [{}, {}, {}]
                    )
                ).toBeNull();
            });

            it('should return null for oneHorizontal with 1 item in LN-acumulado', () => {
                expect(
                    validateGamesChain(
                        'LN-acumulado',
                        { layout: 'oneHorizontal' },
                        [{}]
                    )
                ).toBeNull();
            });
        });
    });
});
