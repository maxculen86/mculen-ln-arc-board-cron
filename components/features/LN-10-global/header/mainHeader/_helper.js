import { useContext } from 'react';
import { MY_ACCOUNT_URL, SITE_LANACION } from 'fusion:environment';
import addEventToDataLayer from '../../../../private/LN/common/utils/addEventToDataLayer';
import { GlobalContext } from '../../../../private/common/context/globalContext';
import useTermica from '../../../../private/common/hooks/useTermica';
import get from '../../../../private/common/utils/get';
import useSiteServices from '../../hooks/useSiteServices';

export const getMenuUser = (goToLogout = () => {}) => {
    const LogoutText = 'Cerrar sesión';
    const defaultOptions = [
        {
            url: `${SITE_LANACION}/mis-notas/`,
            text: 'Mis notas',
            title: 'Ir a mis notas',
            target: '_self',
            className: 'text-blue-500 p-12 bg-blue-100__hover rounded-4'
        },
        {
            url: `${MY_ACCOUNT_URL}/`,
            text: 'Mi cuenta',
            title: 'Ir a mi cuenta',
            target: '_self',
            className: 'text-blue-500 p-12 bg-blue-100__hover rounded-4'
        },
        {
            url: `${MY_ACCOUNT_URL}/datos-personales/`,
            text: 'Mis datos',
            title: 'Ir a mis datos',
            target: '_self',
            className: 'text-blue-500 p-12 bg-blue-100__hover rounded-4'
        },
        {
            url: `${MY_ACCOUNT_URL}/mis-suscripciones/`,
            text: 'Mis suscripciones',
            title: 'Ir a mis suscripciones',
            target: '_self',
            className:
                'text-blue-500 p-12 border border-bottom border-thin border-light-300 bg-blue-100__hover rounded-4'
        },
        {
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
            option.text === LogoutText && goToLogout();
        }
    }));
};

export const getTermicaValues = propertyNames => {
    const { termicas } = useSiteServices() || [];

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
