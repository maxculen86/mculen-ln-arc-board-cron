import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useAppContext } from 'fusion:context';
import ShoppingList from '../../../../../../components/features/foodit-global/common/shoppingList/foodit';
import { useShoppingList } from '../../../../../../components/features/foodit-global/common/shoppingList/hooks/useShoppingList';

jest.mock(
    '../../../../../../components/features/foodit-global/common/shoppingList/hooks/useShoppingList'
);
jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

beforeEach(() => {
    useAppContext.mockImplementation(() => ({
        contextPath: '/some/path',
        deployment: () => '/deployment/path'
    }));

    window.LN = window.LN || {};
    window.LN.observable = {
        subscribe: jest.fn(),
        unsubscribe: jest.fn()
    };
});

describe('ShoppingList foodit component', () => {
    const mockShoppingList = [
        {
            sections: [
                {
                    typeList: 'foodit-ingredientes',
                    items: [
                        {
                            isMainIngredient: true,
                            amount: '2',
                            unit: 'Taza',
                            ingredient: 'Harina de trigo',
                            abbreviation: 'Tz.',
                            fullIngredientString: '2 Tz. de Harina de trigo',
                            includeInShoppingList: true
                        },
                        {
                            isMainIngredient: false,
                            amount: '4',
                            unit: 'Taza',
                            ingredient: 'Agua',
                            abbreviation: 'Tz.',
                            fullIngredientString: '4 Tz. de Agua',
                            includeInShoppingList: true
                        },
                        {
                            isMainIngredient: false,
                            amount: '1',
                            unit: 'Cucharadita',
                            ingredient: 'Sal',
                            abbreviation: 'Cdita.',
                            fullIngredientString: '1 Cdita. de Sal',
                            includeInShoppingList: true
                        },
                        {
                            isMainIngredient: true,
                            amount: '500',
                            unit: 'Gramo',
                            ingredient: 'Cazón',
                            abbreviation: 'g',
                            fullIngredientString: '500 g de Cazón',
                            includeInShoppingList: true
                        },
                        {
                            isMainIngredient: false,
                            amount: '1/2',
                            unit: 'Taza',
                            ingredient: 'Aceite de girasol',
                            abbreviation: 'Tz.',
                            fullIngredientString:
                                '1/2 Tz. de Aceite de girasol',
                            includeInShoppingList: true
                        }
                    ],
                    titleList: null
                }
            ],
            text: 'Receta empanada de cazon',
            id: 'Y2GDXASO2FENRHKAMTCUBZH7YY',
            bookmarkId: '195db38d-d551-421d-a72d-9e998b21fabc'
        },
        {
            sections: [
                {
                    typeList: 'foodit-ingredientes',
                    items: [
                        {
                            isMainIngredient: true,
                            amount: '500',
                            unit: 'Gramo',
                            ingredient: 'Harina 0000',
                            abbreviation: 'g',
                            fullIngredientString: '500 g de Harina 0000',
                            includeInShoppingList: true
                        },
                        {
                            isMainIngredient: false,
                            amount: '4',
                            unit: 'Cucharada',
                            ingredient: 'Manteca',
                            abbreviation: 'Cda.',
                            fullIngredientString: '4 Cda. de Manteca',
                            includeInShoppingList: true
                        },
                        {
                            isMainIngredient: false,
                            amount: '1/2',
                            unit: 'Taza',
                            ingredient: 'Agua',
                            abbreviation: 'Tz.',
                            fullIngredientString: '1/2 Tz. de Agua',
                            includeInShoppingList: true
                        },
                        {
                            isMainIngredient: false,
                            amount: '2',
                            unit: 'Cucharadita',
                            ingredient: 'Sal',
                            abbreviation: 'Cdita.',
                            fullIngredientString: '2 Cdita. de Sal',
                            includeInShoppingList: true
                        },
                        {
                            isMainIngredient: false,
                            amount: null,
                            unit: 'Cantidad necesaria',
                            ingredient: 'Abadejo',
                            abbreviation: 'cantidad necesaria',
                            fullIngredientString: 'Abadejo cantidad necesaria',
                            includeInShoppingList: true
                        }
                    ],
                    titleList: null
                },
                {
                    typeList: 'foodit-ingredientes',
                    items: [
                        {
                            isMainIngredient: false,
                            amount: null,
                            unit: 'Cantidad necesaria',
                            ingredient: 'Acaí',
                            abbreviation: 'cantidad necesaria',
                            fullIngredientString: 'Acaí cantidad necesaria',
                            includeInShoppingList: true
                        },
                        {
                            isMainIngredient: false,
                            amount: '300',
                            unit: 'Mililitro',
                            ingredient: 'Aceite',
                            fullIngredientString: '300 Mililitro de Aceite',
                            includeInShoppingList: true
                        }
                    ],
                    titleList: 'Foodit Ing 2'
                },
                {
                    typeList: 'ingredientes',
                    items: ['Custom ing A', 'Custom ing B', 'Custom ing C'],
                    titleList: 'Custom Ing 1'
                },
                {
                    typeList: 'ingredientes',
                    items: [
                        'Custom ing 2 A',
                        'Custom ing 2 B',
                        'Custom ing 2 C'
                    ],
                    titleList: 'Custom ing 2'
                }
            ],
            text: 'Receta de Tortas fritas criollas',
            id: 'G3RXP4QNH5HWRJ664Y5OACWV24',
            bookmarkId: 'e84c9c16-e5ac-40ad-b567-da814f38c4c8'
        },
        {
            sections: [
                {
                    typeList: 'ingredientes',
                    items: ['carne ', 'pollo', 'pan rayado'],
                    titleList: 'Milensa'
                }
            ],
            text: 'Receta para comer mas rico con ...MILANESAS ',
            id: '6YTYZNJHLBCKRK3U62UGQCJXFY',
            bookmarkId: '3aefc26a-12c1-458b-942c-623aae38d74a'
        }
    ];

    test('Should render empty state without shoppingList', () => {
        useShoppingList.mockImplementation(() => ({
            loading: false,
            setShoppingList: () => null,
            isMobile: false,
            shoppingList: []
        }));

        const { getByText } = render(<ShoppingList />);
        expect(getByText('Aún no hay nada por aca')).toBeInTheDocument();
    });

    test('Should render loading state without shoppingList', () => {
        useShoppingList.mockImplementation(() => ({
            loading: true,
            setShoppingList: () => null,
            isMobile: false,
            shoppingList: []
        }));

        const { getByText } = render(<ShoppingList />);
        expect(getByText('Cargando...')).toBeInTheDocument();
    });

    test('Should render shoppingList', () => {
        useShoppingList.mockImplementation(() => ({
            loading: false,
            setShoppingList: () => null,
            isMobile: false,
            shoppingList: mockShoppingList
        }));
        const { getAllByText } = render(<ShoppingList />);
        expect(
            getAllByText('Receta para comer mas rico con ...MILANESAS').length
        ).toBe(2);
    });
});
