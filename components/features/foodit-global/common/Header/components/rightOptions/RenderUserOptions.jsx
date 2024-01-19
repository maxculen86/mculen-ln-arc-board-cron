import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { toggleDrawer } from '@ln/common-ui-drawer';
import AvatarRecetas from '../Avatar';
import useGetUserData from '../../../../hooks/useGetUserData';
import IconSprite from '../../../../../../features/private-global/common/iconSprite/IconSprite';

const RenderUserOptions = () => {
    const {
        userType,
        initials,
        initialsClassName,
        suscription
    } = useGetUserData();

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
                    <IconSprite name="profile" critical />
                </Icon>
            </Button>
        </>
    );
};

export default RenderUserOptions;
