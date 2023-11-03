import React from 'react';
import { Button } from '@ln/foodit-ui-button';
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
                    variant="link"
                    title="Iniciar sesión"
                    className="lg-only as-center"
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
