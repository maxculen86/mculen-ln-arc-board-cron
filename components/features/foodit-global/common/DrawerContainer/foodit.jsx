import React from 'react';
import { Button } from '@ln/common-ui-button';
import { Drawer, toggleDrawer } from '@ln/common-ui-drawer';
import { Icon } from '@ln/common-ui-icon';
import { Close } from '@ln/foodit-ui-assets';
import classNames from 'classnames';

export const DrawerContainer = ({
    drawerId,
    position,
    bodyClassName,
    children
}) => {
    const handleClose = () => toggleDrawer({ id: drawerId });

    return (
        <Drawer
            id={drawerId}
            position={position}
            className="max-w-520_md bg-light-1 gap-16 p-16 p-24_md p-32_lg shadow-down-md transition-regular"
            overlayClasses="z-10"
            handleClose={handleClose}
        >
            <Drawer.Header>
                <Button
                    title="Cerrar menú"
                    className="ml-auto"
                    onClick={handleClose}
                >
                    <Icon size={24} color="dark">
                        <Close />
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
