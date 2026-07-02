import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { useDrawer } from '@ln/common-ui-drawer';
import { DRAWER } from '../../../DrawerContainer/constants';
import AvatarRecetas from '../Avatar';
import useGetUserConfig from '../../../../hooks/useGetUserConfig';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';

function RenderUserOptions() {
    const { userType, initials, initialsClassName, suscription } =
        useGetUserConfig();

    const { toggleDrawer } = useDrawer({ id: DRAWER.MY_ACCOUNT });

    if (userType === 'loading' || userType === 'unlogged') return <></>;
    return (
        <>
            <AvatarRecetas
                initials={initials}
                initialsClassName={initialsClassName}
                suscription={suscription}
                className="lg-only"
            />
            <Button
                data-test-id="button-menu-user"
                variant="link"
                className="lg-none"
                onClick={() => toggleDrawer()}
                title="Abrir menu de usuario"
            >
                <Icon size={24}>
                    <IconSprite name="profile" critical />
                </Icon>
            </Button>
        </>
    );
}

export default RenderUserOptions;
