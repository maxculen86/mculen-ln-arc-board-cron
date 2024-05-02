import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TopNavigationBar } from '../../../../../../../components/features/foodit-global/common/Header/components/TopNavigationBar';
import menuCategories from '../../../../../../../__mocks__/data/fooditMenuCategories/menuCategories';

xdescribe('Components - features - foodit-global - common - header - components - TopNavigationBar', () => {
    it('renders without crashing', () => {
        render(<TopNavigationBar />);
    });

    it('renders all menu categories', () => {
        const { getByText } = render(
            <TopNavigationBar categories={menuCategories} />
        );
        menuCategories.forEach(category => {
            const element = getByText(category.title);
            expect(element).toBeTruthy();
        });
    });

    it('renders "MIS RECETAS" and "LISTA DE COMPRAS" links', () => {
        const { getByText } = render(
            <TopNavigationBar categories={menuCategories} />
        );
        const misRecetasLink = getByText('MIS RECETAS');
        const listaDeComprasLink = getByText('LISTA DE COMPRAS');

        expect(misRecetasLink).toBeInTheDocument();
        expect(misRecetasLink).toHaveAttribute('href', '/recetario');
        expect(listaDeComprasLink).toBeInTheDocument();
        expect(listaDeComprasLink).toHaveAttribute('href', '/lista-de-compras');
    });
});
