import React from 'react';
import { Bookmark, Cake, Cart, Diet } from '@ln/foodit-ui-assets';

// TODO: Eliminar cuando se consigan los datos dinámicamente
export const menuCategories = [
    {
        title: 'Recetas',
        data: [
            {
                title: { text: 'Saladas', href: 'saladas', icon: <Bookmark /> },
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
                title: { text: 'Dulces', href: 'dulces', icon: <Cake /> },
                items: [
                    { text: 'Tortas', href: '#' },
                    { text: 'Postres', href: '#' },
                    { text: 'Panqueques', href: '#' },
                    { text: 'Budunes', href: '#' },
                    { text: 'Helados', href: '#' },
                    { text: 'Batidos', href: '#' }
                ]
            },
            {
                title: { text: 'Dieta', icon: <Diet /> },
                items: [
                    { text: 'Vegetariana', href: '#' },
                    { text: 'Sin gluten', href: '#' },
                    { text: 'Keto', href: '#' },
                    { text: 'Sin lactosa', href: '#' },
                    { text: 'Vegana', href: '#' }
                ]
            },
            {
                title: { text: '¿Que cocinar hoy?', icon: <Cart /> },
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
                    { text: 'Chef', href: '#' },
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
