import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/foodit-ui-button';
import {
    FOODIT_LOGIN_URL,
    SITIO_SEGURO_REGISTRACION
} from 'fusion:environment';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';
import useGetUserConfig from '../../../hooks/useGetUserConfig';

function LoginSubscribeButtons({ classNameButtons = '' }) {
    const { promotions } = useGetUserConfig();
    const { buttonLogginText, buttonSubscribeText } = promotions;

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
    return (
        <>
            {buttonSubscribeText && (
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
                    {buttonSubscribeText}
                </Button>
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
    classNameButtons: ''
};

LoginSubscribeButtons.propTypes = {
    classNameButtons: PropTypes.string
};

export default LoginSubscribeButtons;
