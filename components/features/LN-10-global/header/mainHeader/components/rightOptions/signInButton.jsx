import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { useHeaderContext } from '../../../context';
import { LOGIN_URL } from 'fusion:environment';

export const SignInButton = () => {
    const { negative, userType } = useHeaderContext();

    if (userType !== 'unlogged') return <></>;
    return (
        <>
            <Button
                title="Iniciar sesión"
                variant="secondary"
                className="--tablet-none"
                onClick={() =>
                    (location.href = LOGIN_URL + window.btoa(location.href))
                }
                isNegative={negative}
                id="btningresar"
            >
                INICIAR SESIÓN
            </Button>
        </>
    );
};
