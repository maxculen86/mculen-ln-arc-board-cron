import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import {
    FOODIT_LOGIN_URL,
    SITIO_SEGURO_REGISTRACION
} from 'fusion:environment';
import addEventToDataLayer from '../../../../../private/LN/common/utils/addEventToDataLayer';
import useGetUserConfig from '../../../hooks/useGetUserConfig';

const LoginSubscribeButtons = ({ classNameButtons = '' }) => {
    const { promotions } = useGetUserConfig();
    const { buttonLogginText, buttonSubscribeText } = promotions;

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
                    data-event-data-layer="subscription_start"
                    data-button="buttonSubscribeText"
                    href={`${SITIO_SEGURO_REGISTRACION}/suscripcion/V/3/?callback=${window &&
                        window.btoa(window.location.href)}`}
                    onClick={() => {
                        addEventToDataLayer({
                            event: 'subscription_start',
                            button: buttonSubscribeText
                        });
                    }}
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
                    href={
                        FOODIT_LOGIN_URL +
                        (window && window.btoa(location.href))
                    }
                >
                    <span className="roboto-regular">{buttonLogginText}</span>
                </Button>
            )}
        </>
    );
};

export default LoginSubscribeButtons;
