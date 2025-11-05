import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
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
    it('it should had component Search', () => {
        const searchComponent = screen.getByPlaceholderText(
            '¿Qué querés cocinar hoy?'
        );
        expect(searchComponent).toBeInTheDocument();
    });

    it('renders "Conocenos" first and then "CLUB LA NACION" in the secondary menu', () => {
        const categories = [
            { title: 'Recetas', data: [], menuType: 'primary' },
            {
                title: 'Conocenos',
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary'
            },
            {
                title: 'CLUB LA NACION',
                href: 'https://sandbox-foodit.lanacion.com.ar/club-la-nacion/',
                menuType: 'secondary'
            }
        ];

        const { container } = render(<DrawerMenu categories={categories} />);

        const secondary = container.querySelector('.mt-auto.sticky.bottom-0');
        expect(secondary).toBeInTheDocument();

        const wrappers = Array.from(secondary.children).filter(el =>
            (el.getAttribute('data-test-id') || '').startsWith('header-menu-')
        );

        const rendered = wrappers.map(el =>
            el
                .getAttribute('data-test-id')
                .replace('header-menu-', '')
                .toLowerCase()
        );

        expect(rendered).toEqual(['conocenos', 'club_la_nacion']);
    });
    it('should match snapshot', () => {
        const { container } = render(
            <DrawerMenu categories={menuCategories} />
        );

        expect(container).toMatchSnapshot();
    });
});
