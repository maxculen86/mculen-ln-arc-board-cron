import {
    SITIO_SEGURO_REGISTRACION,
    SITE_LANACION,
    API_ENV
} from 'fusion:environment';
import dynamicallyLoadScript from '../../LN/common/utils/dynamicallyLoadScript';
import { toggleDesplegable } from '../header/_helper';

const bookmarkUrl =
    API_ENV === 'prod'
        ? `${SITE_LANACION}/mis-notas/`
        : `${SITE_LANACION}/pf/mis-notas/?_website=la-nacion-ar`;

export const handleClickBuscar = () => {
    dynamicallyLoadScript('//www.queryly.com/js/queryly.v4.js', 'body').then(
        () => {
            const initScript = document.createElement('script');
            initScript.innerHTML = `queryly.init('8075c0c1c4c44847', document.querySelectorAll('#fusion-app'));`;
            document.body.appendChild(initScript);
            document.getElementById('querylyButton').click();
        }
    );
};

export const getNavbarItems = (isHome, withBookmark, isSubscribed) => [
    {
        text: 'Inicio',
        icon: 'home',
        target: '_self',
        link: isHome ? '#' : 'https://www.lanacion.com.ar/',
        callback: () => {
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'home_ln10',
                dynamic_category: 'navbar',
                dynamic_label: 'inicio'
            });
        }
    },
    {
        text: 'Buscar',
        icon: 'search',
        id: 'querylyButton',
        htmlFor: 'queryly_toggle',
        callback: () => {
            handleClickBuscar();
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'home_ln10',
                dynamic_category: 'navbar',
                dynamic_label: 'buscar'
            });
        }
    },
    {
        text: 'Secciones',
        icon: 'sections',
        target: '_self',
        link: '#',
        callback: e => {
            e.preventDefault();
            toggleDesplegable();
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'home_ln10',
                dynamic_category: 'navbar',
                dynamic_label: 'secciones'
            });
        }
    },
    withBookmark && {
        text: 'Mis Notas',
        icon: 'bookmark',
        target: '_self',
        link: isSubscribed
            ? bookmarkUrl
            : `${SITIO_SEGURO_REGISTRACION}/suscripcion/E/1/1/?callback=`,
        callback: () => {
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'home_ln10',
                dynamic_category: 'navbar',
                dynamic_label: 'mis_notas'
            });
        }
    },
    {
        text: 'Perfil',
        icon: 'profile',
        target: '_self',
        link: 'https://myaccount.lanacion.com.ar/mi-usuario/',
        callback: () => {
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'home_ln10',
                dynamic_category: 'navbar',
                dynamic_label: 'perfil'
            });
        }
    }
];
