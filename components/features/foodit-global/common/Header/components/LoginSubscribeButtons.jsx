import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { LOGIN_URL } from 'fusion:environment';
import useGetUserData from '../../../hooks/useGetUserData';

const LoginSubscribeButtons = ({ classNameButtons = '' }) => {
    const { promotions } = useGetUserData();
    const { buttonLogginText, buttonSubscribeText } = promotions;

    return (
        <>
            {buttonSubscribeText && (
                <Button
                    className={classNameButtons}
                    title="Suscribirse"
                    variant="accent"
                    size={{ sm: 32, md: 32, lg: 40 }}
                >
                    {buttonSubscribeText}
                </Button>
            )}
            {buttonLogginText && (
                <Button
                    className={classNameButtons}
                    title="Iniciar sesión"
                    variant="link"
                    onClick={() =>
                        (location.href = LOGIN_URL + window.btoa(location.href))
                    }
                >
                    {buttonLogginText}
                </Button>
            )}
        </>
    );
};

export default LoginSubscribeButtons;
