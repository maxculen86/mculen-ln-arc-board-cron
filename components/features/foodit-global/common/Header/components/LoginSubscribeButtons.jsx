import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import {
    FOODIT_LOGIN_URL,
    SITIO_SEGURO_REGISTRACION
} from 'fusion:environment';
import useGetUserData from '../../../hooks/useGetUserData';
import addEventToDataLayer from '../../../../../private/LN/common/utils/addEventToDataLayer';

const LoginSubscribeButtons = ({ classNameButtons = '' }) => {
    const { promotions } = useGetUserData();
    const { buttonLogginText, buttonSubscribeText } = promotions;

    return (
        <>
            {buttonSubscribeText && (
                <Button
                    className={classNameButtons}
                    title={buttonSubscribeText}
                    variant="accent"
                    size={{ sm: 32, md: 32, lg: 40 }}
                    data-interaction="dataLayerInteraction"
                    data-event-data-layer="subscription_start"
                    data-button="buttonSubscribeText"
                    onClick={() => {
                        addEventToDataLayer({
                            event: 'subscription_start',
                            button: buttonSubscribeText
                        });

                        return (location.href = `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/3/?cv=670&fc=825&callback=${window.btoa(
                            window.location.href
                        )}`);
                    }}
                >
                    {buttonSubscribeText}
                </Button>
            )}
            {buttonLogginText && (
                <Button
                    className={classNameButtons}
                    title={buttonLogginText}
                    variant="link"
                    data-variant="link"
                    onClick={() =>
                        (location.href =
                            FOODIT_LOGIN_URL + window.btoa(location.href))
                    }
                >
                    <span className="roboto-regular">{buttonLogginText}</span>
                </Button>
            )}
        </>
    );
};

export default LoginSubscribeButtons;
