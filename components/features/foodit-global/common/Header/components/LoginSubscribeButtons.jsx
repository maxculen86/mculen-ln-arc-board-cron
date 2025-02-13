import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/foodit-ui-button';
import {
    FOODIT_LOGIN_URL,
    SITIO_SEGURO_REGISTRACION
} from 'fusion:environment';
import { Tooltip } from '@ln/common-ui-tooltip';
import { useOnClickOutside } from '@ln/hooks';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';
import useGetUserConfig from '../../../hooks/useGetUserConfig';

function LoginSubscribeButtons({ classNameButtons = '', termicasData = {} }) {
    const { promotions } = useGetUserConfig();
    const { buttonLogginText, buttonSubscribeText } = promotions;
    const [tooltipState, setTooltipState] = useState({
        text: '',
        shouldShow: false
    });
    const refTooltipText = useRef(null);

    useEffect(() => {
        if (termicasData) {
            setTooltipState({
                text: termicasData.tooltip_subscribe_foodit_text || '',
                shouldShow:
                    termicasData.tooltip_subscribe_foodit_show === 'true'
            });
        }
    }, [termicasData]);

    const handleSubscribeClick = () => {
        const href = `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/3/?callback=${window?.btoa(window.location.href)}`;
        requestAnimationFrame(() => {
            window.location.href = href;
        });
        addEventToDataLayerV2({
            event: 'subscription_start',
            button: buttonSubscribeText
        });
    };
    const handleLoginClick = () => {
        const href = `${FOODIT_LOGIN_URL}${window?.btoa(window.location.href)}`;
        requestAnimationFrame(() => {
            window.location.href = href;
        });
    };

    useOnClickOutside(refTooltipText, () => {
        setTooltipState({ text: '', shouldShow: false });
    });

    return (
        <>
            {buttonSubscribeText && (
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
                    <Button
                        className={classNameButtons}
                        title={buttonSubscribeText}
                        variant="accent"
                        size={{ sm: 32, md: 32, lg: 40 }}
                        data-test-id="button-suscribe"
                        data-interaction="dataLayerInteraction"
                        data-event="subscription_start"
                        data-button="buttonSubscribeText"
                        onClick={handleSubscribeClick}
                    >
                        <span className="roboto-bold">
                            {buttonSubscribeText}
                        </span>
                    </Button>
                </Tooltip>
            )}
            {buttonLogginText && (
                <Button
                    data-test-id="button-login"
                    className={classNameButtons}
                    title={buttonLogginText}
                    variant="link"
                    data-variant="link"
                    onClick={handleLoginClick}
                >
                    <span className="roboto-regular">{buttonLogginText}</span>
                </Button>
            )}
        </>
    );
}

LoginSubscribeButtons.defaultProps = {
    classNameButtons: '',
    termicasData: {
        tooltip_subscribe_foodit_text: '',
        tooltip_subscribe_foodit_show: false
    }
};

LoginSubscribeButtons.propTypes = {
    classNameButtons: PropTypes.string,
    termicasData: PropTypes.shape({
        tooltip_subscribe_foodit_text: PropTypes.string,
        tooltip_subscribe_foodit_show: PropTypes.bool
    })
};

export default LoginSubscribeButtons;
