import React from 'react';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

// TODO: Eliminar cuando se consigan los datos dinámicamente
export const menuCategories = [
    {
        title: 'Recetas',
        data: [
            {
                title: {
                    text: 'Saladas',
                    href: 'saladas',
                    icon: <IconSprite name="bookmark" critical />
                },
                items: [
                    { text: 'Arroz', href: '#' },
                    { text: 'Tartas', href: '#' },
                    { text: 'Pollo', href: '#' },
                    { text: 'Pizzas y empanadas', href: '#' },
                    { text: 'Pasta', href: '#' },
                    { text: 'Pescados', href: '#' },
                    { text: 'Carnes', href: '#' }
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
                    { text: 'Budines', href: '#' },
                    { text: 'Helados', href: '#' },
                    { text: 'Batidos', href: '#' }
                ]
            },
            {
                title: {
                    text: 'Dieta',
                    icon: <IconSprite name="diet" />
                },
                items: [
                    { text: 'Vegetariana', href: '#' },
                    { text: 'Sin gluten', href: '#' },
                    { text: 'Keto', href: '#' },
                    { text: 'Sin lactosa', href: '#' },
                    { text: 'Vegana', href: '#' }
                ]
            },
            {
                title: {
                    text: '¿Que cocinar hoy?',
                    icon: <IconSprite name="cart" critical />
                },
                items: [
                    { text: 'De autor', href: '#' },
                    { text: 'Fácil', href: '#' },
                    { text: 'Saludable', href: '#' },
                    { text: 'Bajo costo', href: '#' },
                    { text: 'Rápida', href: '#' }
                ]
            }
        ]
    },
    {
        title: 'Descubrir',
        data: [
            {
                items: [
                    { text: 'Chef protagonistas', href: '#' },
                    { text: 'Nutrición', href: '#' },
                    { text: 'Restaurantes', href: '#' },
                    { text: 'Beneficion Club La Nación', href: '#' }
                ]
            }
        ]
    },
    {
        title: 'Guía de cocina',
        href: '#'
    },
    {
        title: 'Masterclass',
        href: '#'
    }
];
