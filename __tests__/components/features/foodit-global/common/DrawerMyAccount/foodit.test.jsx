import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DrawerMyAccount from '../../../../../../components/features/foodit-global/common/DrawerMyAccount/foodit';

describe('DrawerMyAccount component', () => {
    beforeEach(() => {
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

    it('renders correctly', () => {
        const { container } = render(<DrawerMyAccount />);
        const drawer = container.querySelector('[data-id="drawer-account"]');
        expect(drawer).toBeInTheDocument();
    });
    it('should match snapshot', () => {
        const { container } = render(<DrawerMyAccount />);
        expect(container).toMatchSnapshot();
    });
});
