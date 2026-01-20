import React, { useEffect, useState } from 'react';
import { API_ENV, LOGIN_URL } from 'fusion:environment';
import { NotificationsCentre } from '@ln/lib-personalizacion';
import { useIdleTask } from '@ln/utility-hooks';
import { getInitialState } from '../../../../../../../LN-10-global/header/mainHeader/_helper';
import useAuthManager from '../../../../../../../../private/common/auth/hooks/useAuthManager';
import { addEventToDataLayerV2 } from '../../../../../../../../private/LN/common/utils/addEventToDataLayer';
import isSSR from '../../../../../../../../private/LN/common/utils/isSSR';

function BellButton() {
    // TODO: ajustar variante negativa cuando este dark-theme implementado en el DS.
    const [showTooltip, setShowTooltip] = useState(false);
    const [props, setProps] = useState({});
    const { token, accessToken } = useAuthManager();

    // Carga diferida de variables de css campanita.
    useIdleTask(() => {
        import('./index.css');
    });

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
        const toggleTooltip = getInitialState();
        setShowTooltip(toggleTooltip);
    };
    useEffect(() => {
        if (token && accessToken) {
            setProps(buildProps());
        }
    }, [token, accessToken]);

    useEffect(() => {
        initializeTooltip();
    }, [showTooltip]);

    if (isSSR()) return null;

    return <NotificationsCentre {...props} />;
}

export default BellButton;
