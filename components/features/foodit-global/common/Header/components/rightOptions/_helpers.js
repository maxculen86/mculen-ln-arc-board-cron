import { API_ENV, FOODIT_LOGIN_URL } from 'fusion:environment';

import { pushFooditEvent } from '../../../utils/pushFooditEvent';

const ANALYTICS_EVENTS = {
    LINK_CLICK: 'e_linkclick',
    NOTIFICATION_ACTION: 'action_notification'
};

const BELL_CONFIG = {
    ZONE: 'foodit',
    REQUEST_SIZE: 5,
    LOGIN_TEXT:
        'Si formas parte de nuestra comunidad de suscriptores, descubrí todas las novedades que tenemos para vos.'
};

export const getPropsBellFoodit = () => {
    const loginHrefLocation =
        (typeof window !== 'undefined' && window?.btoa(window.location.href)) ||
        '';
    return {
        zone: BELL_CONFIG.ZONE,
        isTestEnvironment: API_ENV !== 'prod',
        loginHref: FOODIT_LOGIN_URL + loginHrefLocation,
        loginText: BELL_CONFIG.LOGIN_TEXT,
        notificationsRequestSize: BELL_CONFIG.REQUEST_SIZE,
        messagesRequestSize: BELL_CONFIG.REQUEST_SIZE
    };
};

export const getPropsBellEvents = () => {
    const handleBellClick = () => {
        pushFooditEvent({
            event: ANALYTICS_EVENTS.LINK_CLICK,
            category: 'campanita',
            label: 'campanita',
            action: 'click'
        });
    };

    const handleItemClick = (item, eventType) => {
        pushFooditEvent({
            event: eventType,
            identifier: item?.id || '',
            button: 'N/A',
            page_notification: item?.url || '',
            title: item?.title || ''
        });
    };

    const handleNotificationsClick = notif => {
        handleItemClick(notif, ANALYTICS_EVENTS.NOTIFICATION_ACTION);
    };

    const handleMessageButtonClick = message => {
        handleItemClick(message, ANALYTICS_EVENTS.NOTIFICATION_ACTION);
    };

    const handleLoginClick = () => {
        pushFooditEvent({
            event: 'e_linkclick',
            action: 'N/A',
            category: 'notificaciones',
            label: 'inicia_sesion'
        });
    };

    return {
        onBellClick: handleBellClick,
        onNotificationsClick: handleNotificationsClick,
        onMessageButtonClick: handleMessageButtonClick,
        loginOnClick: handleLoginClick
    };
};
