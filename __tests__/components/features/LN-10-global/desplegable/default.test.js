import React from 'react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import { render, act } from '@testing-library/react';
import { Desplegable } from '../../../../../components/features/LN-10-global/desplegable/default';
import menuData from '../../../../../__mocks__/data/menu/menu.json';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('components - features - LN-10-global - Desplegable', () => {
    let mockObservable;

    beforeEach(() => {
        mockObservable = {
            subscribe: jest.fn(),
            unsubscribe: jest.fn(),
            publish: jest.fn()
        };

        window.LN = {
            observable: mockObservable
        };

        useContent.mockImplementation(() => menuData);
        Context.useAppContext = jest.fn(() => ({
            deployment: arg => arg,
            contextPath: '/pf'
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
        delete window.LN;
    });

    test('should renders without props', () => {
        const { getAllByRole } = render(<Desplegable />);
        const [wrapperDropdown] = getAllByRole('button');
        expect(wrapperDropdown).toBeInTheDocument();
    });

    test('should render with class "--dd-active" for handle dropdown', () => {
        const { getAllByRole } = render(<Desplegable />);

        const toggleCallback = mockObservable.subscribe.mock.calls[0][1];

        act(() => {
            toggleCallback({ show: true });
        });

        const [wrapperDropdown] = getAllByRole('button');
        expect(wrapperDropdown).toHaveClass('--dd-active');
    });

    test('should render without class "--dd-active" for handle dropdown', () => {
        const { getAllByRole } = render(<Desplegable />);

        const toggleCallback = mockObservable.subscribe.mock.calls[0][1];

        act(() => {
            toggleCallback({ show: false });
        });

        const [wrapperDropdown] = getAllByRole('button');
        expect(wrapperDropdown).not.toHaveClass('--dd-active');
    });

    test('should match snapshot', () => {
        const { container } = render(<Desplegable />);

        const toggleCallback = mockObservable.subscribe.mock.calls[0][1];

        act(() => {
            toggleCallback({ show: true });
        });

        expect(container).toMatchSnapshot();
    });
});
