import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import { useHeaderContext } from '../../../../../components/features/LN-10-global/header/context';
import { render } from '@testing-library/react';
import { Desplegable } from '../../../../../components/features/LN-10-global/desplegable/default';
import menuData from '../../../../../__mocks__/data/menu/menu.json';

jest.mock(
    '../../../../../components/features/LN-10-global/header/context',
    () => ({
        useHeaderContext: jest.fn(() => {})
    })
);
jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('components - features - LN-10-global - Desplegable', () => {
    useContent.mockImplementation(() => menuData);
    useHeaderContext.mockImplementation(() => ({
        toggleDesplegable: jest.fn()
    }));
    Context.useAppContext = jest.fn(() => ({
        deployment: arg => arg,
        contextPath: '/pf'
    }));
    afterAll(() => {
        jest.clearAllMocks();
    });

    test('should renders without props', () => {
        const { getAllByRole } = render(<Desplegable />);
        const [wrapperDropdown] = getAllByRole('button');
        expect(wrapperDropdown).toBeInTheDocument();
    });
    test('should render with class "--dd-active" for handle dropdown', () => {
        useHeaderContext.mockImplementation(() => ({
            showMenu: true
        }));
        const { getAllByRole } = render(<Desplegable />);
        const [wrapperDropdown] = getAllByRole('button');
        expect(wrapperDropdown.classList).toContain('--dd-active');
    });
    test('should render without class "--dd-active" for handle dropdown', () => {
        useHeaderContext.mockImplementation(() => ({
            showMenu: false
        }));
        const { getAllByRole } = render(<Desplegable />);
        const [wrapperDropdown] = getAllByRole('button');
        expect(wrapperDropdown.classList).not.toContain('--dd-active');
    });
    test('should match snapshot', () => {
        useHeaderContext.mockImplementation(() => ({
            showMenu: true
        }));
        const { container } = render(<Desplegable />);
        expect(container).toMatchSnapshot();
    });
});
