import React from 'react';
import { Avatar } from '@ln/foodit-ui-avatar';
import { Button } from '@ln/foodit-ui-button';
import { toggleDrawer } from '@ln/common-ui-drawer';

const AvatarRecetas = ({ className, initials, suscription }) => {
    return (
        <Button
            className={className}
            variant="link"
            title="Abrir menú"
            onClick={() => {
                toggleDrawer({ id: 'drawer-account', show: true });
            }}
        >
            <Avatar
                variant={
                    suscription === 'Suscriptor digital'
                        ? 'suscriber'
                        : 'no-suscriber'
                }
            >
                <Avatar.Initials>{initials}</Avatar.Initials>
            </Avatar>
        </Button>
    );
};

export default AvatarRecetas;
