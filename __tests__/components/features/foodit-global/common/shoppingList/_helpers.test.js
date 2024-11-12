import {
    TOAST,
    addErrorToast,
    addToast
} from '../../../../../../components/features/foodit-global/common/bookmark/api/_helper';
import {
    copyListToClipboard,
    transformObjectToText,
    shareList,
    formatShoppingList
} from '../../../../../../components/features/foodit-global/common/shoppingList/_helpers';

jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/api/_helper',
    () => ({
        ...jest.requireActual(
            '../../../../../../components/features/foodit-global/common/bookmark/api/_helper'
        ),
        addToast: jest.fn(),
        addErrorToast: jest.fn()
    })
);

describe('Components - Features - Foodit-global - Common - ShoppingList - _helper', () => {
    describe('formatShoppingList', () => {
        it('should format a list with one item correctly', () => {
            const shoppingList = [
                {
                    text: 'Lista de Compras',
                    sections: [
                        {
                            titleList: 'Frutas',
                            items: [
                                { fullIngredientString: 'Manzana - 1 kg' },
                                { fullIngredientString: 'Banana - 2 kg' }
                            ]
                        }
                    ]
                }
            ];

            const expectedFormattedText = `Lista de Compras\n\n\tFrutas:\n\t-Manzana - 1 kg\n\t-Banana - 2 kg\n\n`;
            expect(formatShoppingList(shoppingList)).toEqual(
                expectedFormattedText
            );
        });

        it('should format a list with multiple sections correctly', () => {
            const shoppingList = [
                {
                    text: 'Lista de Compras',
                    sections: [
                        {
                            titleList: 'Frutas',
                            items: [
                                { fullIngredientString: 'Manzana - 1 kg' },
                                { fullIngredientString: 'Banana - 2 kg' }
                            ]
                        },
                        {
                            titleList: 'Especias',
                            items: [
                                { fullIngredientString: 'Sal' },
                                { fullIngredientString: 'Pimienta' }
                            ]
                        }
                    ]
                }
            ];

            const expectedFormattedText = `Lista de Compras\n\n\tFrutas:\n\t-Manzana - 1 kg\n\t-Banana - 2 kg\n\n\tEspecias:\n\t-Sal\n\t-Pimienta\n\n`;
            expect(formatShoppingList(shoppingList)).toEqual(
                expectedFormattedText
            );
        });

        it('should return an empty string for an empty shopping list', () => {
            const shoppingList = [];
            const expectedFormattedText = '';
            expect(formatShoppingList(shoppingList)).toEqual(
                expectedFormattedText
            );
        });

        it('should handle lists with missing sections or text gracefully', () => {
            const shoppingList = [
                {
                    text: '',
                    sections: [
                        {
                            titleList: '',
                            items: [{ fullIngredientString: 'Manzana - 1 kg' }]
                        }
                    ]
                }
            ];

            const expectedFormattedText = `\n\n\t-Manzana - 1 kg\n\n`;
            expect(formatShoppingList(shoppingList)).toEqual(
                expectedFormattedText
            );
        });
    });

    describe('transformObjectToText', () => {
        it('should correctly transform a simple object to text', () => {
            const sampleObject = {
                text: 'Lista de Compras',
                sections: [
                    {
                        titleList: 'Frutas',
                        typeList: 'foodit-ingredientes',
                        items: [
                            { fullIngredientString: 'Manzana - 1 kg' },
                            { fullIngredientString: 'Banana - 2 kg' }
                        ]
                    },
                    {
                        titleList: 'Especias',
                        items: [
                            { fullIngredientString: 'Sal' },
                            { fullIngredientString: 'Pimienta' }
                        ]
                    }
                ]
            };

            const expectedText = `Lista de Compras\n\n\tFrutas:\n\t-Manzana - 1 kg\n\t-Banana - 2 kg\n\n\tEspecias:\n\t-Sal\n\t-Pimienta`;
            expect(transformObjectToText(sampleObject)).toEqual(expectedText);
        });

        it('should handle objects without sections or text gracefully', () => {
            const sampleObject = {};
            const expectedText = '';
            expect(transformObjectToText(sampleObject)).toEqual(expectedText);
        });
    });

    describe('copyListToClipboard', () => {
        beforeEach(() => {
            global.navigator.clipboard = { writeText: jest.fn() };
        });

        it('should call clipboard.writeText with correct text', async () => {
            const shoppingList = 'Lista de Compras\n\n';
            await copyListToClipboard(shoppingList);

            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
                shoppingList
            );
        });

        it('should call addToast on successful copy', async () => {
            const shoppingList = 'Lista de Compras\n\n';
            await copyListToClipboard(shoppingList);

            expect(addToast).toHaveBeenCalledWith({
                variant: TOAST.SUCCESS.VARIANT,
                title: TOAST.SUCCESS.TITLE,
                message: TOAST.SUCCESS.MESSAGE.COPY_INGREDIENTS
            });
        });

        it('should call addErrorToast on clipboard write failure', async () => {
            navigator.clipboard.writeText.mockRejectedValue(
                new Error('Failed to copy')
            );
            const shoppingList = 'Lista de Compras\n\n';
            await copyListToClipboard(shoppingList);

            expect(addErrorToast).toHaveBeenCalled();
        });
    });

    describe('shareList', () => {
        beforeEach(() => {
            global.navigator.share = jest.fn();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should call navigator.share with correct text', async () => {
            const shoppingList = 'Lista de Compras\n\n';
            await shareList(shoppingList);

            expect(navigator.share).toHaveBeenCalledWith({
                text: shoppingList
            });
        });

        it('should call addErrorToast if navigator.share fails', async () => {
            navigator.share.mockRejectedValue(new Error('Sharing failed'));
            const shoppingList = 'Lista de Compras\n\n';
            await shareList(shoppingList);

            expect(addErrorToast).toHaveBeenCalled();
        });

        it('should call addErrorToast if navigator.share is not supported', async () => {
            delete global.navigator.share; // Eliminar el soporte de share
            const shoppingList = 'Lista de Compras\n\n';
            await shareList(shoppingList);

            expect(addErrorToast).toHaveBeenCalled();
        });
    });
});
