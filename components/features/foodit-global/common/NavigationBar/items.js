import React from 'react';
import { Home, Sections, Bookmark, Cart, Profile } from '@ln/foodit-ui-assets';

export const itemsNavigationBar = [
    {
        icon: <Home />,
        text: 'Inicio',
        onClick: e => {
            e.preventDefault();
            console.log('click for metrics and redirect');
        },
        href: 'https://www.recetas.lanacion.com.ar/',
        title: 'Ir a Inicio'
    },
    {
        icon: <Sections />,
        text: 'Categorías',
        onClick: e => {
            e.preventDefault();
            console.log('');
        },
        href: 'https://www.recetas.lanacion.com.ar/'
    },
    {
        icon: <Bookmark />,
        text: 'Recetario',
        onClick: e => {
            e.preventDefault();
            console.log('click for metrics and redirect');
        },
        href: 'https://www.recetas.lanacion.com.ar/',
        title: 'Ir a mi recetario'
    },
    {
        icon: <Cart />,
        text: 'Lista',
        onClick: e => {
            e.preventDefault();
            console.log('click for metrics and redirect');
        },
        href: 'https://www.recetas.lanacion.com.ar/',
        title: 'Ir a mi lista de compras'
    },
    {
        icon: <Profile />,
        text: 'Perfil',
        onClick: e => {
            e.preventDefault();
            console.log('click for metrics and redirect');
        },
        href: 'https://www.recetas.lanacion.com.ar/',
        title: 'Ir a mi perfil'
    }
];
