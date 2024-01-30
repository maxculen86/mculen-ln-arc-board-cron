import React from 'react';
import { Button } from '@ln/common-ui-button';
import { Drawer, toggleDrawer } from '@ln/common-ui-drawer';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import classNames from 'classnames';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

export const DrawerContainer = ({
    drawerId,
    position,
    bodyClassName,
    children,
    title
}) => {
    const handleClose = () => toggleDrawer({ id: drawerId });

    return (
        <Drawer
            id={drawerId}
            position={position}
            className="max-w-520_md bg-light-1 gap-16 p-16 p-24_md p-32_lg shadow-down-md transition-regular"
            overlayClasses="z-15"
            handleClose={handleClose}
        >
            <Drawer.Header
                className={
                    title
                        ? 'flex jc-between border border-bottom border-thin border-light-100 pb-16'
                        : ''
                }
            >
                {title && <Text className="roboto-bold text-24">{title}</Text>}
                <Button
                    title="Cerrar menú"
                    className="ml-auto"
                    onClick={handleClose}
                >
                    <Icon size={24} color="dark">
                        <IconSprite name="close" />
                    </Icon>
                </Button>
            </Drawer.Header>
            <Drawer.Body
                className={classNames(
                    'foodit-scrollbar flex flex-column gap-16',
                    bodyClassName
                )}
            >
                {children}
            </Drawer.Body>
        </Drawer>
    );
};

export default DrawerContainer;
