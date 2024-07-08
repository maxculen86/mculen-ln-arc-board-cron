import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useAppContext } from 'fusion:context';
import ShoppingList from '../../../../../../components/features/foodit-global/common/shoppingList/foodit';
import { useShoppingList } from '../../../../../../components/features/foodit-global/common/shoppingList/hooks/useShoppingList';
import getToken from '../../../../../../components/private/common/utils/getToken';
import shoppingList from '../../../../../../__mocks__/data/fooditShoppingList/shoppingList.json';

jest.mock(
    '../../../../../../components/features/foodit-global/common/shoppingList/hooks/useShoppingList'
);
jest.mock('../../../../../../components/private/common/utils/getToken');
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

describe('Components - Features - Foodit-global - Common - ShoppingList - Foodit', () => {
    // meter en carpeta de mocks lo de aca arriba y las variantes de los emptyState
    test('Should render empty state without shoppingList', () => {
        useShoppingList.mockImplementation(() => ({
            loading: false,
            setShoppingList: () => null,
            isMobile: false,
            shoppingList: []
        }));
        getToken.mockReturnValue('10');
        const { getByText } = render(<ShoppingList />);
        expect(getByText('¡Exclusivo suscriptor!')).toBeInTheDocument();
    });

    test('Should render shoppingList', () => {
        useShoppingList.mockImplementation(() => ({
            loading: false,
            setShoppingList: () => null,
            isMobile: false,
            shoppingList: shoppingList
        }));
        const { getAllByText } = render(<ShoppingList />);
        expect(
            getAllByText('Receta para comer mas rico con ...MILANESAS').length
        ).toBe(1);
    });

    test('Should render selected list title twice', () => {
        useShoppingList.mockImplementation(() => ({
            loading: false,
            setShoppingList: () => null,
            isMobile: false,
            shoppingList: shoppingList
        }));
        const { getAllByText } = render(<ShoppingList />);
        expect(getAllByText('Receta empanada de cazon').length).toBe(2);
    });
});
