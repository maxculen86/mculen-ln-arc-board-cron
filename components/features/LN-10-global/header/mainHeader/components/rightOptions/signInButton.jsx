import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { useHeaderContext } from '../../../context';

export function SignInButton() {
    const { negative, userType, goToLoginUrl } = useHeaderContext();

    if (userType !== 'unlogged') return null;
    return (
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
    );
}
