import * as React from 'react';
import { SITE_LANACION, API_ENV, MY_ACCOUNT_URL } from 'fusion:environment';
import {
    Home,
    Search,
    Sections,
    Bookmark,
    Profile,
    ClubLnDefault
} from '@ln/contenidos-ui-assets';
import addEventToDataLayer from '../../../../private/LN/common/utils/addEventToDataLayer';

const bookmarkUrl =
    API_ENV === 'prod'
        ? `${SITE_LANACION}/mis-notas/`
        : `${SITE_LANACION}/pf/mis-notas/?_website=la-nacion-ar`;

export const getEventData = label => ({
    event: 'e_linkclick',
    action: 'navbar',
    category: 'home_ln10',
    label
});

export const getNavbarItems = (
    isHome,
    withBookmark,
    isSubscribed,
    toggleDesplegable
) => [
    {
        text: 'Inicio',
        icon: <Home />,
        className: 'home',
        link: isHome ? '#' : `${SITE_LANACION}/`,
        callback: () => {
            addEventToDataLayer(getEventData('inicio'));
        }
    },
    {
        text: 'Buscar',
        icon: <Search />,
        className: 'search',
        id: 'querylyButton',
        htmlFor: 'queryly_toggle',
        callback: () => {
            handleClickBuscar();
            addEventToDataLayer(getEventData('buscar'));
        }
    },
    {
        text: 'Secciones',
        icon: <Sections />,
        className: 'sections',
        link: '#',
        callback: e => {
            e.preventDefault();
            toggleDesplegable();
            addEventToDataLayer(getEventData('secciones'));
        }
    },
    isSubscribed
        ? withBookmark && {
              text: 'Mis Notas',
              icon: <Bookmark />,
              className: 'bookmark',
              link: bookmarkUrl,
              callback: () => {
                  addEventToDataLayer(getEventData('mis_notas'));
              }
          }
        : {
              text: 'Club LN',
              icon: <ClubLnDefault />,
              className: 'club-ln',
              link: 'https://club.lanacion.com.ar/',
              callback: () => {
                  addEventToDataLayer(getEventData('club_la_nacion'));
              }
          },
    {
        text: 'Perfil',
        icon: <Profile />,
        className: 'profile',
        link: `${MY_ACCOUNT_URL}/mi-usuario/`,
        callback: () => {
            addEventToDataLayer(getEventData('perfil'));
        }
    }
];
