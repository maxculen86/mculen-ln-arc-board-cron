import * as React from 'react';
import { SITE_LANACION, MY_ACCOUNT_URL } from 'fusion:environment';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import addEventToDataLayer from '../../../../private/LN/common/utils/addEventToDataLayer';

export const getEventData = label => ({
    event: 'e_linkclick',
    action: 'navbar',
    category: 'home_ln10',
    label
});

export const getNavbarItems = (toggleDesplegable, userType) => [
    {
        text: 'Inicio',
        icon: <IconSprite name="home" critical />,
        className: 'home',
        link: `${SITE_LANACION}/`,
        callback: () => {
            addEventToDataLayer(getEventData('inicio'));
        }
    },
    {
        text: 'Secciones',
        icon: <IconSprite name="sections" critical />,
        className: 'sections',
        link: '#',
        callback: e => {
            e.preventDefault();
            toggleDesplegable();
            addEventToDataLayer(getEventData('secciones'));
        }
    },
    {
        text: 'Foodit',
        icon: <IconSprite name="foodit" critical />,
        className: 'foodit',
        link: 'https://foodit.lanacion.com.ar/',
        callback: () => {
            addEventToDataLayer(getEventData('foodit'));
        }
    },
    {
        text: 'Club LN',
        icon: <IconSprite name="clubLnDefault" critical />,
        className: 'club-ln',
        link: 'https://club.lanacion.com.ar/',
        callback: () => {
            addEventToDataLayer(getEventData('club_la_nacion'));
        }
    },
    {
        text: userType !== 'unlogged' ? 'Mi cuenta' : 'Ingresar',
        icon: <IconSprite name="profile" critical />,
        className: 'profile',
        link: `${MY_ACCOUNT_URL}/`,
        callback: () => {
            addEventToDataLayer(getEventData('perfil'));
        }
    }
];
