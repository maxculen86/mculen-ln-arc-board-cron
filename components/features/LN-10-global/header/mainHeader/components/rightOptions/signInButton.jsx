import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { useHeaderContext } from '../../../context';

export const SignInButton = () => {
    const { negative, userType, goToLoginUrl } = useHeaderContext();

    if (userType !== 'unlogged') return <></>;
    return (
        <>
            <Button
                title="Iniciar sesión"
                variant="secondary"
                className="--tablet-none"
                onClick={goToLoginUrl}
                isNegative={negative}
                id="btningresar"
            >
                INICIAR SESIÓN
            </Button>
        </>
    );
};
