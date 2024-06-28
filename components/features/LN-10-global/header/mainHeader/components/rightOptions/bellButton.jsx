import React, { useEffect, useState } from 'react';
import { API_ENV, LOGIN_URL } from 'fusion:environment';
import handleCookie from '../../../../../../private/LN/common/utils/handleCookie';
import { getInitialState } from '../../_helper';
import { toggleBellColor } from './_helper';
import { NotificationsCentre } from '@ln/lib-personalizacion';
import { useHeaderContext } from '../../../context';
import addEventToDataLayer from '../../../../../../private/LN/common/utils/addEventToDataLayer';

export const BellButton = () => {
    const { negative, intersectingSentinel } = useHeaderContext();
    const [showTooltip, setShowTooltip] = useState(false);
    const [props, setProps] = useState({});
    const { getCookie } = handleCookie();
    const token = getCookie('token');
    const accessToken = getCookie('access-token');
    useEffect(() => {
        initializeTooltip();
        setProps(buildProps());
    }, [showTooltip, intersectingSentinel]);
    const initializeTooltip = () => {
        const toggleTooltip = getInitialState() ? intersectingSentinel : false;
        setShowTooltip(toggleTooltip);
    };
    toggleBellColor(negative);
    const buildProps = () => {
        return {
            ...(token &&
                accessToken && {
                    userIdToken: token,
                    userAccessToken: `Bearer ${accessToken}`
                }),
            isTestEnvironment: API_ENV !== 'prod',
            zone: 'lanacion',
            showTooltip: false,
            loginHref: LOGIN_URL,
            notificationsRequestSize: 5,
            messagesRequestSize: 5,
            loginText:
                'Si formas parte de nuestra comunidad de suscriptores, descubrí todas las novedades que tenemos para vos.',
            tooltipText: 'Aquí encontrarás todas nuestras notificaciones',
            loginOnClick: () => {
                addEventToDataLayer({
                    category: 'campanita',
                    label: 'Iniciar Sesión',
                    action: 'click',
                    event: 'trackEvent'
                });
            },
            onBellClick: handleBellClick,
            onNotificationsClick: handleNotificationsClick,
            onMessageButtonClick: handleMessageButtonClick
        };
    };
    const handleBellClick = () => {
        setShowTooltip(false);
        localStorage.setItem('showTooltip', false);
        addEventToDataLayer({
            event: 'trackEvent',
            category: 'campanita',
            action: 'campanita',
            label: 'N/A'
        });
    };
    const handleNotificationsClick = notification => {
        addEventToDataLayer({
            event: 'action_notification',
            button: notification.buttonLabel || 'N/A',
            title:
                (notification.title && `notificación-${notification.title}`) ||
                'N/A',
            page_notification: notification.url || 'N/A',
            identifier: notification.id
        });
    };
    const handleMessageButtonClick = message => {
        addEventToDataLayer({
            event: 'action_notification',
            button: message.buttonLabel || 'N/A',
            title: (message.title && `mensaje-${message.title}`) || 'N/A',
            page_notification: message.url || 'N/A',
            identifier: message.id
        });
    };
    return <NotificationsCentre {...props} />;
};
export default BellButton;
