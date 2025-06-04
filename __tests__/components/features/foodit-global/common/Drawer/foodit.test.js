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

    it('should render only excluded categories in the secondary menu section', () => {
        const secondaryMenuContainer = document.querySelector(
            '.mt-auto.sticky.bottom-0'
        );

        expect(secondaryMenuContainer).toBeInTheDocument();

        const titlesToExclude = [
            'Conocenos',
            'Guías de cocina',
            'Masterclass de chefs'
        ];

        const renderedTitles = Array.from(
            secondaryMenuContainer.querySelectorAll(
                '[data-test-id^="header-menu-"]'
            )
        ).map(node =>
            node.getAttribute('data-test-id').replace('header-menu-', '')
        );

        renderedTitles.forEach(title => {
            expect(titlesToExclude).toContain(title);
        });

        titlesToExclude.forEach(title => {
            if (menuCategories.some(c => c.title === title)) {
                expect(renderedTitles).toContain(title);
            }
        });
    });

    it('should match snapshot', () => {
        const { container } = render(
            <DrawerMenu categories={menuCategories} />
        );

        expect(container).toMatchSnapshot();
    });
});
