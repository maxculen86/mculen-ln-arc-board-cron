import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationBar from '../../../../../../components/features/recetas-global/common/NavigationBar/recetas.jsx';

describe('Components - Features - Recetas-global - Common - NavigationBar', () => {
    beforeEach(() => {
        render(<NavigationBar />);
    });
    it('should render four links', () => {
        const { length } = screen.getAllByRole('link');
        expect(length).toEqual(4);
    });
    it('should render a button for show menu', () => {
        const toggleDrawer = jest.fn();
        const button = screen.getByRole('button', { name: 'Categorías' });
        button.onclick = toggleDrawer;
        fireEvent.click(button);
        expect(button).toBeTruthy();
        expect(toggleDrawer).toBeCalledTimes(1);
    });
    it('should match snapshot', () => {
        const { container } = render(<NavigationBar />);
        expect(container).toMatchSnapshot();
    });
});
