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
import { groupRecipeIngredients } from '../../../../../../components/features/foodit-global/common/shoppingList/groupRecipeIngredients';

const sampleRecipes = [
    {
        typeList: 'foodit-ingredientes',
        items: [
            {
                ingredient: 'Levadura fresca',
                amount: '100',
                unit: 'Gramo',
                abbreviation: 'g',
                isMainIngredient: false,
                fullIngredientString: '100 g de Levadura fresca',
                includeInShoppingList: true
            },
            {
                ingredient: 'Harina 0000',
                amount: '1',
                unit: 'Kilogramo',
                abbreviation: 'kg',
                isMainIngredient: false,
                fullIngredientString: '1 kg de Harina 0000',
                includeInShoppingList: true
            },
            {
                ingredient: 'Pasas de uva',
                amount: null,
                unit: 'A Gusto',
                abbreviation: 'a gusto',
                isMainIngredient: false,
                fullIngredientString: 'Pasas de uva a gusto',
                includeInShoppingList: true
            }
        ],
        titleList: 'Ingredientes'
    },
    {
        typeList: 'foodit-ingredientes',
        items: [
            {
                ingredient: 'Levadura fresca',
                amount: '50',
                unit: 'Gramo',
                abbreviation: 'g',
                isMainIngredient: false,
                fullIngredientString: '50 g de Levadura fresca',
                includeInShoppingList: true
            },
            {
                ingredient: 'Harina 0000',
                amount: '500',
                unit: 'Gramo',
                abbreviation: 'g',
                isMainIngredient: false,
                fullIngredientString: '500 g de Harina 0000',
                includeInShoppingList: true
            }
        ],
        titleList: 'Ingredientes'
    }
];

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

        it('should call clipboard.writeText with correct text when no URL provided', async () => {
            const shoppingList = 'Lista de Compras\n\n';
            await copyListToClipboard(shoppingList);

            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
                shoppingList
            );
        });

        it('should call clipboard.writeText with text and URL when canonicalUrl is provided', async () => {
            const shoppingList = 'Lista de Compras\n\n';
            const canonicalUrl = 'https://foodit.lanacion.com.ar/recetas/test';
            await copyListToClipboard(shoppingList, canonicalUrl);

            const expectedText = `${shoppingList}\nVer receta completa:\n${canonicalUrl}`;
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
                expectedText
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

        it('should call navigator.share with correct text when no URL provided', async () => {
            const shoppingList = 'Lista de Compras\n\n';
            await shareList(shoppingList);

            expect(navigator.share).toHaveBeenCalledWith({
                text: shoppingList,
                title: 'Receta de Foodit'
            });
        });

        it('should call navigator.share with text and URL when canonicalUrl is provided', async () => {
            const shoppingList = 'Lista de Compras\n\n';
            const canonicalUrl = 'https://foodit.lanacion.com.ar/recetas/test';
            await shareList(shoppingList, canonicalUrl);

            const expectedText = `${shoppingList}\nVer receta completa:\n${canonicalUrl}`;
            expect(navigator.share).toHaveBeenCalledWith({
                text: expectedText,
                title: 'Receta de Foodit',
                url: canonicalUrl
            });
        });

        it('should not call addErrorToast when user cancels share (AbortError)', async () => {
            const abortError = new Error('User cancelled');
            abortError.name = 'AbortError';
            navigator.share.mockRejectedValue(abortError);

            const shoppingList = 'Lista de Compras\n\n';
            await shareList(shoppingList);

            expect(addErrorToast).not.toHaveBeenCalled();
        });

        it('should call addErrorToast if navigator.share fails with non-AbortError', async () => {
            navigator.share.mockRejectedValue(new Error('Sharing failed'));
            const shoppingList = 'Lista de Compras\n\n';
            await shareList(shoppingList);

            expect(addErrorToast).toHaveBeenCalled();
        });

        it('should call addErrorToast if navigator.share is not supported', async () => {
            delete global.navigator.share;

            const shoppingList = 'Lista de Compras\n\n';
            await shareList(shoppingList);

            expect(addErrorToast).toHaveBeenCalled();
        });
    });

    describe('groupRecipeIngredients', () => {
        it('groups and formats recipe ingredients correctly', () => {
            const result = groupRecipeIngredients(sampleRecipes);

            expect(result).toEqual([
                {
                    name: 'Levadura fresca',
                    displayAmount: '150 g',
                    fullIngredientNameToCopy: '150 g de levadura fresca',
                    group: 'default'
                },
                {
                    name: 'Harina 0000',
                    displayAmount: '1 kg + 500 g',
                    fullIngredientNameToCopy: '1 kg + 500 g de harina 0000',
                    group: 'default'
                },
                {
                    name: 'Pasas de uva',
                    displayAmount: 'a gusto',
                    fullIngredientNameToCopy: 'a gusto de pasas de uva',
                    group: 'default'
                }
            ]);
        });

        it('handles special units correctly', () => {
            const specialUnitRecipes = [
                {
                    typeList: 'foodit-ingredientes',
                    items: [
                        {
                            ingredient: 'Sal',
                            amount: null,
                            unit: 'A Gusto',
                            abbreviation: 'a gusto',
                            isMainIngredient: false,
                            fullIngredientString: 'Sal a gusto',
                            includeInShoppingList: true
                        },
                        {
                            ingredient: 'Pimienta',
                            amount: null,
                            unit: 'Cantidad Necesaria',
                            abbreviation: 'c/n',
                            isMainIngredient: false,
                            fullIngredientString: 'Pimienta c/n',
                            includeInShoppingList: true
                        }
                    ],
                    titleList: 'default'
                }
            ];

            const result = groupRecipeIngredients(specialUnitRecipes);

            expect(result).toEqual([
                {
                    name: 'Sal',
                    displayAmount: 'a gusto',
                    fullIngredientNameToCopy: 'a gusto de sal',
                    group: 'default'
                },
                {
                    name: 'Pimienta',
                    displayAmount: 'cantidad necesaria',
                    fullIngredientNameToCopy: 'cantidad necesaria de pimienta',
                    group: 'default'
                }
            ]);
        });

        it('handles missing amounts correctly', () => {
            const missingAmountRecipes = [
                {
                    typeList: 'foodit-ingredientes',
                    items: [
                        {
                            ingredient: 'Sal',
                            amount: null,
                            unit: 'A Gusto',
                            abbreviation: 'a gusto',
                            isMainIngredient: false,
                            fullIngredientString: 'Sal a gusto',
                            includeInShoppingList: true
                        },
                        {
                            ingredient: 'Pimienta',
                            amount: null,
                            unit: 'Cantidad Necesaria',
                            abbreviation: 'c/n',
                            isMainIngredient: false,
                            fullIngredientString: 'Pimienta c/n',
                            includeInShoppingList: true
                        }
                    ],
                    titleList: 'default'
                }
            ];

            const result = groupRecipeIngredients(missingAmountRecipes);

            expect(result).toEqual([
                {
                    name: 'Sal',
                    displayAmount: 'a gusto',
                    fullIngredientNameToCopy: 'a gusto de sal',
                    group: 'default'
                },
                {
                    name: 'Pimienta',
                    displayAmount: 'cantidad necesaria',
                    fullIngredientNameToCopy: 'cantidad necesaria de pimienta',
                    group: 'default'
                }
            ]);
        });

        it('handles plural of units correctly', () => {
            const pluralUnitRecipes = [
                {
                    typeList: 'foodit-ingredientes',
                    items: [
                        {
                            ingredient: 'Laurel',
                            amount: '1',
                            unit: 'Hoja',
                            abbreviation: 'hoja',
                            isMainIngredient: false,
                            fullIngredientString: '1 hoja de laurel',
                            includeInShoppingList: true
                        },
                        {
                            ingredient: 'Laurel',
                            amount: '1',
                            unit: 'Hoja',
                            abbreviation: 'hoja',
                            isMainIngredient: false,
                            fullIngredientString: '1 hoja de laurel',
                            includeInShoppingList: true
                        },
                        {
                            ingredient: 'Azúcar',
                            amount: '1',
                            unit: 'Cucharada',
                            abbreviation: 'cda.',
                            isMainIngredient: false,
                            fullIngredientString: '1 cda. de azúcar',
                            includeInShoppingList: true
                        },
                        {
                            ingredient: 'Azúcar',
                            amount: '1',
                            unit: 'Cucharada',
                            abbreviation: 'cda.',
                            isMainIngredient: false,
                            fullIngredientString: '1 cda. de azúcar',
                            includeInShoppingList: true
                        }
                    ],
                    titleList: 'default'
                }
            ];

            const result = groupRecipeIngredients(pluralUnitRecipes);

            expect(result).toEqual([
                {
                    name: 'Laurel',
                    displayAmount: '2 hojas',
                    fullIngredientNameToCopy: '2 hojas de laurel',
                    group: 'default'
                },
                {
                    name: 'Azúcar',
                    displayAmount: '2 cdas.',
                    fullIngredientNameToCopy: '2 cdas. de azúcar',
                    group: 'default'
                }
            ]);
        });

        it('should display a gusto/cantidad necesaria when no amounts are quantifiable and there are one ingredient in common', () => {
            const recipes = [
                {
                    typeList: 'foodit-ingredientes',
                    items: [
                        {
                            ingredient: 'Sal',
                            amount: null,
                            unit: 'A Gusto',
                            abbreviation: 'a gusto',
                            isMainIngredient: false,
                            fullIngredientString: 'Sal a gusto',
                            includeInShoppingList: true
                        },
                        {
                            ingredient: 'Sal',
                            amount: null,
                            unit: 'Cantidad Necesaria',
                            abbreviation: 'c/n',
                            isMainIngredient: false,
                            fullIngredientString: 'Pimienta c/n',
                            includeInShoppingList: true
                        }
                    ],
                    titleList: 'default'
                }
            ];

            const result = groupRecipeIngredients(recipes);

            expect(result).toEqual([
                {
                    name: 'Sal',
                    displayAmount: 'a gusto/cantidad necesaria',
                    fullIngredientNameToCopy:
                        'a gusto/cantidad necesaria de sal',
                    group: 'default'
                }
            ]);
        });

        it('handles empty recipe list', () => {
            const result = groupRecipeIngredients([]);

            expect(result).toEqual([]);
        });
    });
});
