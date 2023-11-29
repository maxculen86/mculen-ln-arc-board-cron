import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TopNavigationBar } from '../../../../../../../components/features/foodit-global/common/Header/components/TopNavigationBar';
import { menuCategories } from '../../../../../../../components/features/foodit-global/common/utils/menuCategories';
describe('Components - features - foodit-global - common - header - components - TopNavigationBar', () => {
    it('renders without crashing', () => {
        render(<TopNavigationBar />);
    });

    it('renders all menu categories', () => {
        const { getByText } = render(<TopNavigationBar />);
        menuCategories.forEach(category => {
            const element = getByText(category.title);
            expect(element).toBeTruthy();
        });
    });

    it('renders "MIS RECETAS" and "LISTA DE COMPRAS" links', () => {
        const { getByText } = render(<TopNavigationBar />);
        const misRecetasLink = getByText('MIS RECETAS');
        const listaDeComprasLink = getByText('LISTA DE COMPRAS');

        expect(misRecetasLink).toBeInTheDocument();
        expect(misRecetasLink).toHaveAttribute('href', '/mis-recetas');
        expect(listaDeComprasLink).toBeInTheDocument();
        expect(listaDeComprasLink).toHaveAttribute('href', '/lista-de-compras');
    });
});
