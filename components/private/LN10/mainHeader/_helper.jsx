/* eslint-disable react/prop-types */
import React from 'react';
import { MainHeader } from '@ln/contenidos-ui-header';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/contenidos-ui-icon';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import addEventToDataLayer from '../../LN/common/utils/addEventToDataLayer';

export const setDesplegableData = (goToLogout = () => {}) => {
    const defaultOptions = [
        {
            url: 'https://www.lanacion.com.ar/mis-notas/',
            text: 'Mis notas',
            title: 'Ir a mis notas',
            target: '_self'
        },
        {
            url: 'https://myaccount.lanacion.com.ar/mi-usuario/',
            text: 'Mi cuenta',
            title: 'Ir a mi cuenta',
            target: '_self'
        },
        {
            url: 'https://myaccount.lanacion.com.ar/datos-personales/',
            text: 'Mis datos',
            title: 'Ir a mis datos',
            target: '_self'
        },
        {
            url: 'https://micuenta.lanacion.com.ar/mis-suscripciones/',
            text: 'Mis suscripciones',
            title: 'Ir a mis suscripciones',
            target: '_self'
        },
        {
            url: 'javascript:void(0);',
            text: 'Cerrar sesión',
            title: 'Cerrar sesión',
            target: '_self'
        }
    ];

    return defaultOptions.map(option => ({
        ...option,
        callback: () => {
            addEventToDataLayer({
                event: 'e_linkclick',
                action: 'home_ln10',
                category: 'menu_usuario',
                label: option.text
            });
            option.text === 'Cerrar sesión' && goToLogout();
        }
    }));
};

export const RightOptions = ({
    userType,
    initials = '',
    userName = '',
    desplegableData = [],
    goToLoginUrl,
    loggedIn = ''
}) => {
    const SubscribeButton = (
        <Button
            title="Suscribirse"
            typeButton="secondary"
            className="suscribe --border-gray --d-flex --ai-center"
            onClick={() =>
                window.location.replace(
                    `${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${window.btoa(
                        window.location.href
                    )}`
                )
            }
        >
            <Icon icon="suscriptorExclusivo" />
            SUSCRIBITE
        </Button>
    );

    const MenuUser = (
        <MainHeader.MenuUser
            title="Menu de usuario"
            userType={userType}
            email={userName}
            initials={initials}
            desplegableData={desplegableData}
        />
    );

    const rightOptions = {
        suscribed: MenuUser,
        logged: loggedIn && (
            <>
                {MenuUser}
                {SubscribeButton}
            </>
        ),
        unlogged: !loggedIn && (
            <>
                <Button
                    title="Iniciar sesión"
                    typeButton="secondary"
                    className="--border-gray --mobile-none"
                    onClick={goToLoginUrl}
                >
                    <Text size="2xs">INICIAR SESIÓN</Text>
                </Button>
                {SubscribeButton}
            </>
        )
    };

    return rightOptions[userType] || <></>;
};

export const sectionsCallback = (e, toggleDesplegable) => {
    toggleDesplegable();
    addEventToDataLayer({
        event: 'e_linkclick',
        action: 'home_ln10',
        category: 'header_logo',
        label: 'secciones'
    });
};

export const logoCallback = e => {
    addEventToDataLayer({
        event: 'e_linkclick',
        action: 'home_ln10',
        category: 'header_logo',
        label: 'logo'
    });
};

export const setInitials = (firstName = '', lastName = '', email = '') =>
    (firstName && lastName
        ? `${firstName[0]}${lastName[0]}`
        : email.substring(0, 2)
    ).toUpperCase();
