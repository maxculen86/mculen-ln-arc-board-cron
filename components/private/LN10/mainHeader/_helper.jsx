/* eslint-disable react/prop-types */
import React from 'react';
import { MainHeader } from '@ln/contenidos-ui-header';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { SuscriptorExclusivo } from '@ln/assets-ui-icons';
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
            url: 'https://micuenta.lanacion.com.ar/mis-suscripciones/',
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
                action: 'home_ln10',
                category: 'menu_usuario',
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
    loading = false
}) => {
    const SubscribeButton = (
        <Button
            id="btnsuscribite"
            title="Suscribite"
            typeButton="subscribe"
            className={!loading ? '' : '--none'}
            // eslint-disable-next-line no-return-assign
            onClick={() => {
                window.location.href = `${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${window.btoa(
                    window.location.href
                )}`;
            }}
        >
            <Icon icon="suscriptorExclusivo" size={18}>
                <SuscriptorExclusivo />
            </Icon>
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
        logged: loggedIn && <>{MenuUser}</>,
        unlogged: !loggedIn && !loading && (
            <>
                <Button
                    title="Iniciar sesión"
                    typeButton="secondary"
                    className="--mobile-none"
                    onClick={goToLoginUrl}
                >
                    INICIAR SESIÓN
                </Button>
            </>
        )
    };

    return (
        <>
            {rightOptions[userType] || <></>}
            {userType !== 'suscribed' && SubscribeButton}
        </>
    );
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
