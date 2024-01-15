import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { LOGIN_URL } from 'fusion:environment';
import useGetUserData from '../../../hooks/useGetUserData';

const LoginSubscribeButtons = () => {
    const { promotions } = useGetUserData();
    const { buttonLogginText, buttonSubscribeText } = promotions;

    return (
        <>
            {buttonSubscribeText && (
                <Button
                    className="lg-only"
                    title="Suscribirse"
                    variant="accent"
                    size={32}
                >
                    {buttonSubscribeText}
                </Button>
            )}
            {buttonLogginText && (
                <Button
                    className="lg-only"
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
