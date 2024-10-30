import { dataLayerLayoutDictionary } from '../../../../../../../components/features/foodit-global/common/dataLayer/_helpers';
import {
    getConfig,
    saveRecipeConfig,
    addSavedBookmarksToDataLayer
} from '../../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/helpers';
import { addEventToDataLayerV2 } from '../../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('components - features - foodit-global - common - Modals - SaveRecipe - addSavedBookmarksToDataLayer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should not call addEventToDataLayerV2 when articlesDetails is empty', () => {
        addSavedBookmarksToDataLayer({
            articlesDetails: [],
            carouselTitle: 'carouselTitle',
            layout: 'layout',
            fatherType: 'fatherType'
        });
        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('should call addEventToDataLayerV2 with default origin if layout is not in dictionary', () => {
        const articlesDetails = [
            {
                content: {
                    variant: 'note',
                    headlines: {
                        basic: 'Unknown Layout Article'
                    },
                    id: '999'
                }
            }
        ];
        addSavedBookmarksToDataLayer({
            articlesDetails,
            carouselTitle: 'carouselTitle',
            layout: 'Unknown-layout',
            fatherType: ''
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            category: 'interaction',
            origin: '',
            action: 'guardar',
            title: 'Unknown Layout Article',
            label: 'nota',
            articleId: '999'
        });
    });

    it('should handle missing variant gracefully in addSavedBookmarksToDataLayer', () => {
        const articlesDetails = [
            {
                content: {
                    headlines: {
                        basic: 'Missing Variant Article'
                    },
                    id: '555'
                }
            }
        ];
        addSavedBookmarksToDataLayer({
            articlesDetails,
            carouselTitle: 'carouselTitle',
            layout: 'Foodit-home',
            fatherType: ''
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            category: 'interaction',
            origin: dataLayerLayoutDictionary['Foodit-home'],
            action: 'guardar',
            title: 'Missing Variant Article',
            label: '',
            articleId: '555'
        });
    });

    it('should not call addEventToDataLayerV2 when articlesDetails is empty', () => {
        addSavedBookmarksToDataLayer({
            articlesDetails: [],
            carouselTitle: 'carouselTitle',
            layout: 'layout',
            fatherType: 'fatherType'
        });
        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('should call addEventToDataLayerV2 with correct parameters for a single article', () => {
        const articlesDetails = [
            {
                content: {
                    variant: 'note',
                    headlines: {
                        basic: 'Test Article',
                        mobile: 'Test Article Mobile'
                    },
                    id: '123'
                }
            }
        ];
        addSavedBookmarksToDataLayer({
            articlesDetails,
            carouselTitle: 'carouselTitle',
            layout: 'Foodit-home',
            fatherType: ''
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            category: 'interaction',
            origin: dataLayerLayoutDictionary['Foodit-home'],
            action: 'guardar',
            title: 'Test Article',
            label: 'nota',
            articleId: '123'
        });
    });

    it('should call addEventToDataLayerV2 with correct parameters for multiple articles', () => {
        const articlesDetails = [
            {
                content: {
                    variant: 'recipe',
                    headlines: {
                        basic: 'Test Recipe',
                        mobile: 'Test Recipe Mobile'
                    },
                    id: '456'
                }
            },
            {
                content: {
                    variant: 'recipe',
                    headlines: {
                        basic: 'Another Recipe',
                        mobile: 'Another Recipe Mobile'
                    },
                    id: '789'
                }
            }
        ];
        addSavedBookmarksToDataLayer({
            articlesDetails,
            carouselTitle: 'Carousel Header Title',
            layout: 'Foodit-home',
            fatherType: ''
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            category: 'interaction',
            origin: dataLayerLayoutDictionary['Foodit-home'],
            action: 'guardar_todo',
            title: 'Carousel Header Title'
        });
    });

    it('origin should be "recomendaciones" with fatherType and ficha-receta layout', () => {
        const articlesDetails = [
            {
                content: {
                    variant: 'recipe',
                    headlines: {
                        basic: 'Recipe Title',
                        mobile: 'Recipe Title Mobile'
                    },
                    id: '123'
                }
            }
        ];
        addSavedBookmarksToDataLayer({
            articlesDetails,
            carouselTitle: '',
            layout: 'Foodit-ficha-receta',
            fatherType: 'carousel'
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            category: 'interaction',
            origin: 'recomendaciones',
            action: 'guardar',
            title: 'Recipe Title',
            label: 'receta',
            articleId: '123'
        });
    });

    it('should handle missing headline title gracefully', () => {
        const articlesDetails = [
            {
                content: {
                    variant: 'note',
                    id: '987'
                }
            }
        ];
        addSavedBookmarksToDataLayer({
            articlesDetails,
            carouselTitle: 'Some Title',
            layout: 'Foodit-home',
            fatherType: ''
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            category: 'interaction',
            origin: dataLayerLayoutDictionary['Foodit-home'],
            action: 'guardar',
            title: '',
            label: 'nota',
            articleId: '987'
        });
    });
});

describe('getConfig', () => {
    const mockSaveRecipeConfigs = { ...saveRecipeConfig };

    it('should return the correct configuration for the first step (boundary case)', () => {
        const indexStep = 0;
        const result = getConfig(mockSaveRecipeConfigs, indexStep);

        expect(result).toEqual({
            title: '',
            leftButton: {},
            rightButton: {},
            showSelect: false,
            showInputFolder: false
        });
    });

    it('should return default values when indexStep is negative', () => {
        const indexStep = -1;
        const result = getConfig(mockSaveRecipeConfigs, indexStep);

        expect(result).toEqual({
            title: '',
            leftButton: {},
            rightButton: {},
            showSelect: false,
            showInputFolder: false
        });
    });

    it('should handle empty configuration object for getConfig gracefully', () => {
        const emptyConfig = {};
        const indexStep = 2;
        const result = getConfig(emptyConfig, indexStep);

        expect(result).toEqual({
            title: '',
            leftButton: {},
            rightButton: {},
            showSelect: false,
            showInputFolder: false
        });
    });

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
