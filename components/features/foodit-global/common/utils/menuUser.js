import React from 'react';
import { Bookmark, Exit, List, Profile } from '@ln/foodit-ui-assets';

// TODO: Eliminar cuando se consigan los datos dinámicamente
export const menuUser = [
    {
        text: 'Mis recetas',
        icon: <Bookmark />,
        onClick: () => {
            console.log('click');
        }
    },
    {
        text: 'Lista de compras',
        icon: <List />,
        onClick: () => {
            console.log('click');
        }
    },
    {
        text: 'Mi cuenta',
        icon: <Profile />,
        onClick: () => {
            console.log('click');
        }
    },
    {
        text: 'Cerrar sesión',
        icon: <Exit />,
        onClick: () => {
            console.log('click');
        },
        variant: 'danger',
        title: 'Cerrar sesión'
    }
];
