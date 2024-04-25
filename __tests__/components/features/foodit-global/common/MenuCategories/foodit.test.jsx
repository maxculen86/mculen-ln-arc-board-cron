import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuCategories from '../../../../../../components/features/foodit-global/common/MenuCategories/foodit';
import IconSprite from '../../../../../../components/features/private-global/common/iconSprite/IconSprite';

describe('components - feature - foodit-glogal - common - MenuCategories', () => {
    const mockMenuCategories = [
        {
            title: {
                text: 'Saladas',
                href: '/saladas',
                icon: <IconSprite name="bookmark" critical />
            },
            items: [
                { text: 'Arroz', href: '#' },
                { text: 'Tartas', href: '#' },
                { text: 'Pollo', href: '#' },
                { text: 'Pizzas y empanadas', href: '#' },
                { text: 'Pasta', href: '#' },
                { text: 'Pescados', href: '#' },
                { text: 'Carne', href: '#' }
            ]
        },
        {
            title: {
                text: 'Dulces',
                href: 'dulces',
                icon: <IconSprite name="cake" />
            },
            items: [
                { text: 'Tortas', href: '#' },
                { text: 'Postres', href: '#' },
                { text: 'Panqueques', href: '#' },
                { text: 'Budunes', href: '#' },
                { text: 'Helados', href: '#' },
                { text: 'Batidos', href: '#' }
            ]
        }
    ];
    it('render title correctly', () => {
        const { getByText } = render(
            <MenuCategories data={mockMenuCategories} fullWidth={true} />
        );
        const titleElement = getByText('Saladas');

        expect(titleElement).toBeInTheDocument();
        expect(titleElement.parentNode).toHaveAttribute('href', '/saladas');
    });

    it('render items correctly', () => {
        const { getByText } = render(
            <MenuCategories data={mockMenuCategories} fullWidth={true} />
        );
        mockMenuCategories[0].items.forEach(({ text }) => {
            const itemElement = getByText(text);
            expect(itemElement).toBeInTheDocument();
            expect(itemElement.parentNode).toHaveAttribute('href', '#');
        });
        mockMenuCategories[1].items.forEach(({ text }) => {
            const itemElement = getByText(text);
            expect(itemElement).toBeInTheDocument();
            expect(itemElement.parentNode).toHaveAttribute('href', '#');
        });
    });
});
