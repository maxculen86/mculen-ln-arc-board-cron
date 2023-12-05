import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Profile } from '@ln/foodit-ui-assets';
import { toggleDrawer } from '@ln/common-ui-drawer';
import AvatarRecetas from '../Avatar';

const RenderUserOptions = ({
    userType,
    initials,
    initialsClassName,
    suscription
}) => {
    if (userType === 'unlogged') return <></>;
    return (
        <>
            <AvatarRecetas
                initials={initials}
                initialsClassName={initialsClassName}
                suscription={suscription}
                className="lg-only"
            />
            <Button
                variant="link"
                className="lg-none"
                onClick={() =>
                    toggleDrawer({ id: 'drawer-account', show: true })
                }
                title="Abrir menu de usuario"
            >
                <Icon size={24}>
                    <Profile />
                </Icon>
            </Button>
        </>
    );
};

export default RenderUserOptions;
