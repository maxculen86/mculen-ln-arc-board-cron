import { drawerManager } from '@ln/ds-common-drawer';
import { SITE_LANACION, MY_ACCOUNT_URL, SITE_FOODIT } from 'fusion:environment';
import { DRAWERS_ID } from '../utils/constants';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

export const getEventData = label => ({
    event: 'e_linkclick',
    action: 'navbar',
    category: 'home_ln10',
    label
});

export const getNavbarItems = ({ userType }) => [
    {
        text: 'Inicio',
        iconName: 'home',
        href: `${SITE_LANACION}/`,
        onClick: () => {
            addEventToDataLayerV2(getEventData('inicio'));
        }
    },
    {
        text: 'Secciones',
        iconName: 'fuction',
        onClick: () => {
            drawerManager.show(DRAWERS_ID.SECTIONS);
            addEventToDataLayerV2(getEventData('secciones'));
        }
    },
    {
        text: 'Foodit',
        iconName: 'logo-foodit',
        href: `${SITE_FOODIT}/`,
        onClick: () => {
            addEventToDataLayerV2(getEventData('foodit'));
        }
    },
    {
        text: 'Club LN',
        iconName: 'logo-club',
        href: 'https://club.lanacion.com.ar/',
        onClick: () => {
            addEventToDataLayerV2(getEventData('club_la_nacion'));
        }
    },
    {
        text: userType !== 'unlogged' ? 'Mi cuenta' : 'Ingresar',
        iconName: 'user',
        href: `${MY_ACCOUNT_URL}/`,
        onClick: () => {
            addEventToDataLayerV2(getEventData('perfil'));
        }
    }
];
