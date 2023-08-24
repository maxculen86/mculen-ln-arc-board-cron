import React from 'react';
import { Button } from '@ln/recetas-ui-button';
import AvatarRecetas from './Avatar';

const RightOptions = ({
    userType,
    email,
    initials,
    initialsClassName,
    suscription
}) => {
    return (
        <>
            {userType === 'unlogged' && (
                <Button
                    title="Iniciar sesión"
                    className="text-uppercase lg-only"
                >
                    INICIAR SESIÓN
                </Button>
            )}
            {userType !== 'unlogged' && (
                <AvatarRecetas
                    className="lg-only"
                    email={email}
                    initials={initials}
                    initialsClassName={initialsClassName}
                    suscription={suscription}
                />
            )}
            {userType !== 'subscribed' && (
                <Button title="Suscribite" variant="accent">
                    SUSCRIBITE
                </Button>
            )}
        </>
    );
};

export default RightOptions;
