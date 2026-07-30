import React from 'react';
import { MY_ACCOUNT_URL, SITE_FOODIT } from 'fusion:environment';
import { logout } from '../../../../private/common/auth/helper/loginHelper';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { pushFooditEvent } from './pushFooditEvent';

export const menuUser = [
    {
        text: 'Mi cuenta',
        icon: <IconSprite name="profile" critical />,
        onClick: () => {
            pushFooditEvent({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'perfil',
                action: 'mi_cuenta'
            });
            window.location.replace(MY_ACCOUNT_URL);
        }
    },
    {
        text: 'Mis recetas',
        icon: <IconSprite name="bookmark" critical />,
        onClick: () => {
            pushFooditEvent({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'perfil',
                action: 'mis_recetas'
            });
            window.location.replace(`${SITE_FOODIT}/recetario/`);
        }
    },
    {
        text: 'Mi menú semanal',
        icon: <IconSprite name="weekly-menu" critical />,
        onClick: () => {
            pushFooditEvent({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'perfil',
                action: 'mi-menu-semanal'
            });
            window.location.replace(`${SITE_FOODIT}/mi-menu-semanal/`);
        }
    },
    {
        text: 'Lista de compras',
        icon: <IconSprite name="shopping-list" critical />,
        onClick: () => {
            pushFooditEvent({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'perfil',
                action: 'lista_de_compras'
            });
            window.location.replace(`${SITE_FOODIT}/lista-de-compras/`);
        }
    },
    {
        text: 'Newsletters',
        icon: <IconSprite name="newsletter" critical />,
        onClick: () => {
            pushFooditEvent({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'perfil',
                action: 'newsletters'
            });
            window.location.replace(
                'https://newsletter.lanacion.com.ar/#planifica-tu-semana'
            );
        }
    },
    {
        text: 'club la nacion',
        icon: <IconSprite name="club-ln" />,
        onClick: () => {
            pushFooditEvent({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'perfil',
                action: 'club_la_nacion'
            });
            window.location.replace('https://club.lanacion.com.ar/');
        }
    },
    {
        text: '¿Cómo podemos ayudarte?',
        icon: <IconSprite name="custom-service" />,
        onClick: () => {
            pushFooditEvent({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'ayuda',
                action: 'como_ayudarte'
            });
            window.location.replace(
                'https://www.contacto.lanacion.com.ar/ayuda?_ga=2.8511862.2123159231.1712773709-419929993.1705331477'
            );
        }
    }
];

export const logOutItem = {
    text: 'Cerrar sesión',
    icon: <IconSprite name="exit" />,
    onClick: () => {
        pushFooditEvent({
            event: 'logout'
        });
        logout(() => {
            localStorage.removeItem('bookmarkFolders');
            localStorage.removeItem('bookmarkedItems');
        });
    },
    variant: 'danger',
    title: 'Cerrar sesión',
    classNameList: 'mt-auto'
};
