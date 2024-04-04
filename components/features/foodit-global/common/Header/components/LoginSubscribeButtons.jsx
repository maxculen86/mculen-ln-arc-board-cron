import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { LOGIN_URL } from 'fusion:environment';
import useGetUserData from '../../../hooks/useGetUserData';
import classNames from 'classnames';

const LoginSubscribeButtons = ({ classNameButtons = '' }) => {
    const { promotions } = useGetUserData();
    const { buttonLogginText, buttonSubscribeText } = promotions;

    const classNameLoginButton = classNames(
        'button foodit-button gap-8 roboto-regular text-12 rounded-4 text-light-800 text-accent-lechuga__hover',
        classNameButtons
    );

    return (
        <>
            {buttonSubscribeText && (
                <Button
                    className={classNameButtons}
                    title="Suscribirse"
                    variant="accent"
                    size={{ sm: 32, md: 32, lg: 40 }}
                    data-interaction="dataLayerInteraction"
                    data-event-data-layer="subscription_start"
                    data-button="buttonSubscribeText"
                >
                    {buttonSubscribeText}
                </Button>
            )}
            {buttonLogginText && (
                <button
                    className={classNameLoginButton}
                    title="Iniciar sesión"
                    data-variant="link"
                    onClick={() =>
                        (location.href = LOGIN_URL + window.btoa(location.href))
                    }
                >
                    {buttonLogginText}
                </button>
            )}
        </>
    );
};

export default LoginSubscribeButtons;
