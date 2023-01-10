/* eslint-disable react/prop-types */
import React from 'react';
import { MainHeader } from '@ln/contenidos-ui-header';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/contenidos-ui-icon';
import { goToLogout } from '../../LN/common/utils/loginHelper';

export const setDesplegableData = () => {
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
            url: '#',
            text: 'Cerrar sesión',
            title: 'Cerrar sesión',
            target: '_self'
        }
    ];

    return defaultOptions.map(option => ({
        ...option,
        callback: e => {
            e.preventDefault();
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'home_ln10',
                dynamic_category: 'menu_usuario',
                dynamic_label: option.text
            });

            option.text === 'Cerrar sesión' && goToLogout();
        }
    }));
};

export const RightOptions = ({
    userType,
    userName = '',
    desplegableData = []
}) => {
    const SubscribeButton = (
        <Button
            title="Suscribirse"
            typeButton="secondary"
            className="suscribe --border-gray --d-flex --ai-center"
        >
            <Icon icon="suscriptorExclusivo" className="--mr-2xs" />
            SUSCRIBITE
        </Button>
    );

    const MenuUser = (
        <MainHeader.MenuUser
            userType={userType}
            email={userName}
            initials={userName.substring(0, 2)}
            desplegableData={desplegableData}
        />
    );

    const rightOptions = {
        suscribed: MenuUser,
        logged: (
            <>
                {MenuUser}
                {SubscribeButton}
            </>
        ),
        unlogged: (
            <>
                <Button
                    title="Iniciar sesión"
                    typeButton="secondary"
                    className="--border-gray --mr-md --mobile-none"
                >
                    <Text size="2xs">INICIAR SESIÓN</Text>
                </Button>
                {SubscribeButton}
            </>
        )
    };

    return rightOptions[userType] || <></>;
};

export const logoCallback = e => {
    e.preventDefault();
    window.dataLayer.push({
        event: 'e_linkclick',
        dynamic_action: 'home_ln10',
        dynamic_category: 'header_logo',
        dynamic_label: 'logo'
    });
};
