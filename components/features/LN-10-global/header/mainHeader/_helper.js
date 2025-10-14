import { useContext } from 'react';
import { MY_ACCOUNT_URL, SITE_LANACION } from 'fusion:environment';
import addEventToDataLayer from '../../../../private/LN/common/utils/addEventToDataLayer';
import { GlobalContext } from '../../../../private/common/context/globalContext';
import useTermica from '../../../../private/common/hooks/useTermica';
import get from '../../../../private/common/utils/get';
import { logout } from '../../../../private/common/auth/helper/loginHelper';
import handleCookie from '../../../../private/LN/common/utils/handleCookie';

const { eraseCookie } = handleCookie();

export const getMenuUser = () => {
    const LogoutText = 'Cerrar sesión';
    const commonClassName = 'text-blue-500 p-12 bg-blue-100__hover rounded-4';
    const defaultOptions = [
        {
            url: `${SITE_LANACION}/mis-notas/`,
            text: 'Mis notas',
            title: 'Ir a mis notas',
            target: '_self',
            className: commonClassName
        },
        {
            url: `${MY_ACCOUNT_URL}/`,
            text: 'Mi cuenta',
            title: 'Ir a mi cuenta',
            target: '_self',
            className: commonClassName
        },
        {
            url: `${MY_ACCOUNT_URL}/datos-personales/`,
            text: 'Mis datos',
            title: 'Ir a mis datos',
            target: '_self',
            className: commonClassName
        },
        {
            url: `${MY_ACCOUNT_URL}/`,
            text: 'Mis suscripciones',
            title: 'Ir a mis suscripciones',
            target: '_self',
            className:
                'text-blue-500 p-12 border border-bottom border-thin border-light-300 bg-blue-100__hover rounded-4'
        },
        {
            // eslint-disable-next-line no-script-url
            url: 'javascript:void(0);',
            text: LogoutText,
            title: LogoutText,
            target: '_self',
            className: 'text-red-700 p-12 bg-blue-100__hover rounded-4'
        }
    ];
    return defaultOptions.map(option => ({
        ...option,
        callback: e => {
            e.preventDefault();
            addEventToDataLayer({
                event: 'e_linkclick',
                action: 'menu_usuario',
                category: 'home_ln10',
                label: option.text
            });
            // eslint-disable-next-line no-unused-expressions
            option.text === LogoutText &&
                logout(() => {
                    eraseCookie('contentVariant');
                    // eslint-disable-next-line no-undef
                    if (['undefined'].indexOf(typeof fyre)) fyre.conv.logout();
                });
        }
    }));
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

export const sectionsCallback = (e, toggleDesplegable) => {
    toggleDesplegable();
    addEventToDataLayer({
        event: 'e_linkclick',
        action: 'header_logo',
        category: 'home_ln10',
        label: 'secciones'
    });
};

export const logoCallback = () => {
    addEventToDataLayer({
        event: 'e_linkclick',
        action: 'header_logo',
        category: 'home_ln10',
        label: 'logo'
    });
};

export const showSubscribeButton = (subscription = false) => {
    const paywall = useTermica('paywall') || false;
    return paywall && typeof window !== 'undefined' && !subscription;
};

export const getInitialState = () => {
    const showTooltip = localStorage.getItem('showTooltip');
    return showTooltip ? JSON.parse(showTooltip) : true;
};
