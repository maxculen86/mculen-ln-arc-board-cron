import React, { useEffect, useState } from 'react';
import { API_ENV, LOGIN_URL } from 'fusion:environment';
import { getInitialState } from '../../_helper';
import { toggleBellColor } from './_helper';
import { NotificationsCentre } from '@ln/lib-personalizacion';
import { useHeaderContext } from '../../../context';
import addEventToDataLayer from '../../../../../../private/LN/common/utils/addEventToDataLayer';
import { authManager } from '../../../../../../../auth/helper/loginHelper';
import isSSR from '../../../../../../private/LN/common/utils/isSSR';

export const BellButton = () => {
    const { negative, intersectingSentinel } = useHeaderContext();
    const [showTooltip, setShowTooltip] = useState(false);
    const [props, setProps] = useState({});

    useEffect(() => {
        authManager(tokenProps => {
            const properties = buildProps(tokenProps);
            setProps(properties);
        });
    }, []);

    useEffect(() => {
        initializeTooltip();
        toggleBellColor(negative);
    }, [showTooltip, intersectingSentinel]);
    const initializeTooltip = () => {
        const toggleTooltip = getInitialState() ? intersectingSentinel : false;
        setShowTooltip(toggleTooltip);
    };
    const buildProps = ({ accessToken, token } = {}) => {
        return {
            ...(token &&
                accessToken && {
                    userIdToken: token,
                    userAccessToken: accessToken
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
    return !isSSR() && <NotificationsCentre {...props} />;
};
export default BellButton;
