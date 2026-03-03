import React, { useEffect, useState } from 'react';
import { API_ENV, LOGIN_URL } from 'fusion:environment';
import { NotificationsCentre } from '@ln/lib-personalizacion';
import { getInitialState } from '../../_helper';
import { toggleBellColor } from './_helper';
import { useHeaderContext } from '../../../context';
import useAuthManager from '../../../../../../private/common/auth/hooks/useAuthManager';
import { addEventToDataLayerV2 } from '../../../../../../private/LN/common/utils/addEventToDataLayer';

function BellButton() {
    const { negative, intersectingSentinel } = useHeaderContext();
    const [showTooltip, setShowTooltip] = useState(false);
    const [props, setProps] = useState({});
    const { token, accessToken } = useAuthManager();

    const handleBellClick = () => {
        setShowTooltip(false);
        localStorage.setItem('showTooltip', false);
        addEventToDataLayerV2({
            event: 'trackEvent',
            category: 'campanita',
            action: 'campanita',
            label: 'N/A'
        });
    };
    const handleNotificationsClick = notification => {
        addEventToDataLayerV2({
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
        addEventToDataLayerV2({
            event: 'action_notification',
            button: message.buttonLabel || 'N/A',
            title: (message.title && `mensaje-${message.title}`) || 'N/A',
            page_notification: message.url || 'N/A',
            identifier: message.id
        });
    };

    const buildProps = () => ({
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
            addEventToDataLayerV2({
                category: 'campanita',
                label: 'Iniciar Sesión',
                action: 'click',
                event: 'trackEvent'
            });
        },
        onBellClick: handleBellClick,
        onNotificationsClick: handleNotificationsClick,
        onMessageButtonClick: handleMessageButtonClick
    });

    const initializeTooltip = () => {
        const toggleTooltip = getInitialState() ? intersectingSentinel : false;
        setShowTooltip(toggleTooltip);
    };
    useEffect(() => {
        if (token && accessToken) {
            setProps(buildProps());
        }
    }, [token, accessToken]);

    useEffect(() => {
        initializeTooltip();
    }, [showTooltip, intersectingSentinel]);
    toggleBellColor(negative);

    return <NotificationsCentre {...props} />;
}
export default BellButton;
