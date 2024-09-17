import {
    getConfig,
    saveRecipeConfig
} from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/helpers';

describe('getConfig', () => {
    const mockSaveRecipeConfigs = { ...saveRecipeConfig };

    it('should return the correct configuration for a given step', () => {
        const indexStep = 1;
        const result = getConfig(mockSaveRecipeConfigs, indexStep);

        expect(result).toEqual({
            title: 'Guardar',
            leftButton: { text: 'Aceptar', title: 'Aceptar', action: 'save' },
            rightButton: {
                text: 'Cancelar',
                title: 'Cancelar',
                action: 'close'
            },
            showSelect: true,
            showInputFolder: false
        });
    });

    it('should return default values when the step configuration is missing', () => {
        const indexStep = 999;
        const result = getConfig(mockSaveRecipeConfigs, indexStep);

        expect(result).toEqual({
            title: '',
            leftButton: {},
            rightButton: {},
            showSelect: false,
            showInputFolder: false
        });
    });

    it('should return default values when save-folder key is missing', () => {
        const mockConfigsWithoutFolder = {};
        const indexStep = 1;
        const result = getConfig(mockConfigsWithoutFolder, indexStep);

        expect(result).toEqual({
            title: '',
            leftButton: {},
            rightButton: {},
            showSelect: false,
            showInputFolder: false
        });
    });
});
