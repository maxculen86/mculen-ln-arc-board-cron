import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    FOODIT_LOGIN_URL,
    SITIO_SEGURO_REGISTRACION
} from 'fusion:environment';
import { Tooltip } from '@ln/common-ui-tooltip';
import { useOnClickOutside } from '@ln/hooks';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import getButtonCategory from './helpers/getButtonCategory';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import { SubscribeButton } from './components/subscribeButton';
import { LoginButton } from './components/loginButton';

function LoginSubscribeButtons({
    classNameButtons = '',
    termicasData = {},
    comesFrom = '',
    loginClassName = ''
}) {
    const { promotions } = useGetUserConfig();
    const { buttonLogginText, buttonSubscribeText, buttonSubscribeHeader } =
        promotions;
    const [tooltipState, setTooltipState] = useState({
        text: '',
        shouldShow: false
    });
    const refTooltipText = useRef(null);

    const { categoryEvent, url } = getButtonCategory(comesFrom);

    const textByCategory = {
        header: buttonSubscribeHeader,
        home: 'Empezá hoy'
    };

    const subscribeButtonText =
        textByCategory[categoryEvent] ?? buttonSubscribeText;

    useEffect(() => {
        if (termicasData) {
            setTooltipState({
                text: termicasData.tooltip_subscribe_foodit_text || '',
                shouldShow:
                    termicasData.tooltip_subscribe_foodit_show === 'true'
            });
        }
    }, [termicasData]);

    const hideSubscribeButtons =
        termicasData.hide_subscribe_button_foodit === 'true';

    const handleSubscribeClick = () => {
        const href = `${SITIO_SEGURO_REGISTRACION}${url}${window?.btoa(window.location.href)}`;
        requestAnimationFrame(() => {
            window.location.href = href;
        });
        addEventToDataLayerV2({
            event: 'subscription_start',
            button: categoryEvent
        });
    };

    const handleLoginClick = () => {
        const href = `${FOODIT_LOGIN_URL}${window?.btoa(window.location.href)}`;
        requestAnimationFrame(() => {
            window.location.href = href;
        });
        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'N/A',
            category: categoryEvent,
            label: 'inicia_sesion'
        });
    };

    useOnClickOutside(refTooltipText, () => {
        setTooltipState({ text: '', shouldShow: false });
    });

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
                    visible={tooltipState.shouldShow && tooltipState.text}
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
                <LoginButton
                    classNameButtons={classNameButtons}
                    buttonLogginText={buttonLogginText}
                    handleLoginClick={handleLoginClick}
                    loginClassName={loginClassName}
                />
            )}
        </>
    );
}

LoginSubscribeButtons.defaultProps = {
    classNameButtons: '',
    termicasData: {
        tooltip_subscribe_foodit_text: '',
        tooltip_subscribe_foodit_show: false,
        hide_subscribe_button_foodit: false
    },
    comesFrom: '',
    loginClassName: 'roboto-regular'
};

LoginSubscribeButtons.propTypes = {
    classNameButtons: PropTypes.string,
    termicasData: PropTypes.shape({
        tooltip_subscribe_foodit_text: PropTypes.string,
        tooltip_subscribe_foodit_show: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        hide_subscribe_button_foodit: PropTypes.bool
    }),
    comesFrom: PropTypes.string,
    loginClassName: PropTypes.string
};

export default LoginSubscribeButtons;
