import React, { useEffect, useState, useRef } from 'react';
import {
    FOODIT_LOGIN_URL,
    SITIO_SEGURO_REGISTRACION
} from 'fusion:environment';
import { Tooltip } from '@ln/common-ui-tooltip';
import { useOnClickOutside } from '@ln/hooks';
import { cx } from '@ln/ds-cva';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import getButtonCategory from './helpers/getButtonCategory';
import { pushFooditEvent } from '../utils/pushFooditEvent';
import { SubscribeButton } from './components/subscribeButton';
import { LoginButton } from './components/loginButton';

function LoginSubscribeButtons({
    classNameButtons = '',
    termicasData = {
        tooltip_subscribe_foodit_text: '',
        tooltip_subscribe_foodit_show: 'false',
        hide_subscribe_button_foodit: 'false'
    },
    comesFrom = '',
    loginClassName = 'roboto-regular'
}) {
    const { promotions } = useGetUserConfig();
    const { buttonLogginText, buttonSubscribeText, buttonSubscribeHeader } =
        promotions;
    const [tooltipState, setTooltipState] = useState({
        text: '',
        shouldShow: false
    });
    const refTooltipText = useRef(null);

    const hideTooltip = comesFrom === 'ChatIA';
    const { categoryEvent, url } = getButtonCategory(comesFrom);
    const comesFromHeader = comesFrom === 'HeaderFoodit';

    const textByCategory = {
        header: buttonSubscribeHeader,
        home: 'Empezá hoy'
    };

    const subscribeButtonText =
        textByCategory[categoryEvent] ?? buttonSubscribeText;

    const shouldHideLoginButtonInHeader =
        comesFromHeader &&
        subscribeButtonText?.toLowerCase().trim() !== 'suscribite';

    const tooltipText = termicasData?.tooltip_subscribe_foodit_text || '';
    const tooltipShow = termicasData?.tooltip_subscribe_foodit_show === 'true';

    useEffect(() => {
        setTooltipState({
            text: tooltipText,
            shouldShow: tooltipShow
        });
    }, [tooltipText, tooltipShow]);

    const hideSubscribeButtons =
        termicasData.hide_subscribe_button_foodit === 'true';

    const handleSubscribeClick = () => {
        const href = `${SITIO_SEGURO_REGISTRACION}${url}${window?.btoa(window.location.href)}`;
        requestAnimationFrame(() => {
            window.location.href = href;
        });
        pushFooditEvent({
            event: 'subscription_start',
            button: categoryEvent
        });
    };

    const handleLoginClick = () => {
        const href = `${FOODIT_LOGIN_URL}${window?.btoa(window.location.href)}`;
        requestAnimationFrame(() => {
            window.location.href = href;
        });
        pushFooditEvent({
            event: 'e_linkclick',
            action: 'N/A',
            category: categoryEvent,
            label: 'inicia_sesion'
        });
    };

    useOnClickOutside(refTooltipText, () => {
        setTooltipState({ text: '', shouldShow: false });
    });

    const classContainerLoginButton = cx(
        shouldHideLoginButtonInHeader && 'sm-none'
    );

    return (
        <>
            {!hideSubscribeButtons && buttonSubscribeText && (
                <Tooltip
                    position="bottom-center"
                    content={
                        <span ref={refTooltipText} className="text-12">
                            {tooltipState.text}
                        </span>
                    }
                    className="lg-only flex rounded-4 shadow-center px-8 py-4 bg-secondary-positive text-light-1 border border-all border-thin border-light-100 z-5"
                    style={{ maxWidth: '200px' }}
                    role="tooltip"
                    aria-live="polite"
                    visible={
                        !hideTooltip &&
                        tooltipState.shouldShow &&
                        tooltipState.text
                    }
                    disableTrigger
                >
                    <SubscribeButton
                        classNameButtons={classNameButtons}
                        buttonSubscribeText={subscribeButtonText}
                        handleSubscribeClick={handleSubscribeClick}
                    />
                </Tooltip>
            )}
            {buttonLogginText && categoryEvent !== 'home' && (
                <div className={classContainerLoginButton}>
                    <LoginButton
                        classNameButtons={classNameButtons}
                        buttonLogginText={buttonLogginText}
                        handleLoginClick={handleLoginClick}
                        loginClassName={loginClassName}
                    />
                </div>
            )}
        </>
    );
}

export default LoginSubscribeButtons;
