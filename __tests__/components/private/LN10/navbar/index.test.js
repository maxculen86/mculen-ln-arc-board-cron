import React from 'react';
import {
    SITIO_SEGURO_REGISTRACION,
    SITE_LANACION,
    API_ENV
} from 'fusion:environment';
import Navbar from '../../../../../components/private/LN10/navbar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
describe('Components - Private - LN10 - Navbar', () => {
    it('should test navbar items', () => {
        render(<Navbar isHome />);
        const navbarLinks = [
            { item: 'Inicio', href: '#', title: 'Ir a Inicio' },
            { item: 'Secciones', href: '#', title: 'Ir a Secciones' },
            {
                item: 'Mis Notas',
                href: 'https://www.lanacion.com.ar/mis-notas/',
                title: 'Ir a Mis Notas'
            },
            {
                item: 'Perfil',
                href: 'https://myaccount.lanacion.com.ar/mi-usuario/',
                title: 'Ir a Perfil'
            }
        ];
        navbarLinks.forEach((text, index) => {
            expect(screen.getByText(text.item)).toBeDefined();
            expect(screen.getAllByRole('link')[index]).toHaveAttribute(
                'class',
                'link ln-link --font-2xs'
            );
            expect(screen.getAllByRole('link')[index]).toHaveAttribute(
                'target',
                '_self'
            );
            expect(screen.getAllByRole('link')[index]).toHaveAttribute(
                'title',
                text.title
            );
            expect(screen.getAllByRole('link')[index]).toHaveAttribute(
                'href',
                text.href
            );
        });
        expect(screen.getByRole('navigation')).toHaveClass('ln-navbar');
        expect(screen.getByText('Buscar')).toBeDefined();
    });
    it('should match snapshot', () => {
        const { container } = render(<Navbar isHome />);
        expect(container).toMatchSnapshot();
    });
});
