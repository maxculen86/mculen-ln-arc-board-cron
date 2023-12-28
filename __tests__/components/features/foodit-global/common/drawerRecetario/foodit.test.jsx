import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DrawerRecetario from '../../../../../../components/features/foodit-global/common/drawerRecetario/foodit';

describe('DrawerRecetario component', () => {
    it('renders correctly', () => {
        const { container } = render(<DrawerRecetario />);
        const drawer = container.querySelector('[data-id="drawer-recetario"]');
        expect(drawer).toBeInTheDocument();
    });
    it('should match snapshot', () => {
        const { container } = render(<DrawerRecetario />);
        expect(container).toMatchSnapshot();
    });
});
