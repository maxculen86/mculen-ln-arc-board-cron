import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DrawerMenu from '../../../../../../components/features/foodit-global/common/DrawerMenu/foodit';
import menuCategories from '../../../../../../__mocks__/data/fooditMenuCategories/menuCategories';

describe('Components - Features - foodit-global - Common - DrawerMenu', () => {
    beforeEach(() => {
        render(<DrawerMenu categories={menuCategories} />);
    });
    it('should be hidden by default', () => {
        const drawer = document.querySelector('.drawer');
        const attribute = drawer.getAttribute('data-visible');
        expect(attribute).toStrictEqual('false');
    });
    it('should render to the left', () => {
        const drawer = document.querySelector('.drawer');
        const attribute = drawer.getAttribute('data-position');
        expect(attribute).toStrictEqual('left');
    });
    it('should render button to handleClose', () => {
        const button = screen.getByRole('button', { name: 'Cerrar' });
        expect(button).toBeTruthy();
    });
    it('should change the value of data-visible from "true" to "false" when button close is called', () => {
        const drawer = document.querySelector('.drawer');
        const button = screen.getByRole('button', { name: 'Cerrar' });
        fireEvent.click(button);
        const modifiedAttribute = drawer.getAttribute('data-visible');
        expect(modifiedAttribute).toStrictEqual('false');
    });

    it('should match snapshot', () => {
        const { container } = render(
            <DrawerMenu categories={menuCategories} />
        );

        expect(container).toMatchSnapshot();
    });
});
