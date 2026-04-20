import { SITE_LANACION, MY_ACCOUNT_URL } from 'fusion:environment';
import { useContext } from 'react';
import { logout } from '../../../../../../../private/common/auth/helper/loginHelper';
import handleCookie from '../../../../../../../private/LN/common/utils/handleCookie';
import { addEventToDataLayerV2 } from '../../../../../../../private/LN/common/utils/addEventToDataLayer';
import isSSR from '../../../../../../../private/LN/common/utils/isSSR';
import { GlobalContext } from '../../../../../../../private/common/context/globalContext';
import get from '../../../../../../../private/common/utils/get';

const { eraseCookie } = handleCookie();

function handleEventsLinks(e, text) {
    e.preventDefault();
    addEventToDataLayerV2({
        event: 'e_linkclick',
        action: 'menu_usuario',
        category: 'home_ln10',
        label: text
    });
}

function createLinkOption(href, text, title) {
    return {
        href,
        text,
        title,
        target: '_self',
        onClick: e => handleEventsLinks(e, text)
    };
}

export const linkOptions = [
    createLinkOption(
        `${SITE_LANACION}/mis-notas/`,
        'Mis notas',
        'Ir a mis notas'
    ),
    createLinkOption(`${MY_ACCOUNT_URL}/`, 'Mi cuenta', 'Ir a mi cuenta'),
    createLinkOption(
        `${MY_ACCOUNT_URL}/datos-personales/`,
        'Mis datos',
        'Ir a mis datos'
    ),
    createLinkOption(
        `${MY_ACCOUNT_URL}/`,
        'Mis suscripciones',
        'Ir a mis suscripciones'
    )
];

const LOGOUT_TEXT = 'Cerrar sesión';

export const buttonLogout = {
    text: LOGOUT_TEXT,
    title: LOGOUT_TEXT,
    target: '_self',
    onClick: e => {
        handleEventsLinks(e, LOGOUT_TEXT);
        logout(() => {
            eraseCookie('contentVariant');
            // eslint-disable-next-line no-undef
            if (['undefined'].indexOf(typeof fyre)) fyre.conv.logout();
        });
    }
};

export const currentUrlCallback = isSSR()
    ? ''
    : window.btoa(window.location.href);

export const shouldHideSubscribeButton = ({
    userType = 'loading',
    isActivePaywall = false,
    isActiveTermicaSubscribe = false
} = {}) => {
    const isLoadingOrSubscribed =
        userType === 'loading' || userType === 'subscribed';
    const isPaywallInactive = !isActivePaywall || !isActiveTermicaSubscribe;

    return isLoadingOrSubscribed || isPaywallInactive;
};

export const termicaValuesSubscribe = [
    'button_text',
    'class_tooltip',
    'sticky_button_text',
    'tooltip_text'
];

export const termicaValuesUpselling = [
    'black_button_text',
    'class_upselling_tooltip',
    'duo_button_text',
    'triple_button_text',
    'upselling_tooltip_text'
];

export const upsellingLabels = {
    'ga-combo2': 'upselling_duo',
    'ga-comboDuo': 'upselling_triple',
    'ga-comboTriple': 'upselling_black'
};

export const getTermicaValues = propertyNames => {
    const gc = useContext(GlobalContext);
    const termicas = get(gc, 'state.siteService.termicas', []);

    return propertyNames.reduce((acc, propertyName) => {
        const element = termicas.find(
            termica => termica && termica.key === propertyName
        );
        acc[propertyName] = (element && element.value) || '';
        return acc;
    }, {});
};
