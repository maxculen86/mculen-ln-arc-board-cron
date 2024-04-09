import React from 'react';
import { logout } from '../context/authContext/_helpers';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import addEventToDataLayer from '../../../../private/LN/common/utils/addEventToDataLayer';

// TODO: Eliminar cuando se consigan los datos dinámicamente
export const menuUser = [
    {
        text: 'Mi cuenta',
        icon: <IconSprite name="profile" critical />,
        onClick: () => {
            console.log('click');
            addEventToDataLayer({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'ayuda',
                action: 'mi_cuenta'
            });
        }
    },
    {
        text: 'Mis recetas',
        icon: <IconSprite name="bookmark" critical />,
        onClick: () => {
            console.log('click');
            addEventToDataLayer({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'ayuda',
                action: 'mis_recetas'
            });
        }
    },
    {
        text: 'Lista de compras',
        icon: <IconSprite name="list" />,
        onClick: () => {
            console.log('click');
            addEventToDataLayer({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'ayuda',
                action: 'lista_de_compras'
            });
        }
    },
    {
        text: 'Newsletters',
        icon: <IconSprite name="calendar" />,
        onClick: () => {
            console.log('click');
            addEventToDataLayer({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'ayuda',
                action: 'newsletters'
            });
        }
    },
    {
        text: '¿Cómo podemos ayudarte?',
        icon: <IconSprite name="diet" />,
        onClick: () => {
            console.log('click');
            addEventToDataLayer({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'ayuda',
                action: 'como_ayudarte'
            });
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
