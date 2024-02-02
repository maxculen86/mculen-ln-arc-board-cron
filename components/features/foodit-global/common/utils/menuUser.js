import React from 'react';
import { logout } from '../context/authContext/_helpers';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

// TODO: Eliminar cuando se consigan los datos dinámicamente
export const menuUser = [
    {
        text: 'Mis recetas',
        icon: <IconSprite name="bookmark" critical />,
        onClick: () => {
            console.log('click');
        }
    },
    {
        text: 'Lista de compras',
        icon: <IconSprite name="list" />,
        onClick: () => {
            console.log('click');
        }
    },
    {
        text: 'Mi cuenta',
        icon: <IconSprite name="profile" critical />,
        onClick: () => {
            console.log('click');
        }
    },
    {
        text: 'Cerrar sesión',
        icon: <IconSprite name="exit" />,
        onClick: ({ callback }) => {
            logout(callback);
        },
        variant: 'danger',
        title: 'Cerrar sesión',
        classNameList: 'mt-auto'
    }
];
