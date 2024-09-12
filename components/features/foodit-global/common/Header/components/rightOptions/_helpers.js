import { API_ENV, FOODIT_LOGIN_URL } from 'fusion:environment';

import { addEventToDataLayerV2 } from '../../../../../../private/LN/common/utils/addEventToDataLayer';

export const getPropsBellDefault = () => {
    const loginHrefLocation =
        (typeof window !== 'undefined' && window?.btoa(location.href)) || '';
    return {
        zone: 'foodit',
        isTestEnvironment: API_ENV !== 'prod',
        showTooltip: true,
        loginHref: FOODIT_LOGIN_URL + loginHrefLocation,
        loginText:
            'Si formas parte de nuestra comunidad de suscriptores, descubrí todas las novedades que tenemos para vos.',
        notificationsRequestSize: 5,
        messagesRequestSize: 5
    };
};

export const getPropsBellEvents = ({ hideTooltip }) => {
    const handleBellClick = () => {
        hideTooltip();
        addEventToDataLayerV2({
            event: 'e_linkclick',
            category: 'campanita',
            label: 'campanita',
            action: 'click'
        });
    };

    const handleNotificationsClick = notif => {
        addEventToDataLayerV2({
            event: 'e_linkclick',
            category: 'campanita',
            label: 'notificacion',
            action: 'click',
            title: notif?.title || ''
        });
    };

    return {
        onBellClick: handleBellClick,
        onNotificationsClick: handleNotificationsClick
    };
};
