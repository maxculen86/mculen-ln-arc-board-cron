import React, { useEffect, useState } from 'react';
import { API_ENV, LOGIN_URL } from 'fusion:environment';
import handleCookie from '../../../../../../private/LN/common/utils/handleCookie';
import { getInitialState } from '../../_helper';
import { toggleBellColor } from './_helper';
import { NotificationsCentre } from '@ln/lib-personalizacion';
import { useHeaderContext } from '../../../context';

export const BellButton = () => {
    const { negative } = useHeaderContext();

    const [showTooltip, setShowTooltip] = useState(false);
    const [props, setProps] = useState({});

    const { getCookie } = handleCookie();
    const token = getCookie('token');
    const accessToken = getCookie('access-token');
    const { dataLayer } = window;

    useEffect(() => {
        initializeTooltip();
        setProps(buildProps());
    }, [showTooltip]);

    const initializeTooltip = () => {
        setShowTooltip(getInitialState());
    };

    toggleBellColor(negative);

    const buildProps = () => {
        return {
            ...(token &&
                accessToken && {
                    userIdToken: token,
                    userAccessToken: accessToken
                }),
            isTestEnvironment: API_ENV !== 'prod',
            zone: 'lanacion',
            showTooltip: showTooltip,
            loginHref: LOGIN_URL,
            notificationsRequestSize: 5,
            messagesRequestSize: 5,
            tooltipText: 'Aquí encontrarás todas nuestras notificaciones',
            loginOnClick: () => {
                dataLayer.push({
                    event: 'trackEvent',
                    category: 'campanita',
                    action: 'click',
                    label: 'Iniciar Sesión'
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
        dataLayer.push({
            event: 'trackEvent',
            category: 'campanita',
            action: 'campanita',
            label: 'N/A'
        });
    };
    const handleNotificationsClick = notification => {
        dataLayer.push({
            event: 'action_notification',
            button: notification.buttonLabel || 'N/A',
            title:
                (notification.title && `notificación-${notification.title}`) ||
                'N/A',
            page_notification: notification.url || 'N/A'
        });
    };
    const handleMessageButtonClick = message => {
        dataLayer.push({
            event: 'action_notification',
            button: message.buttonLabel || 'N/A',
            title: (message.title && `mensaje-${message.title}`) || 'N/A',
            page_notification: message.url || 'N/A'
        });
    };
    return <NotificationsCentre {...props} />;
};
export default BellButton;
