/* eslint-disable react/prop-types */
import React from 'react';
import { MainHeader } from '@ln/contenidos-ui-header';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { ExclusivoSuscriptores, Bell } from '@ln/contenidos-ui-assets';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import addEventToDataLayer from '../../LN/common/utils/addEventToDataLayer';

export const setDesplegableData = (goToLogout = () => {}) => {
    const LogoutText = 'Cerrar sesión';

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
            url: 'https://myaccount.lanacion.com.ar/mis-suscripciones/',
            text: 'Mis suscripciones',
            title: 'Ir a mis suscripciones',
            target: '_self'
        },
        {
            url: 'javascript:void(0);',
            text: LogoutText,
            title: LogoutText,
            target: '_self'
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

export const RightOptions = ({
    userType,
    initials = '',
    userName = '',
    desplegableData = [],
    goToLoginUrl,
    loggedIn = '',
    loading = false,
    hasSubscribeButton = true
}) => {
    const SubscribeButton = (
        <Button
            id="btnsuscribite"
            title="Suscribite"
            typeButton="subscribe"
            className={!loading && hasSubscribeButton ? '' : '--none'}
            // eslint-disable-next-line no-return-assign
            onClick={() => {
                window.location.href = `${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${window.btoa(
                    window.location.href
                )}`;
            }}
        >
            <Icon
                icon="suscriptorExclusivo"
                size={18}
                className="--mobile-none"
            >
                <ExclusivoSuscriptores />
            </Icon>
            Suscribite
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

    const SignInButton = (
        <>
            <Button
                title="Iniciar sesión"
                typeButton="secondary"
                className={!loggedIn && !loading ? '--tablet-none' : '--none'}
                onClick={goToLoginUrl}
                id="btningresar"
            >
                INICIAR SESIÓN
            </Button>
        </>
    );

    const BellButton = (
        <Button
            title="Campanita"
            size="sm"
            className="--icon-only campanita --none"
        >
            <Icon size={24}>
                <Bell />
            </Icon>
        </Button>
    );

    const rightOptions = {
        suscribed: MenuUser,
        logged: loggedIn && MenuUser,
        unlogged: SignInButton
    };

    return (
        <>
            {BellButton}
            {rightOptions[userType] || <></>}
            {userType !== 'suscribed' && SubscribeButton}
        </>
    );
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

export const logoCallback = e => {
    addEventToDataLayer({
        event: 'e_linkclick',
        action: 'header_logo',
        category: 'home_ln10',
        label: 'logo'
    });
};

export const setInitials = (firstName = '', lastName = '', email = '') =>
    (firstName && lastName
        ? `${firstName[0]}${lastName[0]}`
        : email.substring(0, 2)
    ).toUpperCase();
