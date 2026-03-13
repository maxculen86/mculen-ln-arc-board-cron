import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useAppContext } from 'fusion:context';
import ShoppingList from '../../../../../../components/features/foodit-global/common/shoppingList/foodit';
import { useShoppingList } from '../../../../../../components/features/foodit-global/common/shoppingList/hooks/useShoppingList';
import getToken from '../../../../../../components/private/common/utils/getToken';
import shoppingList from '../../../../../../__mocks__/data/fooditShoppingList/shoppingList.json';
import { SkeletonShoppingList } from '../../../../../../components/features/foodit-global/common/skeletons/ShoppingList/foodit';

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

jest.mock(
    '../../../../../../components/features/foodit-global/common/shoppingList/hooks/useShoppingList'
);
jest.mock('../../../../../../components/private/common/utils/getToken');
jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

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
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        }))
    });
});

describe('Components - Features - Foodit-global - Common - ShoppingList - Foodit', () => {
    // meter en carpeta de mocks lo de aca arriba y las variantes de los emptyState
    it('Should render empty state without shoppingList', () => {
        useShoppingList.mockImplementation(() => ({
            loading: false,
            setShoppingList: () => null,
            isMobile: false,
            shoppingList: []
        }));
        getToken.mockReturnValue('10');
        const { getByText } = render(<ShoppingList />);
        waitFor(() => {
            expect(
                getByText('Exclusivo para suscriptores')
            ).toBeInTheDocument();
        });
    });

    it('Should render shoppingList', () => {
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

    it('Should render selected list title', () => {
        useShoppingList.mockImplementation(() => ({
            loading: false,
            setShoppingList: () => null,
            isMobile: false,
            shoppingList: shoppingList
        }));
        const { getAllByText } = render(<ShoppingList />);
        expect(getAllByText('Receta empanada de cazon').length).toBe(1);
    });
    it('Should render SkeletonShoppingList component', () => {
        const { getByTestId } = render(<SkeletonShoppingList />);
        expect(getByTestId('skeleton-shopping-list')).toBeInTheDocument();
    });

    it('Should render one main skeleton list container and five item skeletons', () => {
        const { container } = render(<SkeletonShoppingList />);
        const skeletons = container.querySelectorAll('.mt-24.rounded-4');
        expect(skeletons.length).toBe(6);
    });
});
