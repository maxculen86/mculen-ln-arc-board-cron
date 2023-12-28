/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { MainHeader } from '@ln/contenidos-ui-header';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { ExclusivoSuscriptores, Bell } from '@ln/contenidos-ui-assets';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import addEventToDataLayer from '../../LN/common/utils/addEventToDataLayer';
import useTermica from '../../common/hooks/useTermica';
import { GlobalContext } from '../../common/context/globalContext';
import get from '../../common/utils/get';
import handleCookie from '../../LN/common/utils/handleCookie';
import { Tooltip } from '@ln/contenidos-ui-tooltip';
import classNames from 'classnames';

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
    hasSubscribeButton = true,
    isHome
}) => {
    const termicaSubscribe = useTermica('buttonsuscribe');
    const termicaUpselling = useTermica('termica_upselling');

    const { getCookie } = handleCookie();
    const valueCookie = getCookie('gaComboType') || '';

    const propertyNames = [
        'class_tooltip',
        'tooltip_text',
        'button_text',
        'sticky_button_text',
        'class_upselling_tooltip',
        'upselling_tooltip_text',
        'duo_button_text',
        'triple_button_text',
        'black_button_text'
    ];
    let {
        class_tooltip = '--top_l',
        tooltip_text = '',
        button_text = 'Suscribite',
        sticky_button_text = 'Suscribite',
        class_upselling_tooltip = '--top_l',
        upselling_tooltip_text = '¡Mejorá tu plan y <br> pagá lo mismo!',
        duo_button_text = 'Pasate a dúo',
        triple_button_text = 'Pasate a triple',
        black_button_text = 'Pasate a black'
    } = getTermicaValues(propertyNames);

    const upsellingData = {
        'ga-combo2': {
            text: duo_button_text,
            url:
                'https://myaccount.lanacion.com.ar/confirmar-upselling/up-selling/pasate-a-duo?cv=733&fc=277'
        },
        'ga-comboDuo': {
            text: triple_button_text,
            url:
                'https://myaccount.lanacion.com.ar/confirmar-upselling/up-selling/pasate-a-triple?cv=733&fc=277'
        },
        'ga-comboTriple': {
            text: black_button_text,
            url:
                'https://myaccount.lanacion.com.ar/confirmar-upselling/up-selling/pasate-a-black?cv=733&fc=277'
        }
    };

    const upsellingText = get(upsellingData, `${valueCookie}.text`, '');
    const upsellingUrl = get(upsellingData, `${valueCookie}.url`, '');

    const upsellingTooltipClassName = classNames(
        !isHome && 'none',
        '--mobile-none',
        class_upselling_tooltip
    );

    const upsellingButtonClassName = classNames(
        !loading && termicaUpselling ? '' : 'none',
        'relative'
    );

    const UpsellingButton = () => {
        if (userType !== 'subscribe' && !upsellingText && !upsellingUrl)
            return <></>;
        return (
            <Button
                id="btn-upselling"
                title={upsellingText}
                variant="subscribe"
                className={upsellingButtonClassName}
                onClick={() => {
                    window.location.href = valueCookie && upsellingUrl;
                }}
            >
                {upselling_tooltip_text && (
                    <Tooltip
                        className={upsellingTooltipClassName}
                        text={upselling_tooltip_text}
                    />
                )}
                <span
                    id="button-text-upselling"
                    dangerouslySetInnerHTML={{
                        __html: upsellingText
                    }}
                />
            </Button>
        );
    };

    if (!termicaSubscribe) {
        button_text = 'SUSCRIBITE';
        sticky_button_text = 'SUSCRIBITE';
    }

    const tooltipClassName = classNames(
        !isHome && 'none',
        '--mobile-none',
        class_tooltip
    );

    const subscribeButtonClassName = classNames(
        !loading && hasSubscribeButton ? '' : 'none',
        'relative'
    );

    const hideButtonText = isHome ? '' : 'none';
    const hideStickyButtonText = isHome ? 'none' : '';

    const SubscribeButton = () => {
        if (userType === 'subscribed' || upsellingText) return <></>;
        return (
            <Button
                id="btnsuscribite"
                title="Suscribite"
                variant="subscribe"
                className={subscribeButtonClassName}
                onClick={() => {
                    window.location.href = `${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${window.btoa(
                        window.location.href
                    )}`;
                }}
            >
                {termicaSubscribe && tooltip_text && (
                    <Tooltip className={tooltipClassName} text={tooltip_text} />
                )}
                <Icon
                    icon="suscriptorExclusivo"
                    size={18}
                    className="--mobile-none"
                >
                    <ExclusivoSuscriptores />
                </Icon>

                {button_text || sticky_button_text ? (
                    <>
                        <span
                            id="button-text"
                            className={hideButtonText}
                            dangerouslySetInnerHTML={{ __html: button_text }}
                        />
                        <span
                            id="sticky-button-text"
                            className={hideStickyButtonText}
                            dangerouslySetInnerHTML={{
                                __html: sticky_button_text
                            }}
                        />
                    </>
                ) : (
                    'Suscribite'
                )}
            </Button>
        );
    };

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
                variant="secondary"
                className={!loggedIn && !loading ? '--tablet-none' : 'none'}
                onClick={goToLoginUrl}
                id="btningresar"
            >
                INICIAR SESIÓN
            </Button>
        </>
    );

    const BellButton = (
        <Button title="Campanita" className="campanita none">
            <Icon size={24}>
                <Bell />
            </Icon>
        </Button>
    );

    const rightOptions = {
        subscribed: MenuUser,
        logged: loggedIn && MenuUser,
        unlogged: SignInButton
    };

    return (
        <>
            {BellButton}
            {<UpsellingButton />}
            {rightOptions[userType] || <></>}
            {<SubscribeButton />}
        </>
    );
};

export const getTermicaValues = propertyNames => {
    const gc = useContext(GlobalContext);
    const termicas = get(gc, 'state.siteService.termicas', []);

    return propertyNames.reduce((acc, propertyName) => {
        const element = termicas.find(
            termica => termica && termica.key === propertyName
        );
        acc[propertyName] = (element && element.value) || '';
        return acc;
    }, {});
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
