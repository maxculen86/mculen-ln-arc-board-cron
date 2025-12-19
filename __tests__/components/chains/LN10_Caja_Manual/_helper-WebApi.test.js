import validateCajaManual from '../../../../components/chains/LN10_Caja_Manual/common/_helper-WebApi';

describe('LN10_Caja_Manual - helper-WebApi', () => {
    const defaultArgs = {
        layout: 'bnGrilla4',
        childProps: [
            { collection: 'features', type: 'LN-10/article' },
            { collection: 'features', type: 'LN-10/article' },
            { collection: 'features', type: 'LN-10/article' },
            { collection: 'features', type: 'LN-10/article' }
        ],
        chainStyle: '',
        isGrid6MasTimeline: false,
        isBnPlayer: false
    };

    it('should return no errors for a valid configuration', () => {
        const result = validateCajaManual(defaultArgs);
        expect(result).toBeNull();
    });

    it('should return error if layout is missing', () => {
        const result = validateCajaManual({ ...defaultArgs, layout: '' });
        expect(result).toEqual({
            type: 'warning',
            message: 'Se requiere que seleccione una diagramación'
        });
    });

    it('should return error if not enough articles', () => {
        const result = validateCajaManual({
            ...defaultArgs,
            childProps: defaultArgs.childProps.slice(0, 2)
        });
        expect(result.message).toContain('Se requiere la carga de 2 artículos');
    });

    it('should return error for invalid feature type', () => {
        const result = validateCajaManual({
            ...defaultArgs,
            childProps: [
                ...defaultArgs.childProps,
                { collection: 'features', type: 'invalid-type' }
            ]
        });
        expect(result.message).toBe(
            'La Chain LN10 Caja Manual sólo admite features del tipo LN10 Artículo'
        );
    });

    describe('BN_6_GRID_MAS_TIMELINE validation', () => {
        it('should require timeline feature', () => {
            const result = validateCajaManual({
                ...defaultArgs,
                layout: 'bn_6_timeline',
                isGrid6MasTimeline: true
            });
            expect(result.message).toBe(
                'Esta diagramación requiere el feature LN10 Timeline'
            );
        });
    });
});
