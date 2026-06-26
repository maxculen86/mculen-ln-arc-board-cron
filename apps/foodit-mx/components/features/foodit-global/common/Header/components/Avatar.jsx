import React from 'react';
import { Avatar } from '@ln/foodit-ui-avatar';
import { Button } from '@ln/foodit-ui-button';
import { useDrawer } from '@ln/common-ui-drawer';
import { DRAWER } from '../../DrawerContainer/constants';

function AvatarRecetas({ className, initials, suscription }) {
    const { toggleDrawer } = useDrawer({ id: DRAWER.MY_ACCOUNT });

    return (
        <Button
            className={className}
            variant="link"
            data-test-id="button-menu-user"
            title="Abrir menú"
            onClick={() => {
                toggleDrawer();
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
}

export default AvatarRecetas;
